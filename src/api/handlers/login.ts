import { Request, Response } from "express";
import { NewUser } from "src/schema";
import { BadRequest, Unauthorized } from "../utils/errors";
import { checkPasswordHash, makeJWT } from "../auth";
import { getUserByEmail } from "src/db/queries/users";
import { respondWithJSON } from "../utils/json";
import { UserResponse } from "../types";
import { config } from "../../config";

type ExpectedBody = Required<Pick<NewUser, 'email'>> & {
    password: string
    expiresInSeconds?: number
}

export async function handlerLogin(req: Request, res: Response) {
    const { email, password }: ExpectedBody = req.body

    if (!email || !password) {
        throw new BadRequest('Email and password must be included in body')
    }

    let expiresInSeconds: number

    if (req.body.expiresInSeconds && req.body.expiresInSeconds <= 60 * 60) {
        expiresInSeconds = req.body.expiresInSeconds
    } else {
        expiresInSeconds = 60 * 60
    }

    const dbUser = await getUserByEmail(email)

    const isPasswordConfirmed = await checkPasswordHash(password, dbUser.hashed_password)

    if (!isPasswordConfirmed) {
        throw new Unauthorized('Incorrect email or password')
    }

    const token = makeJWT(dbUser.id, expiresInSeconds, config.jwtSecret)

    respondWithJSON<UserResponse>(res, 200, {
        email: dbUser.email,
        createdAt: dbUser.createdAt,
        id: dbUser.id,
        updatedAt: dbUser.updatedAt,
        token
    })

}
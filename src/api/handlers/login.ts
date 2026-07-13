import { Request, Response } from "express";
import { NewUser } from "src/schema";
import { BadRequest, Unauthorized } from "../utils/errors";
import { checkPasswordHash, makeJWT, makeRefreshToken } from "../auth";
import { getUserByEmail } from "src/db/queries/users";
import { respondWithJSON } from "../utils/json";
import { UserResponse } from "../types";
import { config } from "../../config";
import { getRefreshToken, insertRefreshToken } from "src/db/queries/refreshTokens";

type ExpectedBody = Required<Pick<NewUser, 'email'>> & {
    password: string
}

export async function handlerLogin(req: Request, res: Response) {
    const { email, password }: ExpectedBody = req.body

    if (!email || !password) {
        throw new BadRequest('Email and password must be included in body')
    }

    let expiresInSeconds = 60 * 60    

    const dbUser = await getUserByEmail(email)

    const isPasswordConfirmed = await checkPasswordHash(password, dbUser.hashed_password)

    if (!isPasswordConfirmed) {
        throw new Unauthorized('Incorrect email or password')
    }

    const refreshToken = makeRefreshToken()

    insertRefreshToken(refreshToken, dbUser.id, new Date(Date.now() + expiresInSeconds * 1000)  )

    const token = makeJWT(dbUser.id, expiresInSeconds, config.jwtSecret)

    respondWithJSON<UserResponse>(res, 200, {
        id: dbUser.id,
        createdAt: dbUser.createdAt,
        updatedAt: dbUser.updatedAt,
        email: dbUser.email,
        token,
        refreshToken
    })

}
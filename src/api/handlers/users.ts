import { Request, Response } from "express";
import { BadRequest } from "../utils/errors";
import { createUser } from "src/db/queries/users";
import { respondWithJSON } from "../utils/json";
import { UserResponse } from "../types";
import { hashPassword } from "../auth";

type ExpectedBody = {
    email: string,
    password: string
}

export const handlerCreateUser = async (req: Request, res: Response<ExpectedBody>) => {
    if (!req.body) {
        throw new BadRequest('Body required')
    }

    if (!req.body.email) {
        throw new BadRequest('Email must be included in body')
    }

    if (!req.body.password) {
        throw new BadRequest('Password must be included in body')
    }

    let parsedBody: ExpectedBody = req.body

    const createdUser = await createUser({ email: parsedBody.email, hashed_password: await hashPassword(parsedBody.password) })

    respondWithJSON(res, 201, {
        email: createdUser.email,
        id: createdUser.id,
        createdAt: createdUser.createdAt,
        updatedAt: createdUser.updatedAt

    } satisfies UserResponse)

}
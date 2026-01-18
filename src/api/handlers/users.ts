import { Request, Response } from "express";
import { BadRequest } from "../utils/errors";
import { createUser } from "src/db/queries/users";
import { enableCompileCache } from "node:module";
import { respondWithJSON } from "../utils/json";

type ExpectedBody = {
    email: string
}

export const handlerCreateUser = async (req: Request, res: Response) => {
    if (!req.body) {
        throw new BadRequest('Body required')
    }

    if (!req.body.email) {
        throw new BadRequest('Email must be included in body')
    }

    let parsedBody: ExpectedBody = req.body

    const createdUser = await createUser({ email: parsedBody.email })

    respondWithJSON(res, 201, createdUser)

}
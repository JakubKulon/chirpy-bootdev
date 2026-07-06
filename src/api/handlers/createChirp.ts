import { NextFunction, Request, Response } from "express";
import { BadRequest } from "../utils/errors";
import { chirpCensor } from "../utils/chirpCensor";
import { createChirp } from "src/db/queries/chirps";
import { getBearerToken } from "../auth";
import { validateJWT } from "../auth";
import { config } from "../../config";

export const handlerCreateChirp = async (req: Request, res: Response, next: NextFunction) => {
    const params = req.body as { body?: unknown; userId?: unknown };

    const token = getBearerToken(req)
    const userID = validateJWT(token, config.jwtSecret)

    console.log(params, 'LOLOLOL')

    if (typeof params.body !== "string") {
        throw new BadRequest("Invalid chirp payload");
    }

    if (req.body.body.length > 140) {
        throw new BadRequest('Chirp is too long. Max length is 140')
    }

    const cleanedBody = chirpCensor(req.body.body)

    const chirp = await createChirp({
        body: cleanedBody,
        userId: userID
    })

    res.status(201).json(chirp)
}
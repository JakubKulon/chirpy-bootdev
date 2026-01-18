import { NextFunction, Request, Response } from "express";
import { BadRequest } from "../utils/errors";
import { chirpCensor } from "../utils/chirpCensor";
import { createChirp } from "src/db/queries/chirps";

export const handlerCreateChirp = async (req: Request, res: Response, next: NextFunction) => {
    const params = req.body as { body?: unknown; userId?: unknown };

    if (typeof params.body !== "string" || typeof params.userId !== "string") {
        throw new BadRequest("Invalid chirp payload");
    }

    if (req.body.body.length > 140) {
        throw new BadRequest('Chirp is too long. Max length is 140')
    }

    const cleanedBody = chirpCensor(req.body.body)

    const chirp = await createChirp({
        body: cleanedBody,
        userId: req.body.userId
    })

    res.status(201).json(chirp)
}
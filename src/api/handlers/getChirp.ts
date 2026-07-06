import { getChirpById } from "src/db/queries/chirps"
import { NextFunction, Request, Response } from "express"
import { BadRequest, NotFound } from "../utils/errors"

export const handlerGetChirpById = async (req: Request, res: Response, next: NextFunction) => {
    if (req.params.chirpID === undefined) {
        return next(new BadRequest("Chirp ID is required"))
    }
    const chirp = await getChirpById(req.params.chirpID)
    if (!chirp) {
        return next(new NotFound("Chirp not found"))
    }
    res.status(200).json(chirp)
}
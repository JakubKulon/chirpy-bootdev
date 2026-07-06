import { NextFunction, Request, Response } from "express";
import { getChirps } from "src/db/queries/chirps";
import { getBearerToken, validateJWT } from "../auth";
import { config } from "../../config";

export const handlerGetChirps = async (req: Request, res: Response, next: NextFunction) => {
    const token = getBearerToken(req)
    validateJWT(token, config.jwtSecret)

    const chirps = await getChirps()
    res.status(200).json(chirps)
}
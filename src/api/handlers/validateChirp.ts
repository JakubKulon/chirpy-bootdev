import { Request, Response } from "express";
import { chirpCensor } from "src/api/utils/chirpCensor";
import { respondWithError, respondWithJSON } from "src/api/utils/json";
import { BadRequest } from "../utils/errors";
type ExpectedBody = {
    body: string;
}

export function handlerValidateChirp(req: Request, res: Response) {

    if (!req.body) {
        respondWithError(res, 400, "Chirp is required");
        return;
    }

    let parsedBody: ExpectedBody = req.body;


    if (parsedBody.body.length > 140) {
        throw new BadRequest('Chirp is too long. Max length is 140')
    }

    const cleanedBody = chirpCensor(parsedBody.body)

    respondWithJSON(res, 200, { cleanedBody });
}
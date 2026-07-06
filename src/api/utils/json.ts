import { Response } from "express";

export function respondWithError(res: Response, code: number, message: string) {
    respondWithJSON(res, code, { error: message });
}

export function respondWithJSON<T>(res: Response, code: number, payload: T) {
    res.header("Content-Type", "application/json");
    const body = JSON.stringify(payload);
    res.status(code).send(body);
}
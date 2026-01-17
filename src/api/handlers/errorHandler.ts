import { NextFunction, Request, Response } from "express";
import { BadRequest } from "../utils/errors";

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    console.log({
        "error": "Something went wrong on our end"
    })
    if (err instanceof BadRequest) {
        res.status(400).json({ error: err.message })
    }
    res.status(500).json({
        "error": "Something went wrong on our end"
    })

}
import { Request, Response } from "express";
import { config } from "../../config";

export const handlerResetHits = (_req: Request, res: Response) => {
    config.fileserverHits = 0;
    res.statusCode = 200;
    res.send("OK");
}
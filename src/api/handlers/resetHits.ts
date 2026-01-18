import { NextFunction, Request, Response } from "express";
import { config } from "../../config";
import { removeUsers } from "src/db/queries/users";
import { Forbidden } from "../utils/errors";

export const handlerResetHits = async (_req: Request, res: Response, next: NextFunction) => {
    console.log(config.platform)
    if (config.platform !== "DEV") {
        throw new Forbidden("access denied")
    }
    config.fileserverHits = 0;
    try {
        const result = await removeUsers()
    } catch (err) {
        next(err)
    }
    res.statusCode = 200;
    res.send("OK");
}
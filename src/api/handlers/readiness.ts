import { Request, Response } from "express";

export const handlerReadiness = (_req: Request, res: Response) => {
    res.contentType("text/plain; charset=utf-8");
    res.send("OK");
    res.status(200);
};
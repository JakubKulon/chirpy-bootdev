import { NextFunction, Request, Response } from "express";

type Middleware = (req: Request, res: Response, next: NextFunction) => void;

export const middlewareLogResponse: Middleware = (req, res, next) => {
    res.on("finish", () => {
        if (res.statusCode < 200 || res.statusCode >= 300) {
            console.log(`[NON-OK] ${req.method} ${req.url} - Status ${res.statusCode}`)
        }
    });
    next();
};
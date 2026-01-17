import { NextFunction, Request, Response } from "express";

export type APIConfig = {
  fileserverHits: number;
};

export type Middleware = (req: Request, res: Response, next: NextFunction) => void;



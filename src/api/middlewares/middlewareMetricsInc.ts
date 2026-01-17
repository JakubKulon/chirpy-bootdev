import { NextFunction, Request, Response } from "express";
import { Middleware } from "src/api/types";
import { config } from "src/config";

export const middlewareMetricsInc: Middleware = (_req: Request, _res: Response, next: NextFunction) => {
  config.fileserverHits++;
  next();
}
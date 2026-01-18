import { MigrationConfig } from "drizzle-orm/migrator";
import { NextFunction, Request, Response } from "express";

export type APIConfig = {
  fileserverHits: number;
};

export type DBConfig = {
  url: string,
  migrationConfig: MigrationConfig
}

export type Middleware = (req: Request, res: Response, next: NextFunction) => void;



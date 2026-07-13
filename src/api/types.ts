import { MigrationConfig } from "drizzle-orm/migrator";
import { NextFunction, Request, Response } from "express";
import { NewUser } from "src/schema";

export type APIConfig = {
  fileserverHits: number;
  platform: "DEV" | "PROD" | (string & {});
  jwtSecret: string;
};

export type DBConfig = {
  url: string,
  migrationConfig: MigrationConfig
}

export type Middleware = (req: Request, res: Response, next: NextFunction) => void;


export type UserResponse = Omit<NewUser, "hashed_password"> & {
  token: string
  refreshToken: string
}



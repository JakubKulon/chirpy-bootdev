import { APIConfig, DBConfig } from "./api/types";
import type { MigrationConfig } from "drizzle-orm/migrator";


process.loadEnvFile()

const migrationConfig: MigrationConfig = {
    migrationsFolder: "./src/db/migrations",
};

function envOrThrow(key: string) {
    if (!process.env[key]) {
        throw new Error(`Key: ${key} is missing in .env`)
    }
    return process.env[key]
}

export const config: APIConfig & { db: DBConfig } = {
    fileserverHits: 0,
    platform: envOrThrow('PLATFORM'),
    jwtSecret: envOrThrow('JWT_SECRET'),
    db: {
        migrationConfig: {
            migrationsFolder: migrationConfig.migrationsFolder
        },
        url: envOrThrow('DB_URL'),
    }
}



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
    return key
}

export const config: APIConfig & { db: DBConfig } = {
    fileserverHits: 0,
    db: {
        migrationConfig: {
            migrationsFolder: migrationConfig.migrationsFolder
        },
        url: envOrThrow('DB_URL')
    }
}



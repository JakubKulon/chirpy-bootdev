import { db } from "../index";
import { chirps } from "src/schema";
import { NewChirp } from "src/schema";
import { asc, eq } from "drizzle-orm";

export async function createChirp(chirp: NewChirp) {
    const [result] = await db.insert(chirps).values(chirp).returning()
    return result
}

export async function getChirps() {
    const result = await db.select().from(chirps).orderBy(asc(chirps.createdAt))
    return result
}

export async function getChirpById(id: string) {
    const [result] = await db.select().from(chirps).where(eq(chirps.id, id)).limit(1)
    return result
}
import { db } from "../index";
import { chirps } from "src/schema";
import { NewChirp } from "src/schema";

export async function createChirp(chirp: NewChirp) {
    const [result] = await db.insert(chirps).values(chirp).returning()
    return result
}
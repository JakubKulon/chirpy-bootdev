import { eq } from "drizzle-orm";
import { db } from "../index";
import { NewUser, users } from "src/schema";

export async function createUser(user: NewUser) {
    const [result] = await db
        .insert(users)
        .values(user)
        .onConflictDoNothing()
        .returning();
    return result;
}

export async function removeUsers() {
    const [result] = await db.delete(users)

    return result
}

export async function getUserByEmail(email: string) {
    const [result] = await db.select().from(users).where(eq(users.email, email)).limit(1)

    return result
}
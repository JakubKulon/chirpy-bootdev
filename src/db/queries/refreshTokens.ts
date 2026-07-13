import { refreshTokens } from "src/schema"
import { db } from ".."
import { eq, and } from "drizzle-orm"
import { Unauthorized } from "src/api/utils/errors"

export const insertRefreshToken = async (token: string, userId: string, expiresAt: Date) => {
    const [result] = await db.insert(refreshTokens).values({
        token,
        user_id: userId,
        revoked_at: null,
        expires_at: expiresAt,
    }).returning()
    return result
}

export const getUserFromRefreshToken = async (token: string) => {
    const [result] = await db.select().from(refreshTokens).where(eq(refreshTokens.token, token)).limit(1)
    if(!result) {
        throw new Unauthorized('Refresh token not found')
    }
    if(result.expires_at < new Date() ) {
        throw new Unauthorized('Refresh token has expired')
    }
    if(result.revoked_at) {
        throw new Unauthorized('Refresh token has been revoked')
    }
    if(!result.user_id) {
        throw new Unauthorized('Refresh token is not associated with a user')
    }
    return result.user_id
}
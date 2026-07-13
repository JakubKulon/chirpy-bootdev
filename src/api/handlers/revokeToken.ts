import { getBearerToken } from "../auth"
import type { Request, Response } from "express"
import { respondWithJSON } from "../utils/json"
import { revokeRefreshToken } from "src/db/queries/refreshTokens"

export const handlerRevokeToken = async (req: Request, res: Response) => {
    const token = getBearerToken(req)

    await revokeRefreshToken(token)
    
    respondWithJSON(res, 204, {})

}
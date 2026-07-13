import { Request, Response } from "express"
import { getBearerToken, makeJWT } from "../auth"
import { config } from "src/config"
import { getUserFromRefreshToken } from "src/db/queries/refreshTokens"
import { respondWithJSON } from "../utils/json"

export async function handlerRefreshToken(req: Request, res: Response) {
    const token = getBearerToken(req)

    const user_id = await getUserFromRefreshToken(token)

    const refreshedToken = makeJWT(user_id, 60 * 60, config.jwtSecret)
    
    respondWithJSON(res, 200, {
        token: refreshedToken
    })

}
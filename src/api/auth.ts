import argon2 from 'argon2';
import jwt, { JwtPayload } from "jsonwebtoken";
import { Unauthorized } from './utils/errors';
import { Request } from "express";
import crypto from 'crypto';


export function hashPassword(text: string): Promise<string> {
    const result = argon2.hash(text)

    return result
}

export function checkPasswordHash(password: string, hash: string): Promise<boolean> {
    const result = argon2.verify(hash, password)

    return result
}

type payload = Pick<JwtPayload, "iss" | "sub" | "iat" | "exp">;

export function makeJWT(userID: string, expiresIn: number, secret: string): string {

    const iat = Math.floor(Date.now() / 1000)

    const jwtPayload: payload = {
        sub: userID,
        iss: userID,
        iat,
        exp: iat + expiresIn
    }

    const result = jwt.sign(jwtPayload, secret)

    return result
}


export function validateJWT(tokenString: string, secret: string): string {

    try {
        const result = jwt.verify(tokenString, secret) as jwt.JwtPayload
        if (!result.sub || typeof result.sub !== 'string') {
            throw new Unauthorized('Invalid Token payload')
        }
        return result.sub
    } catch (err) {
        throw new Unauthorized('JWT token not verified')
    }
}


export function getBearerToken(req: Request): string {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        throw new Unauthorized('No Authorization header')
    }
    const [type, token] = authHeader.split(' ')
    if (type !== 'Bearer') {
        throw new Unauthorized('Invalid Authorization header')
    }
    return token
}

export function makeRefreshToken(): string {
    return crypto.randomBytes(32).toString('hex')
}
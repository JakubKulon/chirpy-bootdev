import { describe, it, expect, beforeAll, vi } from "vitest";
import { checkPasswordHash, hashPassword, makeJWT, validateJWT } from "./auth";
import { Unauthorized } from "./utils/errors";

describe("Password Hashing", () => {
    const password1 = "correctPassword123!";
    const password2 = "anotherPassword456!";
    let hash1: string;
    let hash2: string;

    beforeAll(async () => {
        hash1 = await hashPassword(password1);
        hash2 = await hashPassword(password2);
    });

    it("should return true for the correct password", async () => {
        const result = await checkPasswordHash(password1, hash1);
        expect(result).toBe(true);
    });
});

describe("JWT", () => {
    const secret = "secret";
    const userId = "userId";

    it("should return the correct payload", async () => {
        const token = makeJWT(userId, 60, secret);

        const result = validateJWT(token, secret);
        expect(result).toBe(userId);
    });

    it("should throw an error if the token is expired", () => {

        vi.useFakeTimers();
        vi.setSystemTime(new Date(Date.now() + 60 * 60 * 1000));
        const expiredToken = makeJWT(userId, 600, secret);
        vi.advanceTimersByTime(600 * 60 * 1000);

        expect(() => validateJWT(expiredToken, secret)).toThrow(Unauthorized);
        expect(() => validateJWT(expiredToken, secret)).toThrow("JWT token not verified");

        vi.useRealTimers();
    });
});
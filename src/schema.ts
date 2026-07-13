import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
    email: varchar("email", { length: 256 }).notNull().unique(),
    hashed_password: varchar("hashed_password", { length: 256 }).notNull().default('unset')
})

export const chirps = pgTable('chirps', {
    id: uuid('id').primaryKey().defaultRandom(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
    body: varchar("body", { length: 256 }).notNull(),
    userId: uuid("user_id").notNull().references(() => users.id, { onDelete: 'cascade' })
})

export const refreshTokens = pgTable('refresh_tokens', {
    token: varchar('token').primaryKey(),
    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
    user_id: uuid("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
    expires_at: timestamp("expires_at").notNull(),
    revoked_at: timestamp("revoked_at")
})

export type NewChirp = typeof chirps.$inferInsert

export type NewUser = typeof users.$inferInsert

export type NewRefreshToken = typeof refreshTokens.$inferInsert
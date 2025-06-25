import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable('users',{
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    email: varchar({length: 255}).notNull().unique(),
    name: varchar({length: 255}).notNull(),
    password: varchar({length:255}).notNull(),
    role: varchar({length: 255}).notNull().default('user'),
    address: text(),
    image: varchar({length: 255})
})
import {
  doublePrecision,
  integer,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const productsTable = pgTable("products", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 1000 }),
  image: varchar({ length: 255 }),
  price: doublePrecision().notNull(),
  stock: integer().notNull().default(0),
    createdAt: timestamp().notNull().defaultNow(),
  quantity: integer().notNull().default(0),
});

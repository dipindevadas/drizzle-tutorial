import { doublePrecision, integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { usersTable } from "./usersSchema";
import { productsTable } from "./ProductsSchema";


export const ordersTable = pgTable('orders',{
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    status: varchar({length: 255}).notNull().default('New'),
    created_at: timestamp().notNull().defaultNow(),

    userId: integer().references(()=>usersTable.id).notNull()
})


export const orderItemsTable = pgTable('order_items',{
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    orderId: integer().references(()=>ordersTable.id).notNull(),
    productId: integer().references(()=>productsTable.id).notNull(),
    price: doublePrecision().notNull(),
    quantity: integer().notNull().default(0)
})
import { pgTable, uuid, integer, boolean, timestamp, text } from "drizzle-orm/pg-core";
import { plans } from "./plans";

export const planPricing = pgTable("plan_pricing", {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    planId: uuid("plan_id").references(() => plans.id, { onDelete: 'cascade' }).notNull(),
    mrpPrice: integer("mrp_price").notNull(),
    offerPrice: integer("offer_price").notNull(),
    currency: text("currency").default('INR').notNull(),
    validFrom: timestamp("valid_from", { withTimezone: true }),
    validTo: timestamp("valid_to", { withTimezone: true }),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

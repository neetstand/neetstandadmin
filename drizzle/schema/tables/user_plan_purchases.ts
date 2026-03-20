import { pgTable, uuid, integer, timestamp, text } from "drizzle-orm/pg-core";
import { plans } from "./plans";
import { planPricing } from "./plan_pricing";

export const userPlanPurchases = pgTable("user_plan_purchases", {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    userId: uuid("user_id").notNull(),
    planId: uuid("plan_id").references(() => plans.id, { onDelete: 'cascade' }).notNull(),
    planPricingId: uuid("plan_pricing_id").references(() => planPricing.id, { onDelete: 'restrict' }).notNull(),
    mrpPrice: integer("mrp_price").notNull(),
    paidPrice: integer("paid_price").notNull(),
    currency: text("currency").default('INR').notNull(),
    startDate: timestamp("start_date", { withTimezone: true }).notNull(),
    endDate: timestamp("end_date", { withTimezone: true }).notNull(),
    status: text("status").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

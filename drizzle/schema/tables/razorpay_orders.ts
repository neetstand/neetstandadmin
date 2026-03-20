import { pgTable, uuid, integer, timestamp, text } from "drizzle-orm/pg-core";
import { plans } from "./plans";
import { planPricing } from "./plan_pricing";
import { userPlanPurchases } from "./user_plan_purchases";

export const razorpayOrders = pgTable("razorpay_orders", {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    userId: uuid("user_id").notNull(),
    planId: uuid("plan_id").references(() => plans.id, { onDelete: 'cascade' }).notNull(),
    planPricingId: uuid("plan_pricing_id").references(() => planPricing.id, { onDelete: 'restrict' }).notNull(),
    userPurchaseId: uuid("user_purchase_id").references(() => userPlanPurchases.id, { onDelete: 'cascade' }),
    razorpayOrderId: text("razorpay_order_id").notNull().unique(),
    amount: integer("amount").notNull(),
    currency: text("currency").default('INR').notNull(),
    status: text("status").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

import { pgTable, uuid, integer, timestamp, text } from "drizzle-orm/pg-core";
import { razorpayOrders } from "./razorpay_orders";
import { userPlanPurchases } from "./user_plan_purchases";

export const razorpayPayments = pgTable("razorpay_payments", {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    razorpayPaymentId: text("razorpay_payment_id").notNull().unique(),
    razorpayOrderId: text("razorpay_order_id").references(() => razorpayOrders.razorpayOrderId),
    userPurchaseId: uuid("user_purchase_id").references(() => userPlanPurchases.id, { onDelete: 'cascade' }),
    paymentMethod: text("payment_method"),
    amount: integer("amount").notNull(),
    currency: text("currency").default('INR').notNull(),
    status: text("status").notNull(),
    razorpaySignature: text("razorpay_signature"),
    paidAt: timestamp("paid_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

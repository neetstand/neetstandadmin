import { pgTable, uuid, text, integer, boolean, timestamp } from "drizzle-orm/pg-core";

export const plans = pgTable("plans", {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    planName: text("plan_name").notNull(),
    description: text("description"),
    durationDays: integer("duration_days").notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

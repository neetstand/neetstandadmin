import { pgTable, uuid, text, integer, timestamp } from "drizzle-orm/pg-core";
import { diagnosticAttempts } from "./diagnostic_attempts";

export const diagnosticTestRefresh = pgTable("diagnostic_test_refresh", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull(),
    email: text("email"),
    phone: text("phone"),
    attemptId: uuid("attempt_id").references(() => diagnosticAttempts.id, { onDelete: 'set null' }),
    iteration: integer("iteration").default(1),
    status: text("status").default("pending"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

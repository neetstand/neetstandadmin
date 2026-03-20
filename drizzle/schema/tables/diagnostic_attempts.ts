import { pgTable, uuid, timestamp } from "drizzle-orm/pg-core";
import { profiles } from "./profiles";

export const diagnosticAttempts = pgTable("diagnostic_attempts", {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    userId: uuid("user_id").references(() => profiles.id, { onDelete: 'cascade' }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

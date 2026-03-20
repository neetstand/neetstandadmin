import { pgTable, uuid, integer, jsonb, timestamp } from "drizzle-orm/pg-core";
import { diagnosticAttempts } from "./diagnostic_attempts";

export const diagnosticResults = pgTable("diagnostic_results", {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    attemptId: uuid("attempt_id").references(() => diagnosticAttempts.id, { onDelete: 'cascade' }).unique().notNull(),
    totalQuestions: integer("total_questions").notNull(),
    attemptedCount: integer("attempted_count").default(0).notNull(),
    correctCount: integer("correct_count").notNull(),
    topicWisePerformance: jsonb("topic_wise_performance"),
    conceptWisePerformance: jsonb("concept_wise_performance"),
    weakAreas: jsonb("weak_areas"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

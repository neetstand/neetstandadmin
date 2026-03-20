import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { diagnosticAttempts } from "./diagnostic_attempts";
import { diagnosticStatementBank } from "./diagnostic_statement_bank";


export const diagnosticQuestions = pgTable("diagnostic_questions", {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    attemptId: uuid("attempt_id").references(() => diagnosticAttempts.id, { onDelete: 'cascade' }).notNull(),
    optionA: uuid("option_a").references(() => diagnosticStatementBank.id).notNull(),
    optionB: uuid("option_b").references(() => diagnosticStatementBank.id).notNull(),
    optionC: uuid("option_c").references(() => diagnosticStatementBank.id).notNull(),
    optionD: uuid("option_d").references(() => diagnosticStatementBank.id).notNull(),
    subject: text("subject"),
    correctOption: text("correct_option").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

import { pgTable, uuid, text, boolean, timestamp, index } from "drizzle-orm/pg-core";
import { chapters } from "./chapters";

export const diagnosticStatementBank = pgTable("diagnostic_statement_bank", {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    statementText: text("statement_text").notNull(),
    subject: text("subject"), // Kept from previous step
    topicId: text("topic_id").references(() => chapters.chapterCode, { onDelete: 'cascade' }).notNull(),
    concept: text("concept"),
    isCorrect: boolean("is_correct").default(false).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => {
    return {
        topicIdIdx: index("idx_diagnostic_statement_bank_topic_id").on(table.topicId),
    };
});

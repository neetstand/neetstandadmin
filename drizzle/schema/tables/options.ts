import { pgTable, uuid, text, timestamp, boolean, index } from "drizzle-orm/pg-core";
import { questions } from "./questions";
import { relations } from "drizzle-orm";

export const options = pgTable("options", {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    answerId: text("answer_id").unique("options_answer_id_key").notNull(),
    questionId: text("question_id").references(() => questions.questionId, { onDelete: 'cascade' }).notNull(),
    optionText: text("option_text").notNull(),
    optionHint: text("option_hint"),
    isCorrect: boolean("is_correct").notNull().default(false),
    hintImageUrl: text("hint_image_url"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => {
    return {
        questionIdIdx: index("idx_options_question_id").on(table.questionId),
    };
});

export const optionsRelations = relations(options, ({ one }) => ({
    question: one(questions, {
        fields: [options.questionId],
        references: [questions.questionId],
    }),
}));

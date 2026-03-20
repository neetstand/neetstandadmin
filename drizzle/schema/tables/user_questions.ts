import { pgTable, uuid, text, boolean, integer, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { questions } from "./questions";
import { options } from "./options";
import { subChapters } from "./sub_chapters";

export const userQuestions = pgTable("user_questions", {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    userId: uuid("user_id").notNull(),
    questionId: text("question_id").references(() => questions.questionId, { onDelete: "cascade" }).notNull(),
    subChapterId: uuid("sub_chapter_id").references(() => subChapters.id, { onDelete: "cascade" }).notNull(),
    difficulty: text("difficulty").notNull(),
    correctOptionId: text("correct_option_id").references(() => options.answerId, { onDelete: "set null" }),
    selectedOptionId: text("selected_option_id").references(() => options.answerId, { onDelete: "set null" }),
    isCorrect: boolean("is_correct"),
    shownAt: timestamp("shown_at", { withTimezone: true }).defaultNow().notNull(),
    questionOrder: integer("question_order").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const userQuestionsRelations = relations(userQuestions, ({ one }) => ({
    question: one(questions, {
        fields: [userQuestions.questionId],
        references: [questions.questionId],
    }),
    subChapter: one(subChapters, {
        fields: [userQuestions.subChapterId],
        references: [subChapters.id],
    }),
    correctOption: one(options, {
        fields: [userQuestions.correctOptionId],
        references: [options.answerId],
        relationName: "correct_option",
    }),
    selectedOption: one(options, {
        fields: [userQuestions.selectedOptionId],
        references: [options.answerId],
        relationName: "selected_option",
    }),
}));

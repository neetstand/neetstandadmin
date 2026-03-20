import { pgTable, uuid, text, timestamp, foreignKey } from "drizzle-orm/pg-core";
import { profiles } from "./profiles";
import { questions } from "./questions";
import { relations } from "drizzle-orm";

export const questionChallenges = pgTable("question_challenges", {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    status: text("status", { enum: ["Pending", "Under Review", "Accepted", "Rejected"] }).default("Pending").notNull(),
    smeComment: text("sme_comment"),
    userComment: text("user_comment").notNull(),
    issueType: text("issue_type").notNull(),
    userId: uuid("user_id").references(() => profiles.id, { onDelete: 'cascade' }).notNull(),
    questionId: text("question_id").references(() => questions.questionId, { onDelete: 'cascade' }).notNull(),
    reviewerId: uuid("reviewer_id").references(() => profiles.id),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => {
    return {
        // Ensure we match the naming used in the Supabase query if needed, 
        // though standard PostgREST relationship discovery usually works with the FK columns.
        questionChallengesUserIdFkey: foreignKey({
            columns: [table.userId],
            foreignColumns: [profiles.id],
            name: "question_challenges_user_id_fkey"
        }),
        fkQuestionChallengesQuestions: foreignKey({
            columns: [table.questionId],
            foreignColumns: [questions.questionId],
            name: "fk_question_challenges_questions"
        }),
    };
});

export const questionChallengesRelations = relations(questionChallenges, ({ one }) => ({
    user: one(profiles, {
        fields: [questionChallenges.userId],
        references: [profiles.id],
    }),
    question: one(questions, {
        fields: [questionChallenges.questionId],
        references: [questions.questionId],
    }),
    reviewer: one(profiles, {
        fields: [questionChallenges.reviewerId],
        references: [profiles.id],
    }),
}));

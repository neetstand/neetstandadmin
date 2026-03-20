import { pgTable, uuid, text, timestamp, index, integer } from "drizzle-orm/pg-core";
import { subChapters } from "./sub_chapters";
import { options } from "./options";
import { relations } from "drizzle-orm";

export const questions = pgTable("questions", {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    questionId: text("question_id").unique().notNull(),
    difficultyLevel: text("difficulty_level"),
    questionType: text("question_type"),
    questionImgUrl: text("question_img_url"),
    subChapterCode: text("sub_chapter_code").references(() => subChapters.subChapterCode, { onDelete: 'cascade' }).notNull(),
    questionUse: text("question_use"),
    questionText: text("question_text").notNull(),
    memorizationPct: integer("memorization_pct"),
    understandingPct: integer("understanding_pct"),
    applicationPct: integer("application_pct"),
    analyticalPct: integer("analytical_pct"),
    questionSource: text("question_source"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => {
    return {
        subChapterCodeIdx: index("idx_questions_sub_chapter_code").on(table.subChapterCode),
    };
});

export const questionsRelations = relations(questions, ({ one, many }) => ({
    subChapter: one(subChapters, {
        fields: [questions.subChapterCode],
        references: [subChapters.subChapterCode],
    }),
    options: many(options),
}));


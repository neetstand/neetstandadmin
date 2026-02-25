import { pgTable, uuid, text, integer, numeric, timestamp, index, uniqueIndex } from "drizzle-orm/pg-core";

export const chapters = pgTable("chapters", {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    chapterCode: text("chapter_code").unique().notNull(),
    subject: text("subject"),
    class: integer("class"),
    chapterNumber: integer("chapter_number"),
    chapterName: text("chapter_name"),
    chapterShortDescription: text("chapter_short_description"),
    chapterDetailedDescription: text("chapter_detailed_description"),
    subSubject: text("sub_subject"),
    weightagePercent: numeric("weightage_percent"),
    toughness: text("toughness"),
    tacticalStrategy: text("tactical_strategy"),
    learningSpeed: text("learning_speed"),
    numberOfTopics: integer("number_of_topics"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
}, (table) => {
    return {
        subjectClassIdx: index("idx_chapters_subject_class").on(table.subject, table.class),
    };
});

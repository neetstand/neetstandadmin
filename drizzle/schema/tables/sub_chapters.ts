import { pgTable, uuid, text, timestamp, index, integer } from "drizzle-orm/pg-core";
import { chapters } from "./chapters";
import { questions } from "./questions";
import { relations } from "drizzle-orm";

export const subChapters = pgTable("sub_chapters", {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    subChapterCode: text("sub_chapter_code").unique().notNull(),
    chapterCode: text("chapter_code").references(() => chapters.chapterCode, { onDelete: 'cascade' }).notNull(),
    subChapterOrder: integer("sub_chapter_order").notNull(),
    subChapterName: text("sub_chapter_name").notNull(),
    englishVideoUrl: text("english_video_url"),
    hinglishVideoUrl: text("hinglish_video_url"),
    englishVideoUrlKiller: text("english_video_url_killer"),
    hinglishVideoUrlKiller: text("hinglish_video_url_killer"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
}, (table) => {
    return {
        chapterCodeIdx: index("idx_sub_chapters_chapter_code").on(table.chapterCode),
    };
});

export const subChaptersRelations = relations(subChapters, ({ one, many }) => ({
    chapter: one(chapters, {
        fields: [subChapters.chapterCode],
        references: [chapters.chapterCode],
    }),
    questions: many(questions),
}));

export const chaptersRelations = relations(chapters, ({ many }) => ({
    subChapters: many(subChapters),
}));

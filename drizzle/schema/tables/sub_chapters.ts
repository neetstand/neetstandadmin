import { pgTable, uuid, text, timestamp, index } from "drizzle-orm/pg-core";
import { chapters } from "./chapters";
import { relations } from "drizzle-orm";

export const subChapters = pgTable("sub_chapters", {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    subChapterCode: text("sub_chapter_code").unique().notNull(),
    chapterCode: text("chapter_code").references(() => chapters.chapterCode, { onDelete: 'cascade' }).notNull(),
    subChapterName: text("sub_chapter_name").notNull(),
    englishVideoUrl: text("english_video_url"),
    hinglishVideoUrl: text("hinglish_video_url"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
}, (table) => {
    return {
        chapterCodeIdx: index("idx_sub_chapters_chapter_code").on(table.chapterCode),
    };
});

export const subChaptersRelations = relations(subChapters, ({ one }) => ({
    chapter: one(chapters, {
        fields: [subChapters.chapterCode],
        references: [chapters.chapterCode],
    }),
}));

export const chaptersRelations = relations(chapters, ({ many }) => ({
    subChapters: many(subChapters),
}));

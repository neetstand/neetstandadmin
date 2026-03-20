import { pgTable, uuid, text, boolean, timestamp, index, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { profiles } from "./profiles";
import { chapters } from "./chapters";

export const sprintPlans = pgTable("sprint_plans", {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    name: text("name").notNull(),
    description: text("description"),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const sprintPlanDays = pgTable("sprint_plan_days", {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    planId: uuid("plan_id").references(() => sprintPlans.id, { onDelete: 'cascade' }).notNull(),
    dayNumber: integer("day_number").notNull(),

    physicsChapterCode: text("physics_chapter_code").references(() => chapters.chapterCode),
    physicsStartOrder: integer("physics_start_order"),
    physicsEndOrder: integer("physics_end_order"),

    chemistryChapterCode: text("chemistry_chapter_code").references(() => chapters.chapterCode),
    chemistryStartOrder: integer("chemistry_start_order"),
    chemistryEndOrder: integer("chemistry_end_order"),

    biologyChapterCode: text("biology_chapter_code").references(() => chapters.chapterCode),
    biologyStartOrder: integer("biology_start_order"),
    biologyEndOrder: integer("biology_end_order"),

    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
}, (table) => {
    return {
        planDayIdx: index("idx_sprint_plan_days_plan_day").on(table.planId, table.dayNumber),
    };
});

export const sprintPlanBonuses = pgTable("sprint_plan_bonuses", {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    planId: uuid("plan_id").references(() => sprintPlans.id, { onDelete: 'cascade' }).notNull(),
    subject: text("subject").notNull(),
    chapterCode: text("chapter_code").references(() => chapters.chapterCode).notNull(),
    startOrder: integer("start_order").notNull(),
    endOrder: integer("end_order").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
}, (table) => {
    return {
        planSubjectIdx: index("idx_sprint_plan_bonuses_plan_subject").on(table.planId, table.subject),
    };
});

// Relations
export const sprintPlansRelations = relations(sprintPlans, ({ many }) => ({
    days: many(sprintPlanDays),
    bonuses: many(sprintPlanBonuses),
    users: many(profiles),
}));

export const sprintPlanDaysRelations = relations(sprintPlanDays, ({ one }) => ({
    plan: one(sprintPlans, {
        fields: [sprintPlanDays.planId],
        references: [sprintPlans.id],
    }),
    physicsChapter: one(chapters, {
        fields: [sprintPlanDays.physicsChapterCode],
        references: [chapters.chapterCode],
    }),
    chemistryChapter: one(chapters, {
        fields: [sprintPlanDays.chemistryChapterCode],
        references: [chapters.chapterCode],
    }),
    biologyChapter: one(chapters, {
        fields: [sprintPlanDays.biologyChapterCode],
        references: [chapters.chapterCode],
    }),
}));

export const sprintPlanBonusesRelations = relations(sprintPlanBonuses, ({ one }) => ({
    plan: one(sprintPlans, {
        fields: [sprintPlanBonuses.planId],
        references: [sprintPlans.id],
    }),
    chapter: one(chapters, {
        fields: [sprintPlanBonuses.chapterCode],
        references: [chapters.chapterCode],
    }),
}));

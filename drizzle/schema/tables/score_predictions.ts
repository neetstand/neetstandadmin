import { pgTable, uuid, text, integer, numeric, timestamp, uniqueIndex } from "drizzle-orm/pg-core";

export const scorePredictions = pgTable("score_predictions", {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    userId: uuid("user_id").notNull(), // References auth.users
    stage: text("stage").notNull(), // S1, S2, S3, S4
    daysCovered: integer("days_covered").notNull(),
    predictedLower: integer("predicted_lower").notNull(),
    predictedUpper: integer("predicted_upper").notNull(),
    confidenceScore: numeric("confidence_score", { precision: 5, scale: 4 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => {
    return {
        // A user shouldn't have multiple entries for the exact same stage (e.g. they only hit S1 once)
        userStageIdx: uniqueIndex("idx_score_predictions_user_stage").on(table.userId, table.stage),
    };
});

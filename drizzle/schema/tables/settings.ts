import { pgTable, varchar, boolean, text, timestamp } from "drizzle-orm/pg-core";

export const settings = pgTable("settings", {
    variable: varchar("variable", { length: 255 }).primaryKey().notNull(),
    value: boolean("value").default(false).notNull(),
    description: text("description"),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

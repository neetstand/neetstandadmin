import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

export const departments = pgTable("departments", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull().unique(), // e.g., 'Finance', 'Tech', 'HR'
    description: text("description"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

export const permissions = pgTable("permissions", {
    id: uuid("id").primaryKey().defaultRandom(),
    action: text("action").notNull(), // e.g. 'delete'
    subject: text("subject").notNull(), // e.g. 'article'
    description: text("description"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

import { relations } from "drizzle-orm";
import { rolePermissions } from "./role_permissions";

export const permissionsRelations = relations(permissions, ({ many }) => ({
    rolePermissions: many(rolePermissions),
}));


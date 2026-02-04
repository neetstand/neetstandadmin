import { pgTable, uuid, text, timestamp, integer } from "drizzle-orm/pg-core";

export const roles = pgTable("roles", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull().unique(), // e.g., 'superadmin', 'editor'
    description: text("description"),
    hierarchyLevel: integer("hierarchy_level").notNull().default(0), // 100=Owner, 90=Superadmin, etc.
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

import { relations } from "drizzle-orm";
import { userRoles } from "./user_roles";
import { rolePermissions } from "./role_permissions";

export const rolesRelations = relations(roles, ({ many }) => ({
    userRoles: many(userRoles),
    rolePermissions: many(rolePermissions),
}));


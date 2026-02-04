import { pgTable, uuid, timestamp, primaryKey } from "drizzle-orm/pg-core";
import { profiles } from "./profiles";
import { roles } from "./roles";

export const userRoles = pgTable("user_roles", {
    userId: uuid("user_id").notNull().references(() => profiles.id, { onDelete: 'cascade' }),
    roleId: uuid("role_id").notNull().references(() => roles.id, { onDelete: 'cascade' }),
    assignedAt: timestamp("assigned_at").defaultNow().notNull(),
}, (t) => ({
    pk: primaryKey({ columns: [t.userId, t.roleId] }),
}));

import { relations } from "drizzle-orm";

export const userRolesRelations = relations(userRoles, ({ one }) => ({
    profile: one(profiles, {
        fields: [userRoles.userId],
        references: [profiles.id],
    }),
    role: one(roles, {
        fields: [userRoles.roleId],
        references: [roles.id],
    }),
}));



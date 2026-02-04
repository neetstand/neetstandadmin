import { pgTable, uuid, timestamp, primaryKey } from "drizzle-orm/pg-core";
import { roles } from "./roles";
import { permissions } from "./permissions";

export const rolePermissions = pgTable("role_permissions", {
    roleId: uuid("role_id").notNull().references(() => roles.id, { onDelete: 'cascade' }),
    permissionId: uuid("permission_id").notNull().references(() => permissions.id, { onDelete: 'cascade' }),
    assignedAt: timestamp("assigned_at").defaultNow().notNull(),
}, (t) => ({
    pk: primaryKey({ columns: [t.roleId, t.permissionId] }),
}));

import { relations } from "drizzle-orm";

export const rolePermissionsRelations = relations(rolePermissions, ({ one }) => ({
    role: one(roles, {
        fields: [rolePermissions.roleId],
        references: [roles.id],
    }),
    permission: one(permissions, {
        fields: [rolePermissions.permissionId],
        references: [permissions.id],
    }),
}));


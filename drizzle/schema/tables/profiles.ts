import { pgTable, uuid, timestamp, text, boolean } from "drizzle-orm/pg-core";
import { departments } from "./departments";

// We define a reference to auth.users if we want strict typing, but Drizzle doesn't support cross-schema FKs easily without defining the schema.
// For now, we rely on the DB constraint we added manually.
export const profiles = pgTable("profiles", {
    id: uuid("id").primaryKey().notNull(), // References auth.users(id)
    fullName: text("full_name"),
    departmentId: uuid("department_id").references(() => departments.id),
    role: text("role").default("user").notNull(),
    avatarUrl: text("avatar_url"),
    isActive: boolean("is_active").default(true),
    // Notification preferences
    newsletter: boolean("newsletter").default(false).notNull(),
    courseLaunch: boolean("course_launch").default(true).notNull(),
    cityEvents: boolean("city_events").default(true).notNull(),
    email: boolean("email").default(true).notNull(),
    sms: boolean("sms").default(true).notNull(),
    phone: boolean("phone").default(true).notNull(),
    otpGeneratedAt: timestamp("otp_generated_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

import { relations } from "drizzle-orm";
import { userRoles } from "./user_roles";

export const profilesRelations = relations(profiles, ({ many }) => ({
    userRoles: many(userRoles),
}));

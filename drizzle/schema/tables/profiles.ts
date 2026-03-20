import { pgTable, uuid, timestamp, text, boolean, jsonb, integer } from "drizzle-orm/pg-core";
import { departments } from "./departments";
import { sprintPlans } from "./sprint_plans";

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
    // Onboarding & Diagnostics
    onboardingStatus: text("onboarding_status").default("NOT_STARTED").notNull(), // NOT_STARTED, INTENT_SELECTED, DIAGNOSTIC_TAKEN, PROFILING_COMPLETED, COMPLETED
    diagnosticData: jsonb("diagnostic_data"),
    targetExamYear: integer("target_exam_year"),
    attemptCount: integer("attempt_count").default(0),
    hasPaid: boolean("has_paid").default(false),
    otpGeneratedAt: timestamp("otp_generated_at", { withTimezone: true }),

    // New Mentor-Led Onboarding Fields
    currentClass: text("current_class"), // '11', '12', 'repeater'
    lastNeetScore: integer("last_neet_score"),
    averageMockScore: integer("average_mock_score"),
    subjectStrengths: jsonb("subject_strengths"), // { physics: 'weak', chemistry: 'moderate', biology: 'strong' }
    chapterStrengths: jsonb("chapter_strengths"), // { physics: { 'Rotational Motion': 'weak' } }
    generatedPlan: jsonb("generated_plan"),
    activeSprintPlanId: uuid("active_sprint_plan_id").references(() => sprintPlans.id, { onDelete: 'set null' }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

import { relations } from "drizzle-orm";
import { userRoles } from "./user_roles";

export const profilesRelations = relations(profiles, ({ one, many }) => ({
    userRoles: many(userRoles),
    activeSprintPlan: one(sprintPlans, {
        fields: [profiles.activeSprintPlanId],
        references: [sprintPlans.id],
    }),
}));

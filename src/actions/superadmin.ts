"use server";

import { db } from "@drizzle/index";
import { profiles, roles, userRoles } from "@drizzle/schema/index";
import { eq, and } from "drizzle-orm";
import { createClient } from "@/utils/supabase/server";
import { adminAuthClient } from "@/utils/supabase/admin";

export async function checkSuperAdminExists() {
    const superAdminRole = await db.query.roles.findFirst({
        where: eq(roles.name, "superadmin"),
    });

    if (!superAdminRole) return false;

    const existingSuperAdmin = await db.query.userRoles.findFirst({
        where: eq(userRoles.roleId, superAdminRole.id),
    });

    return !!existingSuperAdmin;
}

export async function setupSuperAdmin(data: { isMe: boolean, email?: string, name?: string, superadminRoleId?: string }) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { success: false, error: "Unauthorized" };
    }

    const { isMe, email, name, superadminRoleId } = data;

    try {
        let targetUserId;

        // 0. Ensure Role Exists or Get ID
        // If superadminRoleId is passed, use it, else fetch it.
        let saRoleId = superadminRoleId;
        if (!saRoleId) {
            const saRole = await db.query.roles.findFirst({
                where: eq(roles.name, "superadmin"),
            });
            if (saRole) {
                saRoleId = saRole.id;
            } else {
                // Should not happen ideally if we rely on seeds, but safety create
                const [newRole] = await db.insert(roles).values({
                    name: "superadmin",
                    description: "Root administrator with full access",
                }).returning();
                saRoleId = newRole.id;
            }
        }


        if (isMe) {
            // Assign Superadmin to current user (Owner)
            // 1. Ensure Owner is in users table
            const existingUser = await db.select().from(profiles).where(eq(profiles.id, user.id)).limit(1);

            if (!existingUser.length) {
                // Create user record for Owner
                const [newUser] = await db.insert(profiles).values({
                    id: user.id, // Primary key is now the Auth ID
                    fullName: "Owner",
                }).returning();

                targetUserId = newUser.id;
            } else {
                targetUserId = existingUser[0].id;
            }

        } else {
            // Invite logic
            // Check if user exists in Auth by email
            const { data: { users: authUsers }, error: listError } = await adminAuthClient.auth.admin.listUsers();

            if (listError) throw listError;

            const userByEmail = authUsers.find(u => u.email === email);

            if (userByEmail) {
                targetUserId = userByEmail.id;
                // Ensure profile exists?
                const existingProfile = await db.select().from(profiles).where(eq(profiles.id, targetUserId)).limit(1);
                if (!existingProfile.length) {
                    await db.insert(profiles).values({
                        id: targetUserId,
                        fullName: name || "Superadmin",
                    }).onConflictDoNothing();
                }
            } else {
                // User not in Auth -> Create them explicitly (bypassing invite email)
                if (!email) throw new Error("Email is required for invitation");

                const { data: newUser, error: createError } = await adminAuthClient.auth.admin.createUser({
                    email,
                    email_confirm: true, // Auto-confirm email
                    user_metadata: {
                        full_name: name,
                        role: "superadmin" // Signal trigger to use this role
                    }
                });

                if (createError) throw createError;
                if (!newUser.user) throw new Error("Failed to create user");

                targetUserId = newUser.user.id;

                // Create Profile for new user
                await db.insert(profiles).values({
                    id: targetUserId,
                    fullName: name || "Superadmin",
                    role: "superadmin" // Set initial role in profile metadata too if needed, though userRoles is source of truth
                }).onConflictDoUpdate({
                    target: profiles.id,
                    set: { fullName: name }
                });
            }
        }

        // 2. Assign Role - Ensure we are using the correct targetUserId
        if (!targetUserId) {
            throw new Error("Target User ID is missing");
        }

        // Defensive: Remove 'user' role if it exists (in case trigger added it or user was upgraded)
        try {
            const userRole = await db.query.roles.findFirst({
                where: eq(roles.name, "user"),
            });
            if (userRole) {
                await db.delete(userRoles).where(
                    and(eq(userRoles.userId, targetUserId), eq(userRoles.roleId, userRole.id))
                );
            }
        } catch (cleanupError) {
            console.warn("Failed to cleanup user role:", cleanupError);
            // Verify connection or ignore
        }

        // Check if role assignment already exists
        const existingRoleAssignment = await db.query.userRoles.findFirst({
            where: (ur, { and, eq }) => and(eq(ur.userId, targetUserId), eq(ur.roleId, saRoleId!)),
        });

        if (!existingRoleAssignment) {
            await db.insert(userRoles).values({
                userId: targetUserId,
                roleId: saRoleId!
            });
        }

        // 3. Send Welcome Email
        if (!isMe && email) {
            const loginUrl = `${process.env.ADMIN_URL}/login`;
            const { error: emailError } = await adminAuthClient.rpc("send_email", {
                to_email: email,
                from_email: "no-reply@neetstand.com",
                subject: "Welcome to NeetStand Admin",
                html_body: `
                    <div style="font-family: sans-serif; padding: 20px;">
                        <h2>Welcome and Congratulations!</h2>
                        <p>You have been selected as a <strong>Super Admin</strong> for NeetStand.</p>
                        <p>Please click the button below to access your admin panel:</p>
                        <a href="${loginUrl}" style="display: inline-block; background-color: #0f172a; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 10px 0;">Login to Admin Panel</a>
                        
                        <div style="margin-top: 20px; padding: 15px; background-color: #fff3cd; border: 1px solid #ffeeba; border-radius: 5px; color: #856404;">
                            <strong>Security Warning:</strong>
                            <ul style="margin-bottom: 0;">
                                <li>Never share your login details or OTP with anyone.</li>
                                <li>Ensure you are logging in from the official Admin URL.</li>
                            </ul>
                        </div>
                    </div>
                `
            });

            if (emailError) {
                console.error("Failed to send welcome email:", emailError);
                // Don't fail the setup, just log it
            }
        }

        return { success: true };

    } catch (error: any) {
        console.error("Setup Error:", error);
        return { success: false, error: error.message };
    }
}

export async function claimSuperAdmin() {
    // ... existing claimSuperAdmin ...
    // Keeping it for backward compatibility or future use if needed, 
    // but setupSuperAdmin covers it.
    // I'll leave it as is or remove if not used. 
    // It seems "claimSuperAdmin" was an earlier attempt.
    // The wizard uses `setupSuperAdmin` logic.
    return { success: false, error: "Deprecated, use setupSuperAdmin" };
}

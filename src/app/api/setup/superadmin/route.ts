import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { db } from "@drizzle/index";
import { profiles, userRoles } from "@drizzle/schema/index";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { isMe, email, name, superadminRoleId } = await request.json();

    try {
        let targetUserId;

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
            const { data: { users: authUsers }, error: listError } = await supabase.auth.admin.listUsers();

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
                return NextResponse.json({ error: "User not found in Auth. Please register the user first or implementation invite flow." }, { status: 404 });
            }
        }

        // 2. Assign Role
        await db.insert(userRoles).values({
            userId: targetUserId,
            roleId: superadminRoleId
        }).onConflictDoNothing();

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("Setup Error:", error);
        return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to setup superadmin" }, { status: 500 });
    }
}

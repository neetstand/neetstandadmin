import { createClient } from "@supabase/supabase-js";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as dotenv from "dotenv";
import * as schema from "@drizzle/schema/index";
import { eq } from "drizzle-orm";

const { profiles, roles, userRoles } = schema;

dotenv.config({ path: ".env.local" });

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    process.exit(1);
}

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    }
);

const db = drizzle(postgres(process.env.DATABASE_URL!), { schema });

async function main() {
    const email = process.argv[2];
    if (!email) {
        console.error("Usage: npm run promote:owner <email>");
        process.exit(1);
    }

    console.log(`Promoting ${email} to Owner...`);

    // 1. Get Auth User
    const { data: { users: authUsers }, error: userError } = await supabase.auth.admin.listUsers();

    if (userError) {
        console.error("Error listing users:", userError.message);
        process.exit(1);
    }

    const user = authUsers.find(u => u.email === email);

    if (!user) {
        console.error(`User ${email} not found in Auth. Please sign up first.`);
        process.exit(1);
    }

    console.log(`Found Auth User: ${user.id}`);

    // 2. Ensure Profile Exists (Trigger should have handled this, but just in case of race condition or failure)
    // Note: We don't have email in profiles anymore! Just ID.
    const existingProfile = await db.query.profiles.findFirst({
        where: eq(profiles.id, user.id)
    });

    if (!existingProfile) {
        console.log("Profile missing (trigger failure?), creating...");
        await db.insert(profiles).values({
            id: user.id,
            fullName: user.user_metadata?.full_name || "Owner",
            avatarUrl: user.user_metadata?.avatar_url,
        }).onConflictDoNothing();
    }

    // 3. Get Owner Role
    const ownerRole = await db.query.roles.findFirst({
        where: eq(roles.name, "owner")
    });

    if (!ownerRole) {
        console.error("Owner role not found in DB. Run seed first.");
        process.exit(1);
    }

    // 4. Assign Role
    console.log(`Assigning Owner role (${ownerRole.id}) to user ${user.id}...`);
    await db.insert(userRoles).values({
        userId: user.id,
        roleId: ownerRole.id
    }).onConflictDoNothing();

    console.log("Success! User promoted to Owner.");
    process.exit(0);
}

main();

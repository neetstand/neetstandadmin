
import { createClient } from "@supabase/supabase-js";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const databaseUrl = process.env.DATABASE_URL!;

if (!supabaseUrl || !serviceRoleKey || !databaseUrl) {
    console.error("Missing env vars");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

const client = postgres(databaseUrl);
const db = drizzle(client);

async function reset() {
    console.log("🗑️  Emptying database...");

    // 1. Delete all users from Auth (Service Role)
    const { data: { users }, error } = await supabase.auth.admin.listUsers();
    if (error) {
        console.error("Error listing users:", error);
    } else {
        console.log(`Found ${users.length} users to delete.`);
        for (const user of users) {
            const { error: delError } = await supabase.auth.admin.deleteUser(user.id);
            if (delError) console.error(`Failed to delete user ${user.id}:`, delError.message);
            else console.log(`Deleted user ${user.id}`);
        }
    }

    // 2. Truncate Tables
    try {
        console.log("Truncating public tables...");
        // Order matters if no cascade, but CASCADE handles it.
        // We clear settings, user_roles, profiles.
        // permissions/roles might be static (seeded), but user requested "empty database".
        // Usually "empty" means "delete user data", not "delete master data (roles)".
        // I will keep roles/permissions/departments if they are master data.
        // I will definitely clear 'settings'.

        await client`TRUNCATE TABLE public.user_roles, public.profiles, public.settings RESTART IDENTITY CASCADE`;

        console.log("✅ Tables truncated.");
    } catch (e) {
        console.error("Error truncating tables:", e);
    }

    process.exit(0);
}

reset();

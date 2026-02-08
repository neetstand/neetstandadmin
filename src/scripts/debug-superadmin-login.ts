
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

// Load .env.local manually before imports
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
    const envConfig = dotenv.parse(fs.readFileSync(envPath));
    for (const k in envConfig) {
        process.env[k] = envConfig[k];
    }
} else {
    console.warn("No .env.local found at", envPath);
}

async function main() {
    console.log("Debugging Super Admin Login...");

    const { adminAuthClient } = await import("@/utils/supabase/admin");
    const { db } = await import("@drizzle/index");
    const { profiles } = await import("@drizzle/schema/tables/profiles");
    const { eq } = await import("drizzle-orm");

    // 1. List all users in Auth to see what we have
    console.log("--- Auth Users ---");
    const { data: { users }, error: listError } = await adminAuthClient.auth.admin.listUsers();
    if (listError) {
        console.error("Error listing users:", listError);
    } else {
        users.forEach(u => {
            console.log(`- ${u.email} (ID: ${u.id}) [Role: ${u.user_metadata.role || 'N/A'}]`);
        });
    }

    // 2. Check Profiles
    console.log("\n--- Public Profiles ---");
    const allProfiles = await db.select().from(profiles);
    allProfiles.forEach(p => {
        console.log(`- ${p.fullName} (ID: ${p.id}) [Role: ${p.role}]`);
    });

    // 3. Test RPC get_user_id_by_email
    console.log("\n--- Testing RPC get_user_id_by_email ---");
    // Try to find an email to test
    if (users && users.length > 0) {
        const testEmail = users[0].email;
        if (testEmail) {
            console.log(`Testing with email: ${testEmail}`);
            const { data, error } = await adminAuthClient.rpc("get_user_id_by_email", { p_email: testEmail });
            if (error) {
                console.error("RPC Error:", error);
            } else {
                console.log("RPC Result:", data);
            }
        }
    } else {
        console.log("No users to test RPC with.");
    }

    process.exit(0);
}

main();

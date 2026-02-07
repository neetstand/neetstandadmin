
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
    console.log("Checking Owner User...");

    // Dynamic imports to ensure env vars are set first
    const { db } = await import("@drizzle/index");
    const { profiles } = await import("@drizzle/schema/tables/profiles");
    const { adminAuthClient } = await import("@/utils/supabase/admin");
    const { eq } = await import("drizzle-orm");

    // 1. Get Owner from Profiles
    const ownerProfile = await db.select().from(profiles).where(eq(profiles.role, "owner")).limit(1);

    if (ownerProfile.length === 0) {
        console.log("No owner found in profiles table.");
    } else {
        console.log("Owner Profile found:", ownerProfile[0]);
        const userId = ownerProfile[0].id;

        // 2. Get User from Auth Code
        const { data: { user }, error } = await adminAuthClient.auth.admin.getUserById(userId);

        if (error) {
            console.error("Error fetching auth user:", error);
        } else {
            console.log("Auth User Metadata:", user?.user_metadata);
            console.log("Auth User Role (JWT):", user?.role);
        }
    }

    process.exit(0);
}

main();


import * as dotenv from "dotenv";

import * as path from "path";

console.log("Script loaded.");

// Load env vars explicitly
const envPath = path.resolve(process.cwd(), ".env.local");
console.log("Loading env from:", envPath);
dotenv.config({ path: envPath });

async function main() {
    console.log("Starting Database Reset...");

    // Dynamic import to ensure env is loaded before client initialization
    const { client } = await import("../drizzle/index");
    console.log("DB Client imported.");

    try {
        console.log("Truncating auth.users...");
        await client`TRUNCATE TABLE auth.users CASCADE`;
        console.log("SUCCESS: Truncated auth.users");

        console.log("Truncating public.profiles...");
        await client`TRUNCATE TABLE public.profiles CASCADE`;
        console.log("SUCCESS: Truncated public.profiles");

        console.log("Truncating public.settings...");
        await client`TRUNCATE TABLE public.settings CASCADE`;
        console.log("SUCCESS: Truncated public.settings");

        // Verification step
        const users = await client`SELECT count(*) FROM auth.users`;
        const profiles = await client`SELECT count(*) FROM public.profiles`;
        const settings = await client`SELECT count(*) FROM public.settings`;

        console.log("\n--- Verification ---");
        console.log("Users count:", users[0].count);
        console.log("Profiles count:", profiles[0].count);
        console.log("Settings count:", settings[0].count);

    } catch (e) {
        console.error("Error during reset:", e);
        process.exit(1);
    } finally {
        // Close connection
        await client.end();
        process.exit(0);
    }
}

main().catch(console.error);

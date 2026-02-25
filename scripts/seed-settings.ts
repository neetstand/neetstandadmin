import * as dotenv from "dotenv";
import * as path from "path";

// Load env vars explicitly
const envPath = path.resolve(process.cwd(), ".env.local");
dotenv.config({ path: envPath });

async function main() {
    console.log("Starting Settings Seeding...");

    // Dynamic import to ensure env is loaded before client initialization
    const { db } = await import("../drizzle/index");

    // Import schema module
    const { settings } = await import("../drizzle/schema/tables/settings");

    console.log("Forcing initial maintenance_mode = true");

    await db.insert(settings).values({
        variable: "maintenance_mode",
        value: "true",
        description: "Locks the application until a superadmin is configured."
    }).onConflictDoUpdate({
        target: settings.variable,
        set: {
            value: "true",
            description: "Locks the application until a superadmin is configured."
        }
    });

    console.log("✅ Settings Seeding Complete.");
    process.exit(0);
}

main().catch((err) => {
    console.error("❌ Error during settings seeding:", err);
    process.exit(1);
});

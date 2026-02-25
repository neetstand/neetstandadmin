import * as dotenv from "dotenv";
import * as path from "path";
import * as fs from "fs";
import { sql } from "drizzle-orm";

// Load env vars explicitly
const envPath = path.resolve(process.cwd(), ".env.local");
dotenv.config({ path: envPath });

async function main() {
    console.log("Starting Curriculum Seeding...");

    // Dynamic import to ensure env is loaded before client initialization
    const { db } = await import("../drizzle/index");

    // Resolve the path to the moved unified seed.sql file (1 level up from scripts inside apps/admin/drizzle)
    const seedFilePath = path.resolve(process.cwd(), "drizzle/seed.sql");

    if (!fs.existsSync(seedFilePath)) {
        console.error("❌ seed.sql file not found at:", seedFilePath);
        process.exit(1);
    }

    console.log(`Reading SQL seed file from: ${seedFilePath}`);
    const seedSql = fs.readFileSync(seedFilePath, "utf-8");

    console.log("Executing SQL statements...");

    // Execute the raw generated SQL statements
    await db.execute(sql.raw(seedSql));

    console.log("✅ Curriculum Seeding Complete.");
    process.exit(0);
}

main().catch((err) => {
    console.error("❌ Error during curriculum seeding:", err);
    process.exit(1);
});

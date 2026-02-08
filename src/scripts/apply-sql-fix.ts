
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { sql } from "drizzle-orm";

// Load .env.local manually before imports
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
    const envConfig = dotenv.parse(fs.readFileSync(envPath));
    for (const k in envConfig) {
        process.env[k] = envConfig[k];
    }
}

async function main() {
    console.log("Applying SQL Fix...");

    const { db } = await import("@drizzle/index");

    const sqlPath = path.join(process.cwd(), "drizzle/functions/get_user_id_by_email.sql");
    const sqlContent = fs.readFileSync(sqlPath, "utf-8");

    console.log("Executing SQL from:", sqlPath);
    try {
        await db.execute(sql.raw(sqlContent));
        console.log("Successfully applied SQL fix.");
    } catch (e) {
        console.error("Failed to apply SQL:", e);
    }

    process.exit(0);
}

main();

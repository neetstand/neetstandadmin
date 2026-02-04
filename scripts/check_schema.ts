import { db } from "../drizzle/index";
import { sql } from "drizzle-orm";

async function main() {
    console.log("Checking profiles table schema...");
    try {
        const result = await db.execute(sql`
            SELECT column_name, data_type, is_nullable
            FROM information_schema.columns
            WHERE table_name = 'profiles'
            ORDER BY ordinal_position;
        `);
        console.log("Columns:", JSON.stringify(result, null, 2));
    } catch (e) {
        console.error("Query failed:", e);
    }
    process.exit(0);
}

main();

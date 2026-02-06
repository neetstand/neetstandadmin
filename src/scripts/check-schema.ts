
import { db } from "@drizzle/index";
import { sql } from "drizzle-orm";

async function main() {
    try {
        const result = await db.execute(sql`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_schema = 'public' 
            AND table_name = 'settings'
            AND column_name = 'value';
        `);
        console.log("SCHEMA CHECK RESULT:", JSON.stringify(result, null, 2));
    } catch (e) {
        console.error("Error checking schema:", e);
    }
    process.exit(0);
}

main();

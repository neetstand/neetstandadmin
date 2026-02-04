import { db } from "../drizzle/index";
import { sql } from "drizzle-orm";

async function main() {
    console.log("Testing DB connection...");
    try {
        const result = await db.execute(sql`select now()`);
        console.log("Connection successful:", result);
    } catch (e) {
        console.error("Connection failed:", e);
    }
    process.exit(0);
}

main();

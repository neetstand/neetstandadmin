
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as dotenv from "dotenv";
import { readFileSync } from "fs";
import { join } from "path";

dotenv.config({ path: ".env.local" });
if (!process.env.DATABASE_URL) {
    dotenv.config({ path: "/Users/ajaynagar/Documents/neetstand/apps/admin/.env.local" });
}

const client = postgres(process.env.DATABASE_URL!);
const db = drizzle(client);

async function main() {
    console.log("Applying trigger...");
    const triggerPath = join(process.cwd(), "drizzle/triggers/on_auth_user_created.sql");
    const sqlContent = readFileSync(triggerPath, "utf-8");

    try {
        await client.unsafe(sqlContent);
        console.log("Trigger applied successfully.");
    } catch (e: any) {
        console.error("Failed to apply trigger:", e);
    }

    process.exit(0);
}

main();

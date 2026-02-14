
import dotenv from "dotenv";
import { Client } from "pg";
import fs from "fs";
import path from "path";

dotenv.config({ path: ".env.local" });

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
    console.error("DATABASE_URL is not set.");
    process.exit(1);
}

const client = new Client({
    connectionString: dbUrl,
});

async function runMigration() {
    try {
        await client.connect();
        console.log("Connected to database.");

        // 1. Enable pg_net extension
        console.log("Enabling pg_net extension...");
        await client.query("CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;");
        console.log("pg_net extension enabled.");

        // 2. Read send_email.sql
        const functionPath = path.join(process.cwd(), "drizzle/functions/send_email.sql");
        const sql = fs.readFileSync(functionPath, "utf8");

        // 3. Apply Function
        console.log("Applying send_email function...");
        await client.query(sql);
        console.log("send_email function applied successfully.");

        // 4. Verify Extension
        const res = await client.query("SELECT * FROM pg_extension WHERE extname = 'pg_net';");
        if (res.rows.length > 0) {
            console.log("✅ Verification: pg_net is installed.");
        } else {
            console.error("❌ Verification: pg_net is NOT installed.");
        }

    } catch (err) {
        console.error("Migration failed:", err);
    } finally {
        await client.end();
    }
}

runMigration();

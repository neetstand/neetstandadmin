import { Client } from "pg";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function migrateFunction() {
    if (!process.env.DATABASE_URL) {
        console.error("DATABASE_URL is missing");
        process.exit(1);
    }

    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    });

    try {
        await client.connect();

        const files = ["send_email.sql", "debug_email.sql"];

        for (const file of files) {
            const filePath = path.join(process.cwd(), "drizzle/functions", file);
            if (fs.existsSync(filePath)) {
                const sqlContent = fs.readFileSync(filePath, "utf-8");
                console.log(`Applying ${file}...`);
                await client.query(sqlContent);
                console.log(`Successfully applied ${file}.`);
            } else {
                console.error(`File not found: ${filePath}`);
            }
        }

    } catch (error) {
        console.error("Failed to apply function:", error);
    } finally {
        await client.end();
        process.exit();
    }
}

migrateFunction();

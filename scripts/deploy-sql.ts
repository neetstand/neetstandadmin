
import { Client } from "pg";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function deploySql() {
    if (!process.env.DATABASE_URL) {
        console.error("DATABASE_URL is missing");
        process.exit(1);
    }

    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    });

    try {
        await client.connect();
        console.log("Connected to database for SQL deployment...");

        // Order matters: Functions first, then Triggers, then Policies
        // Functions might be needed by triggers. Policies might depend on functions.
        const directories = ["functions", "triggers", "policies"];

        for (const dir of directories) {
            const dirPath = path.join(process.cwd(), "drizzle", dir);

            if (!fs.existsSync(dirPath)) {
                console.log(`Directory not found: ${dir} (skipping)`);
                continue;
            }

            const files = fs.readdirSync(dirPath).filter(file => file.endsWith(".sql"));

            if (files.length === 0) {
                console.log(`No SQL files found in ${dir}`);
                continue;
            }

            console.log(`\n📂 Deploying ${dir}...`);

            for (const file of files) {
                const filePath = path.join(dirPath, file);
                const sqlContent = fs.readFileSync(filePath, "utf-8");

                try {
                    console.log(`   - Applying part: ${file}...`);
                    await client.query(sqlContent);
                    console.log(`     ✅ Success`);
                } catch (err: any) {
                    console.error(`     ❌ Failed to apply ${file}: ${err.message}`);
                    // We might want to throw here to stop the fresh script if strict
                    // For now, let's log and continue or throw based on preference. 
                    // Usually for a fresh start, we want it to fail if something is wrong.
                    throw err;
                }
            }
        }

        console.log("\n✨ All SQL deployments completed successfully.");

    } catch (error) {
        console.error("\n❌ SQL Deployment Failed:", error);
        process.exit(1);
    } finally {
        await client.end();
    }
}

deploySql();

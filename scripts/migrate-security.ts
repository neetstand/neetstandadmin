import { execFileSync } from "child_process";
import * as dotenv from "dotenv";
import { readdirSync, existsSync } from "fs";
import { join } from "path";

// Load env
const envConfig = dotenv.config({
    path: process.env.NODE_ENV === "development" ? ".env.local" : ".env.production",
});

// If .env.local didn't work or we are in a different env, try generic .env
if (envConfig.error) {
    dotenv.config();
}

// Prefer direct DB for schema changes
// User might use DATABASE_URL or DATABASE_URL_SESSION.
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
    console.error("DATABASE_URL is not set!");
    process.exit(1);
}

// Note: The order matters. Functions first, then triggers/policies that might use them.
// Policies often depend on functions/tables.
const folders = ["drizzle/functions", "drizzle/triggers", "drizzle/policies"];

folders.forEach((folder) => {
    const folderPath = join(process.cwd(), folder);
    if (!existsSync(folderPath)) {
        console.log(`Skipping missing folder: ${folderPath}`);
        return;
    }

    const files = readdirSync(folderPath).filter((f) => f.endsWith(".sql"));
    if (files.length === 0) {
        console.log(`No .sql files found in ${folder}`);
        return;
    }

    files.forEach((file) => {
        const fullPath = join(folderPath, file);
        console.log(`Applying ${folder}/${file}...`);
        try {
            execFileSync("psql", [DATABASE_URL, "-f", fullPath], {
                stdio: "inherit",
            });
        } catch (err) {
            console.error(`Failed to apply ${fullPath}:`, err);
            process.exit(1);
        }
    });
});

console.log("All SQL files applied successfully.");

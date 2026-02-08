
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

// Load .env.local manually
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
    const envConfig = dotenv.parse(fs.readFileSync(envPath));
    for (const k in envConfig) {
        process.env[k] = envConfig[k];
    }
}

async function main() {
    console.log("Checking Role Hierarchy...");

    const { db } = await import("@drizzle/index");
    const { roles } = await import("@drizzle/schema/tables/roles");

    const allRoles = await db.select().from(roles);
    console.log("Current Roles:");
    allRoles.forEach(r => {
        console.log(`- ${r.name}: Level ${r.hierarchyLevel}`);
    });

    process.exit(0);
}

main();

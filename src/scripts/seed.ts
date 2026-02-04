import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as dotenv from "dotenv";
import { roles } from "@drizzle/schema/index";

dotenv.config({ path: ".env.local" });

const client = postgres(process.env.DATABASE_URL!);
const db = drizzle(client);

async function main() {
    console.log("Seeding roles...");
    const roleData = [
        { name: "owner", description: "System Owner", hierarchyLevel: 100 },
        { name: "superadmin", description: "Super Administrator", hierarchyLevel: 90 },
        { name: "functional_manager", description: "Functional Manager", hierarchyLevel: 50 },
        { name: "manager", description: "Standard Manager", hierarchyLevel: 20 },
        { name: "support", description: "Back Office Support", hierarchyLevel: 10 },
    ];

    for (const role of roleData) {
        await db.insert(roles).values(role).onConflictDoNothing();
    }
    console.log("Roles seeded.");
    process.exit(0);
}

main();

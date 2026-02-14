
import * as dotenv from "dotenv";
import * as path from "path";
import { eq } from "drizzle-orm";

console.log("Script loaded.");

// Load env vars explicitly
const envPath = path.resolve(process.cwd(), ".env.local");
console.log("Loading env from:", envPath);
dotenv.config({ path: envPath });

async function main() {
    console.log("Starting Role Seeding...");

    // Dynamic import to ensure env is loaded before client initialization
    const { db } = await import("../drizzle/index");
    console.log("DB Client imported.");

    // Import schema modules
    const { roles } = await import("../drizzle/schema/tables/roles");

    const requiredRoles = [
        { name: "owner", description: "System Owner", hierarchyLevel: 100 },
        { name: "superadmin", description: "Super Administrator", hierarchyLevel: 90 },
        { name: "functional_manager", description: "Functional Manager", hierarchyLevel: 50 },
        { name: "manager", description: "Standard Manager", hierarchyLevel: 20 },
        { name: "support", description: "Back Office Support", hierarchyLevel: 10 },
        { name: "user", description: "Standard User", hierarchyLevel: 1 },
    ];

    for (const roleData of requiredRoles) {
        console.log(`Processing role: ${roleData.name}`);
        await db.insert(roles).values(roleData)
            .onConflictDoUpdate({
                target: roles.name,
                set: {
                    description: roleData.description,
                    hierarchyLevel: roleData.hierarchyLevel
                }
            });
    }

    console.log("Seeding Complete.");
    process.exit(0);
}

main().catch(console.error);

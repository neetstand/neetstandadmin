import postgres from "postgres";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const client = postgres(process.env.DATABASE_URL!);

async function main() {
    console.log("Resetting RBAC tables...");
    try {
        await client`TRUNCATE TABLE role_permissions CASCADE`;
        await client`TRUNCATE TABLE user_roles CASCADE`;
        await client`TRUNCATE TABLE permissions CASCADE`;
        await client`TRUNCATE TABLE roles CASCADE`;
        console.log("RBAC tables truncated.");
    } catch (e) {
        console.error("Error truncating tables:", e);
    }
    process.exit(0);
}

main();

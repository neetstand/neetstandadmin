
import postgres from 'postgres';

async function main() {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
        console.error("DATABASE_URL is not set");
        process.exit(1);
    }

    const sql = postgres(connectionString, { ssl: { rejectUnauthorized: false } });

    try {
        console.log("Enabling Maintenance Mode in DB...");
        await sql`
            INSERT INTO "public"."settings" (variable, value, description, "updated_at")
            VALUES ('maintenance_mode', 'true', 'Global Maintenance Mode', NOW())
            ON CONFLICT (variable) DO UPDATE
            SET value = 'true', "updated_at" = NOW();
        `;

        const result = await sql`SELECT * FROM "public"."settings" WHERE variable = 'maintenance_mode'`;
        console.log("Maintenance Mode Updated:", result);

        await sql.end();
    } catch (e) {
        console.error("Error updating settings:", e);
        await sql.end();
    }
}

main();

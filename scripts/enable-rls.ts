
import postgres from 'postgres';

async function main() {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
        console.error("DATABASE_URL is not set");
        process.exit(1);
    }

    const sql = postgres(connectionString, { ssl: { rejectUnauthorized: false } });

    console.log("Enabling RLS on settings table...");
    try {
        await sql`ALTER TABLE "public"."settings" ENABLE ROW LEVEL SECURITY;`;
        console.log("RLS enabled.");

        console.log("Adding Public read access policy...");
        // Drop if exists
        try {
            await sql`DROP POLICY "Public read access" ON "public"."settings";`;
        } catch (e) {
            // Ignore if not exists
        }

        await sql`
            CREATE POLICY "Public read access" ON "public"."settings"
            FOR SELECT
            TO anon, authenticated, service_role
            USING (true);
        `;
        console.log("Policy added successfully.");
        await sql.end();
        process.exit(0);
    } catch (e) {
        console.error("Migration failed:", e);
        await sql.end();
        process.exit(1);
    }
}

main();

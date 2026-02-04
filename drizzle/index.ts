import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema/index';

const connectionString = process.env.DATABASE_URL!;

// Disable prefetch as it is not supported for "Transaction" pool mode
export const client = postgres(connectionString, {
    prepare: false,
    connect_timeout: 30,
    ssl: { rejectUnauthorized: false } // Fix for some self-signed cert issues or strict SSL fail
});
export const db = drizzle(client, { schema });

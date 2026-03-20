import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load local first (source)
dotenv.config({ path: '.env.local' });

// Store local creds
const SOURCE_URL = process.env.SUPABASE_URL!;
const SOURCE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Load production next (target)
dotenv.config({ path: '.env.production' });

// Store prod creds
const TARGET_URL = process.env.SUPABASE_URL!;
const TARGET_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Create clients
const source = createClient(SOURCE_URL, SOURCE_KEY);
const target = createClient(TARGET_URL, TARGET_KEY);

const tableName = process.argv[2];

if (!tableName) {
    console.error('❌ Please provide a table name');
    process.exit(1);
}

async function migrate(tableName: string) {
    const { data, error } = await source.from(tableName).select('*');
    if (error) throw error;

    const { error: insertError } = await target.from(tableName).insert(data);
    if (insertError) throw insertError;

    console.log('Migration complete');
}

migrate(tableName);

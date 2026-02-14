
import { db } from "@drizzle/index";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        console.log("Started DB Fix via API...");

        // 1. Create Table
        await db.execute(sql`
            CREATE TABLE IF NOT EXISTS public.email_queue (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                to_email TEXT NOT NULL,
                from_email TEXT NOT NULL,
                subject TEXT NOT NULL,
                html_body TEXT NOT NULL,
                status TEXT DEFAULT 'pending',
                created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                processed_at TIMESTAMP WITH TIME ZONE,
                error TEXT
            );
        `);

        // 2. Drop Old Functions
        await db.execute(sql`DROP FUNCTION IF EXISTS public.send_email(text,text,text,text);`);
        await db.execute(sql`DROP FUNCTION IF EXISTS public.send_email(text,text,text,text,text);`);

        // 3. Create New Function
        await db.execute(sql`
            CREATE OR REPLACE FUNCTION public.send_email(
              to_email text,
              from_email text,
              subject text,
              html_body text
            ) RETURNS text LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
            DECLARE
              new_id UUID;
            BEGIN
              INSERT INTO public.email_queue (to_email, from_email, subject, html_body)
              VALUES (to_email, from_email, subject, html_body)
              RETURNING id INTO new_id;
              
              RETURN jsonb_build_object('success', true, 'queue_id', new_id)::text;
            END;
            $$;
        `);

        // 4. Permissions
        await db.execute(sql`REVOKE EXECUTE ON FUNCTION public.send_email(text,text,text,text) FROM public;`);
        await db.execute(sql`GRANT EXECUTE ON FUNCTION public.send_email(text,text,text,text) TO authenticated;`);
        await db.execute(sql`GRANT EXECUTE ON FUNCTION public.send_email(text,text,text,text) TO service_role;`);

        return NextResponse.json({ success: true, message: "Database fixed successfully." });
    } catch (error: any) {
        console.error("DB Fix Failed:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

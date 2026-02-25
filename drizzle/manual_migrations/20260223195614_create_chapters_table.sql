-- Create the chapters table
CREATE TABLE IF NOT EXISTS public.chapters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chapter_code TEXT UNIQUE NOT NULL,
    subject TEXT NOT NULL,
    class INTEGER NOT NULL,
    chapter_number INTEGER NOT NULL,
    chapter_name TEXT NOT NULL,
    chapter_short_description TEXT,
    chapter_detailed_description TEXT,
    sub_subject TEXT,
    weightage_percent NUMERIC,
    toughness TEXT,
    tactical_strategy TEXT,
    learning_speed TEXT,
    number_of_topics INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.chapters ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access on chapters"
    ON public.chapters
    FOR SELECT
    USING (true);

-- Allow admins/service role full access
CREATE POLICY "Allow full access for service role on chapters"
    ON public.chapters
    USING (auth.jwt() ->> 'role' = 'service_role');

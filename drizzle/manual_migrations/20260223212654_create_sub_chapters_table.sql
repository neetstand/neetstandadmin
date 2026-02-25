-- Create the sub_chapters table
CREATE TABLE IF NOT EXISTS public.sub_chapters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sub_chapter_code TEXT UNIQUE NOT NULL,
    chapter_code TEXT NOT NULL REFERENCES public.chapters(chapter_code) ON DELETE CASCADE,
    sub_chapter_name TEXT NOT NULL,
    english_video_url TEXT,
    hinglish_video_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.sub_chapters ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access on sub_chapters"
    ON public.sub_chapters
    FOR SELECT
    USING (true);

-- Allow admins/service role full access
CREATE POLICY "Allow full access for service role on sub_chapters"
    ON public.sub_chapters
    USING (auth.jwt() ->> 'role' = 'service_role');

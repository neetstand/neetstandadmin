-- Create indexes to optimize queries on chapters and sub_chapters tables

-- 1. Index on the 'subject' and 'class' columns in the chapters table
--    This speeds up queries filtering chapters by subject and/or class.
CREATE INDEX IF NOT EXISTS idx_chapters_subject_class ON public.chapters (subject, class);

-- 2. Index on the 'chapter_code' foreign key in the sub_chapters table
--    This speeds up queries fetching all sub-chapters for a specific chapter.
CREATE INDEX IF NOT EXISTS idx_sub_chapters_chapter_code ON public.sub_chapters (chapter_code);

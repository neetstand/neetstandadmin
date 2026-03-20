DROP FUNCTION IF EXISTS public.reset_practice_session(UUID, UUID, JSONB) CASCADE;

CREATE OR REPLACE FUNCTION public.reset_practice_session(
    p_user_id UUID,
    p_sub_chapter_id UUID,
    p_questions JSONB
)
RETURNS TABLE (
    id UUID,
    question_id TEXT,
    question_order INTEGER
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- Security Check: Ensure caller manages their own session unless service role
    IF auth.uid() IS NOT NULL AND auth.uid() != p_user_id THEN
        RAISE EXCEPTION 'Unauthorized: Session user ID does not match parameter user ID';
    END IF;

    -- 1. Atomically clear previous session for this exact sub-chapter
    DELETE FROM public.user_questions
    WHERE user_id = p_user_id AND sub_chapter_id = p_sub_chapter_id;

    -- 2. Insert cleanly from dynamically mapped JSON array
    RETURN QUERY
    INSERT INTO public.user_questions (
        user_id, 
        question_id, 
        sub_chapter_id, 
        difficulty, 
        correct_option_id, 
        shown_at, 
        question_order
    )
    SELECT 
        p_user_id,
        (q->>'question_id'),
        p_sub_chapter_id,
        q->>'difficulty',
        (q->>'correct_option_id'),
        now(),
        (q->>'question_order')::INTEGER
    FROM jsonb_array_elements(p_questions) AS q
    RETURNING 
        public.user_questions.id, 
        public.user_questions.question_id, 
        public.user_questions.question_order;
END;
$$;

-- RLS / Access rules mapping
REVOKE EXECUTE ON FUNCTION public.reset_practice_session(UUID, UUID, JSONB) FROM public;
GRANT EXECUTE ON FUNCTION public.reset_practice_session(UUID, UUID, JSONB) TO authenticated, service_role;

-- Function to generate a diagnostic test
DROP FUNCTION IF EXISTS public.generate_diagnostic_test(uuid) CASCADE;

CREATE OR REPLACE FUNCTION public.generate_diagnostic_test(p_user_id uuid)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_attempt_id uuid;
    v_state json;
    v_true_stmt RECORD;
    v_false_st RECORD;
    v_picked_falses uuid[];
    v_used_falses uuid[] := '{}';
    v_options uuid[];
    v_shuffled_options uuid[];
    v_correct_idx int;
    v_option_letters text[] := ARRAY['A', 'B', 'C', 'D'];
BEGIN
    -- 1. Check if user already has an attempt
    SELECT json_build_object(
        'status', CASE WHEN dr.id IS NOT NULL THEN 'COMPLETED' ELSE 'IN_PROGRESS' END,
        'attemptId', da.id
    ) INTO v_state
    FROM diagnostic_attempts da
    LEFT JOIN diagnostic_results dr ON da.id = dr.attempt_id
    WHERE da.user_id = p_user_id
    ORDER BY da.created_at DESC
    LIMIT 1;

    IF v_state IS NOT NULL THEN
        RETURN json_build_object(
            'success', true,
            'status', v_state->>'status',
            'attemptId', v_state->>'attemptId'
        );
    END IF;

    -- 2. Create attempt
    INSERT INTO diagnostic_attempts (user_id)
    VALUES (p_user_id)
    RETURNING id INTO v_attempt_id;

    -- 3. Select target statements
    FOR v_true_stmt IN (
        (SELECT id, subject FROM diagnostic_statement_bank WHERE subject = 'Biology' AND is_correct = true ORDER BY random() LIMIT 15)
        UNION ALL
        (SELECT id, subject FROM diagnostic_statement_bank WHERE subject = 'Chemistry' AND is_correct = true ORDER BY random() LIMIT 8)
        UNION ALL
        (SELECT id, subject FROM diagnostic_statement_bank WHERE subject = 'Physics' AND is_correct = true ORDER BY random() LIMIT 7)
    ) LOOP
        v_picked_falses := '{}';
        
        -- Pick 3 false statements from the SAME subject
        FOR v_false_st IN (
            SELECT id FROM diagnostic_statement_bank 
            WHERE subject = v_true_stmt.subject AND is_correct = false AND NOT (id = ANY(v_used_falses))
            ORDER BY random() LIMIT 3
        ) LOOP
            v_picked_falses := array_append(v_picked_falses, v_false_st.id);
            v_used_falses := array_append(v_used_falses, v_false_st.id);
        END LOOP;

        IF array_length(v_picked_falses, 1) < 3 THEN
             RAISE EXCEPTION 'Not enough false statements for subject %', v_true_stmt.subject;
        END IF;

        -- Shuffle options dynamically
        v_options := ARRAY[v_true_stmt.id, v_picked_falses[1], v_picked_falses[2], v_picked_falses[3]];
        
        SELECT array_agg(val ORDER BY random()) INTO v_shuffled_options
        FROM unnest(v_options) AS val;

        -- Find correct index
        FOR i IN 1..4 LOOP
            IF v_shuffled_options[i] = v_true_stmt.id THEN
                v_correct_idx := i;
                EXIT;
            END IF;
        END LOOP;

        -- Insert as a diagnostic_question (1 true + 3 false from same subject)
        INSERT INTO diagnostic_questions (
            attempt_id, option_a, option_b, option_c, option_d, correct_option, subject
        ) VALUES (
            v_attempt_id, v_shuffled_options[1], v_shuffled_options[2], v_shuffled_options[3], v_shuffled_options[4], v_option_letters[v_correct_idx], v_true_stmt.subject
        );

    END LOOP;

    RETURN json_build_object(
        'success', true,
        'status', 'CREATED',
        'attemptId', v_attempt_id
    );
END;
$$;

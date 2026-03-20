"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function getAdminChallenges() {
    const supabase = await createClient();

    // Check if user is authenticated and is an admin/SME (we don't strictly enforce SME specifically via DB yet, but we rely on role)
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { status: "error", message: "Not authenticated" };
    }

    const { data, error } = await supabase
        .from("question_challenges")
        .select(`
            id,
            status,
            sme_comment,
            user_comment,
            issue_type,
            created_at,
            user_id,
            question_id,
            profiles!question_challenges_user_id_fkey (
                full_name,
                email
            ),
            questions!fk_question_challenges_questions (
                question_text,
                difficulty_level,
                sub_chapters!questions_sub_chapter_code_sub_chapters_sub_chapter_code_fk (
                    sub_chapter_name,
                    chapters!sub_chapters_chapter_code_chapters_chapter_code_fk (
                        subject,
                        chapter_name
                    )
                ),
                options (
                    answer_id,
                    option_text,
                    is_correct,
                    option_hint
                )
            )
        `)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching admin challenges:", error);
        return { status: "error", message: error.message };
    }

    return { status: "success", data };
}

export async function updateChallengeStatus(question_id: string, status: "Under Review" | "Accepted" | "Rejected", sme_comment: string) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { status: "error", message: "Not authenticated" };
    }

    const { error } = await supabase
        .from("question_challenges")
        .update({
            status,
            sme_comment,
            reviewer_id: user.id,
            updated_at: new Date().toISOString()
        })
        .eq("question_id", question_id);

    if (error) {
        console.error("Error updating challenge:", error);
        return { status: "error", message: error.message };
    }

    revalidatePath("/dashboard/challenges");
    return { status: "success" };
}

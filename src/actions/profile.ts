
"use server";

import { db } from "@drizzle/index";
import { profiles } from "@drizzle/schema/tables/profiles";
import { eq } from "drizzle-orm";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateProfile(formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { success: false, error: "Not authenticated" };

    const fullName = formData.get("fullName") as string;
    // Notification preferences
    const newsletter = formData.get("newsletter") === "on";
    const courseLaunch = formData.get("courseLaunch") === "on";
    const cityEvents = formData.get("cityEvents") === "on";
    const emailPref = formData.get("emailPref") === "on"; // maps to 'email' column
    const sms = formData.get("sms") === "on";
    const phone = formData.get("phone") === "on";

    try {
        await db.update(profiles)
            .set({
                fullName,
                newsletter,
                courseLaunch,
                cityEvents,
                email: emailPref,
                sms,
                phone,
                updatedAt: new Date(),
            })
            .where(eq(profiles.id, user.id));

        revalidatePath("/dashboard/profile");
        return { success: true };
    } catch (error: any) {
        console.error("Profile update error:", error);
        return { success: false, error: "Failed to update profile" };
    }
}

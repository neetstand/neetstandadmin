"use server";

import { adminAuthClient } from "@/utils/supabase/admin";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { db } from "@drizzle/index";
import { profiles } from "@drizzle/schema/tables/profiles";
import { eq } from "drizzle-orm";

function generateCode(): string {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 8; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

// Helper to check if any owner exists
async function isSystemOwnerSet() {
    const owners = await db.select().from(profiles).where(eq(profiles.role, "owner")).limit(1);
    return owners.length > 0;
}

// Helper RPC wrapper
async function getUserIdByEmail(email: string): Promise<string | null> {
    const { data, error } = await adminAuthClient.rpc("get_user_id_by_email", { p_email: email });
    if (error || !data) return null;
    return data as string;
}

export async function setupOwner(email: string, password: string, name: string) {
    if (await isSystemOwnerSet()) {
        throw new Error("System already has an owner.");
    }

    const supabase = await createClient();

    // 2. Create User with Email + Password
    const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: name,
                role: 'owner'
            },
            emailRedirectTo: `${process.env.ADMIN_URL}/login`
        }
    });

    if (signUpError) {
        // Silently handle "User already registered" to avoid server console noise
        // Ensure we catch it regardless of case or minor wording differences
        const msg = signUpError.message?.toLowerCase() || "";
        if (msg.includes("user already registered") || signUpError.code === "user_already_exists") {
            return { success: false, error: "User already registered" };
        }
        console.error("SignUp Error Details:", JSON.stringify(signUpError, null, 2));
        throw signUpError;
    }

    // Force sign out to prevent auto-login session from persisting
    await supabase.auth.signOut();

    // Standard SignUp sends confirmation email automatically (based on Supabase Project Settings).
    // No manual Magic Link needed per user request.

    return { success: true };
}

export async function resendOwnerOTP(email: string) {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithOtp({
        email
    });

    if (error) throw error;
    return { success: true };
}

// Helper to check if Super Admin exists
async function isSuperAdminSet() {
    const superAdmins = await db.select().from(profiles).where(eq(profiles.role, "superadmin")).limit(1);
    return superAdmins.length > 0;
}

export async function login(email: string) {
    // 1. Check if user exists
    const userId = await getUserIdByEmail(email);
    if (!userId) {
        throw new Error("User not found");
    }

    // 2. Check System Lock (Owner `isActive`)
    const profile = await db.select().from(profiles).where(eq(profiles.id, userId)).limit(1);
    if (!profile.length) throw new Error("Profile not found");

    const userRole = profile[0].role;

    const ownerProfile = await db.select().from(profiles).where(eq(profiles.role, "owner")).limit(1);
    const isSystemActive = ownerProfile.length > 0 && ownerProfile[0].isActive;

    // Strict Lock: Only Owner can log in if system is inactive
    if (!isSystemActive) {
        if (userRole !== "owner") {
            throw new Error("System is strictly locked until Owner activates account.");
        }
    }

    // 3. Determine Auth Mode
    const superAdminExists = await isSuperAdminSet();

    // If Super Admin is NOT set (Setup Phase), allow Password Login for Owner
    if (!superAdminExists && userRole === "owner") {
        return { success: true, mode: "password" };
    }

    // Otherwise, Standard OTP Flow
    const code = generateCode();

    // Set password to the new code (OTP)
    const { error: updateError } = await adminAuthClient.auth.admin.updateUserById(userId, {
        password: code
    });

    if (updateError) throw updateError;

    // Save OTP generation time
    await db.update(profiles)
        .set({ otpGeneratedAt: new Date() })
        .where(eq(profiles.id, userId));

    // Send Email
    const { error: emailError } = await adminAuthClient.rpc("send_email", {
        to_email: email,
        from_email: "no-reply@neetstand.com",
        subject: "NeetStand Admin Login Code",
        html_body: `<p>Your login code is: <strong>${code}</strong></p>`
    });

    if (emailError) throw new Error("Failed to send email");

    return { success: true, mode: "otp" };
}

export async function verifyLogin(email: string, codeOrPassword: string) {
    // 1. Standard Supabase Login
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: codeOrPassword
    });

    if (error) {
        return { success: false, error: error.message };
    }
    if (!data.user) {
        return { success: false, error: "Login failed" };
    }

    // 2. Post-Login Checks
    const userId = data.user.id;
    const profile = await db.select().from(profiles).where(eq(profiles.id, userId)).limit(1);

    let role = "user"; // Default role if not found (should exist)
    if (profile.length > 0) {
        const user = profile[0];
        role = user.role;

        // OTP Expiry Check (10 minutes) - ONLY if in OTP mode
        // How do we know if we are in OTP mode? 
        // 1. If Super Admin Exists -> OTP Mode Enforced
        // 2. If Owner AND No Super Admin -> Password Mode Allowed (Skip OTP check)

        const superAdminExists = await isSuperAdminSet();
        const isPasswordMode = !superAdminExists && role === "owner";

        if (!isPasswordMode && (role === "owner" || role === "superadmin")) {
            const otpTime = user.otpGeneratedAt;
            if (!otpTime) {
                await supabase.auth.signOut();
                return { success: false, error: "OTP expired or invalid. Please request a new one." };
            }

            const now = new Date();
            const diffMinutes = (now.getTime() - new Date(otpTime).getTime()) / 1000 / 60;

            if (diffMinutes > 10) {
                await supabase.auth.signOut();
                return { success: false, error: "OTP has expired. Please request a new one." };
            }
        }

        // Activation Logic
        if (user.role === "owner" && !user.isActive) {
            await db.update(profiles).set({ isActive: true }).where(eq(profiles.id, userId));
        }
    }

    return { success: true, role };
}

export async function signOutAction() {
    const supabase = await createClient();
    await supabase.auth.signOut();

    // Check system status to determine redirect destination
    const { data } = await adminAuthClient.rpc("check_system_status");

    if (data && !data.superadmin_exists) {
        redirect("/setup");
    }

    redirect("/login");
}

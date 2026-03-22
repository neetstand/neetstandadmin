"use server";

import { createAdminClient } from "@/utils/supabase/admin";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { db } from "@drizzle/index";
import { profiles } from "@drizzle/schema/tables/profiles";
import { settings } from "@drizzle/schema/tables/settings";
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
    const adminAuthClient = createAdminClient();
    const { data, error } = await adminAuthClient.rpc("get_user_id_by_email", { p_email: email });
    if (error || !data) return null;
    return data as string;
}


async function handleEmailFallback(email: string, type: 'signup' | 'invite') {
    const adminClient = createAdminClient();

    // 1. Check if email is configured in settings
    const emailConfig = await db.select().from(settings).where(eq(settings.variable, 'email_api_key')).limit(1);
    const hasConfig = emailConfig.length > 0 && !!emailConfig[0].value;

    if (!hasConfig) return false;

    try {
        // 2. Generate a confirmation link via Admin API
        const linkParams: any = {
            type: type === 'signup' ? 'signup' : 'magiclink',
            email,
            options: { redirectTo: `${process.env.NEXT_PUBLIC_ADMIN_URL}/auth/confirm?next=/login` }
            // options: { redirectTo: `https://admin.neetstand.com/auth/confirm?next=/login` }
        };

        const { data: linkData, error: linkError } = await adminClient.auth.admin.generateLink(linkParams);

        if (linkError || !linkData?.properties?.action_link) {
            console.error("Link Generation Error:", linkError);
            return false;
        }

        // 3. Send using our custom RPC
        const subject = type === 'signup' ? "Verify your NeetStand Owner Account" : "NeetStand Login Link";
        const htmlBody = `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                <h2>Welcome to NeetStand</h2>
                <p>Click the button below to verify your account and complete setup:</p>
                <a href="${linkData.properties.action_link}" style="display: inline-block; padding: 12px 24px; background-color: #0f172a; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">Verify Account</a>
                <p style="margin-top: 24px; font-size: 14px; color: #64748b;">If the button doesn't work, copy and paste this link: <br/> ${linkData.properties.action_link}</p>
            </div>
        `;

        await adminClient.rpc('send_email', {
            to_email: email,
            subject,
            html_body: htmlBody
        });

        return true;
    } catch (e) {
        console.error("Manual Email Fallback Failed:", e);
        return false;
    }
}

export async function setupOwner(email: string, password: string, name: string) {
    if (await isSystemOwnerSet()) {
        throw new Error("System already has an owner.");
    }

    const supabase = await createClient();

    // 1. Create User with Email + Password
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: name,
                role: 'owner'
            },
            emailRedirectTo: `${process.env.NEXT_PUBLIC_ADMIN_URL}/auth/confirm?next=/setup`
            // emailRedirectTo: `https://admin.neetstand.com/auth/confirm?next=/setup`
        }
    });

    if (signUpError) {
        // If it's a rate limit error, try manual fallback
        if (signUpError.message?.toLowerCase().includes("rate limit") || signUpError.status === 429) {
            const fallbackSuccess = await handleEmailFallback(email, 'signup');
            if (fallbackSuccess) {
                return { success: true, manual: true };
            }
        }

        // Standard error handling
        const msg = signUpError.message?.toLowerCase() || "";
        if (msg.includes("user already registered") || signUpError.code === "user_already_exists") {
            return { success: false, error: "User already registered" };
        }
        throw signUpError;
    }

    // Do NOT signOut() here. If email confirmation is required, signUp doesn't
    // start a session anyway, but it DOES set the PKCE verifier cookie.
    // signOut() would nuke that cookie and break the verification link.

    return { success: true };
}

export async function resendOwnerOTP(email: string) {
    // 1. Check if user is already confirmed
    const adminClient = createAdminClient();
    const { data: { users }, error: listError } = await adminClient.auth.admin.listUsers();
    if (listError) throw listError;

    const user = users.find(u => u.email === email);
    if (user && user.email_confirmed_at) {
        return { success: true, message: "Email already confirmed. Please log in." };
    }

    const supabase = await createClient();

    // 2. Try standard resend first (Sign Up confirmation)
    const { error: resendError } = await supabase.auth.resend({
        type: 'signup',
        email,
        options: {
            emailRedirectTo: `${process.env.NEXT_PUBLIC_ADMIN_URL}/auth/confirm?next=/setup`
            // emailRedirectTo: `https://admin.neetstand.com/auth/confirm?next=/login`
        }
    });

    if (resendError) {
        // Fallback to manual send if rate limited
        if (resendError.message?.toLowerCase().includes("rate limit") || resendError.status === 429) {
            const fallbackSuccess = await handleEmailFallback(email, 'signup');
            if (fallbackSuccess) {
                return { success: true, manual: true };
            }
        }

        // Final attempt with magic link if confirmed signup resend fails for other reasons
        const { error: otpError } = await supabase.auth.signInWithOtp({
            email,
            options: { emailRedirectTo: `${process.env.NEXT_PUBLIC_ADMIN_URL}/auth/confirm?next=/setup` }
            // options: { emailRedirectTo: `https://admin.neetstand.com/auth/confirm?next=/login` }
        });
        if (otpError) throw otpError;
    }

    return { success: true };
}

// Helper to check if Super Admin exists (Consolidated logic)
async function isSuperAdminSet() {
    // 1. Check Profiles table (Standard Superadmin)
    const superAdmins = await db.select().from(profiles).where(eq(profiles.role, "superadmin")).limit(1);
    if (superAdmins.length > 0) return true;

    // 2. Check Auth.Users for is_super_admin (Owner-as-Superadmin)
    const adminClient = createAdminClient();
    try {
        // We use a safe check: list any user with is_super_admin flag
        // Note: listUsers() doesn't filter by columns directly in SDK, so we check the result
        const { data: { users }, error } = await adminClient.auth.admin.listUsers();
        if (error) throw error;

        return users.some(u => (u as any).is_super_admin === true);
    } catch (e) {
        console.error("isSuperAdminSet Auth check failed:", e);
        return false;
    }
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
    const adminAuthClient = createAdminClient();
    const { error: updateError } = await adminAuthClient.auth.admin.updateUserById(userId, {
        password: code
    });

    if (updateError) throw updateError;

    // Save OTP generation time
    await db.update(profiles)
        .set({ otpGeneratedAt: new Date() })
        .where(eq(profiles.id, userId));

    // Send Email
    // Re-use client or create new if needed, but we already have one
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
    const adminAuthClient = createAdminClient();
    const { data } = await adminAuthClient.rpc("check_system_status");

    if (data && !data.superadmin_exists) {
        redirect("/setup");
    }

    redirect("/login");
}

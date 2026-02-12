"use client";

import { useEffect } from "react";
import { signOutAction } from "@/actions/auth";

export default function SessionGuard() {
    useEffect(() => {
        // Strict Tab Session Check
        // If the specific tab does not have the "admin_session" flag,
        // we assume it is a new tab/session and force a logout to be safe.
        const session = sessionStorage.getItem("admin_session");

        if (!session) {
            console.warn("No tab session found. Forcing logout for security.");
            // Call server action to clear cookies and redirect
            signOutAction();
        }
    }, []);

    return null; // Renders nothing
}

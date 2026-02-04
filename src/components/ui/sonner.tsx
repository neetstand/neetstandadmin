"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

export function Toaster({ ...props }: ToasterProps) {
    // If no next-themes provider exists, this might default to system or light. 
    // Simplified for now, assuming light/dark are handled via class or system.
    const { theme = "system" } = { theme: "system" } // Mock if next-themes not installed yet, or use it if available.

    // Since we didn't explicitly install next-themes in the plan, I'll make it resilient.
    // Actually, shadcn sonner usually relies on next-themes. 
    // Let's implement a version that works without next-themes first to match the simple plan, 
    // or just pass generic props.

    return (
        <Sonner
            theme={theme as ToasterProps["theme"]}
            className="toaster group"
            toastOptions={{
                classNames: {
                    toast:
                        "group toast group-[.toaster]:bg-white group-[.toaster]:text-slate-950 group-[.toaster]:border-slate-200 group-[.toaster]:shadow-lg dark:group-[.toaster]:bg-slate-950 dark:group-[.toaster]:text-slate-50 dark:group-[.toaster]:border-slate-800",
                    description: "group-[.toast]:text-slate-500 dark:group-[.toast]:text-slate-400",
                    actionButton:
                        "group-[.toast]:bg-slate-900 group-[.toast]:text-slate-50 dark:group-[.toast]:bg-slate-50 dark:group-[.toast]:text-slate-900",
                    cancelButton:
                        "group-[.toast]:bg-slate-100 group-[.toast]:text-slate-500 dark:group-[.toast]:bg-slate-800 dark:group-[.toast]:text-slate-400",
                },
            }}
            {...props}
        />
    )
}

"use client";

import { useState } from "react";
import { toast } from "sonner";
import { saveMaintenanceMode } from "@/actions/settings";
import { Switch } from "@/components/ui/switch";

interface GlobalSettingsFormProps {
    initialMaintenanceMode: boolean;
}

export default function GlobalSettingsForm({ initialMaintenanceMode }: GlobalSettingsFormProps) {
    // pendingMode tracks the switch state (what user wants to set)
    const [pendingMode, setPendingMode] = useState(initialMaintenanceMode);
    // savedMode tracks the actual server state (what is currently active)
    const [savedMode, setSavedMode] = useState(initialMaintenanceMode);

    const [loading, setLoading] = useState(false);

    // Has changes if pending is different from saved
    const hasChanges = pendingMode !== savedMode;

    // Invert logic: Switch ON = Maintenance OFF (Site Up).
    // If pendingMode is TRUE (Maintenance), Switch is FALSE (Off).
    // If pendingMode is FALSE (Live), Switch is TRUE (On).
    const isSiteUp = !pendingMode;

    const handleToggle = (checked: boolean) => {
        // If checked (Site Up), Maintenance should be OFF (false).
        // If unchecked (Site Down), Maintenance should be ON (true).
        setPendingMode(!checked);
    };

    const handleSave = async () => {
        setLoading(true);
        const res = await saveMaintenanceMode(pendingMode);

        if (!res.success) {
            toast.error(res.error || "Failed to update maintenance mode");
        } else {
            toast.success(`Maintenance mode ${pendingMode ? "Enabled" : "Disabled"}`);
            setSavedMode(pendingMode); // Update saved state on success
        }
        setLoading(false);
    };

    return (
        <div className="bg-white shadow rounded-lg p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-lg font-medium leading-6 text-slate-900 flex items-center gap-3">
                        Site Maintenance

                        {/* Status Indicator based on SAVED mode */}
                        {savedMode ? (
                            <div className="flex items-center gap-2">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                                    Maintenance Mode: Active
                                </span>
                                <span className="text-sm text-red-600 font-medium">
                                    (Website Status: Down)
                                </span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                                    Maintenance Mode: Inactive
                                </span>
                                <span className="text-sm text-emerald-600 font-medium">
                                    (Website Status: Live)
                                </span>
                            </div>
                        )}
                    </h3>
                    <div className="mt-2 text-sm text-slate-500">
                        Toggle the switch to control site availability.
                        <div className="mt-1 flex items-center gap-1">
                            <span className="font-bold text-emerald-600">On: </span>
                            <span className="text-emerald-600">Site is Live & Active.</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="font-bold text-red-600">Off: </span>
                            <span className="text-red-600">Site is Down (Maintenance Mode).</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Site Status
                    </span>
                    <div className="flex items-center gap-2">
                        <span className={`text-sm font-medium ${!isSiteUp ? "text-red-600 font-bold" : "text-slate-400"}`}>Off</span>
                        <Switch
                            checked={isSiteUp}
                            onCheckedChange={handleToggle}
                            disabled={loading}
                        />
                        <span className={`text-sm font-medium ${isSiteUp ? "text-emerald-600 font-bold" : "text-slate-400"}`}>On</span>
                    </div>
                </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                    onClick={handleSave}
                    disabled={!hasChanges || loading}
                    className={`px-4 py-2 rounded-md text-sm font-medium text-white transition-colors flex items-center gap-2 ${!hasChanges || loading
                        ? "bg-slate-300 cursor-not-allowed"
                        : "bg-slate-900 hover:bg-slate-800 cursor-pointer"
                        }`}
                >
                    {loading ? "Saving..." : "Save Changes"}
                </button>
            </div>
        </div>
    );
}

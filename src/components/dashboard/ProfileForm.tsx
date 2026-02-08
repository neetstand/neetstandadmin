
"use client";

import { useState } from "react";
import { updateProfile } from "@/actions/profile";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ProfileFormProps {
    initialData: any; // infer type if possible, or use explicit
    userEmail: string;
}

export default function ProfileForm({ initialData, userEmail }: ProfileFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        try {
            const res = await updateProfile(formData);
            if (res.success) {
                toast.success("Profile updated successfully");
                router.refresh();
            } else {
                toast.error(res.error || "Failed to update profile");
            }
        } catch (e) {
            toast.error("An error occurred");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form action={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                    <input
                        name="fullName"
                        type="text"
                        defaultValue={initialData.fullName || ""}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-slate-500 focus:border-slate-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                    <input
                        type="email"
                        value={userEmail}
                        disabled
                        className="w-full px-3 py-2 border border-slate-200 rounded-md bg-slate-50 text-slate-500 cursor-not-allowed"
                    />
                    <p className="mt-1 text-xs text-slate-500">Email cannot be changed.</p>
                </div>
            </div>

            <div className="pt-6 border-t border-slate-100">
                <h3 className="text-base font-medium text-slate-900 mb-4">Notification Preferences</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input
                                id="newsletter"
                                name="newsletter"
                                type="checkbox"
                                defaultChecked={initialData.newsletter}
                                className="focus:ring-slate-500 h-4 w-4 text-slate-600 border-gray-300 rounded"
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="newsletter" className="font-medium text-slate-700">Newsletter</label>
                            <p className="text-slate-500">Receive weekly updates.</p>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input
                                id="courseLaunch"
                                name="courseLaunch"
                                type="checkbox"
                                defaultChecked={initialData.courseLaunch}
                                className="focus:ring-slate-500 h-4 w-4 text-slate-600 border-gray-300 rounded"
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="courseLaunch" className="font-medium text-slate-700">Course Launches</label>
                            <p className="text-slate-500">Get notified about new courses.</p>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input
                                id="cityEvents"
                                name="cityEvents"
                                type="checkbox"
                                defaultChecked={initialData.cityEvents}
                                className="focus:ring-slate-500 h-4 w-4 text-slate-600 border-gray-300 rounded"
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="cityEvents" className="font-medium text-slate-700">City Events</label>
                            <p className="text-slate-500">Updates on local events.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-6 border-t border-slate-100">
                <h3 className="text-base font-medium text-slate-900 mb-4">Communication Channels</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <label className="flex items-center space-x-3">
                        <input
                            name="emailPref"
                            type="checkbox"
                            defaultChecked={initialData.email}
                            className="focus:ring-slate-500 h-4 w-4 text-slate-600 border-gray-300 rounded"
                        />
                        <span className="text-sm font-medium text-slate-700">Email</span>
                    </label>
                    <label className="flex items-center space-x-3">
                        <input
                            name="sms"
                            type="checkbox"
                            defaultChecked={initialData.sms}
                            className="focus:ring-slate-500 h-4 w-4 text-slate-600 border-gray-300 rounded"
                        />
                        <span className="text-sm font-medium text-slate-700">SMS</span>
                    </label>
                    <label className="flex items-center space-x-3">
                        <input
                            name="phone"
                            type="checkbox"
                            defaultChecked={initialData.phone}
                            className="focus:ring-slate-500 h-4 w-4 text-slate-600 border-gray-300 rounded"
                        />
                        <span className="text-sm font-medium text-slate-700">Phone</span>
                    </label>
                </div>
            </div>

            <div className="pt-6 flex justify-end">
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-slate-900 text-white px-6 py-2.5 rounded-md hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 disabled:opacity-50 transition-colors font-medium shadow-sm"
                >
                    {loading ? "Saving..." : "Save Changes"}
                </button>
            </div>
        </form>
    );
}

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SetupService } from "@/services/setup";

export default async function Home() {
    const status = await SetupService.getOwnerStatus();

    // If owner fails to exist OR is inactive, go to setup to complete it
    if (!status.exists || !status.active) {
        redirect("/setup");
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
        redirect("/dashboard");
    } else {
        redirect("/login");
    }
}

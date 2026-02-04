import { redirect } from "next/navigation";
import { SetupService } from "@/services/setup";
import LoginForm from "./LoginForm";

export default async function LoginPage() {
    const status = await SetupService.getOwnerStatus();

    // If owner does not exist, force setup
    if (!status.exists) {
        redirect("/setup");
    }

    // Determine mode based on active status
    const mode = "login";

    return <LoginForm mode={mode} />;
}

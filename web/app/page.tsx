import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import LogoutButton from "./logout-button";

export default async function Home() {
	const user = await getCurrentUser();

	if (!user) {
		redirect("/auth/login");
	}

	return (
		<main className="AppMain">
			<div className="flex flex-col items-center gap-6 p-8">
				<h1 className="text-2xl font-bold">
					Welcome, {user.first_name || user.username}!
				</h1>
				<p className="text-muted-foreground">
					You are logged in as {user.email}
				</p>
				<LogoutButton />
			</div>
		</main>
	);
}

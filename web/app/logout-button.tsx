"use client";

import { Button } from "@/components/ui";
import { LogOut } from "lucide-react";
import logoutAction from "@/app/auth/logout/action";

export default function LogoutButton() {
	return (
		<form action={logoutAction}>
			<Button type="submit" variant="outline">
				<LogOut />
				Logout
			</Button>
		</form>
	);
}

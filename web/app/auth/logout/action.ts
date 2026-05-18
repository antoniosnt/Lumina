"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { axiosInstance } from "@/lib/utils";

export default async function logoutAction() {
	const cookieStore = await cookies();
	const accessToken = cookieStore.get("access_token")?.value;
	const refreshToken = cookieStore.get("refresh_token")?.value;

	if (refreshToken && accessToken) {
		try {
			await axiosInstance("/api/auth/logout/", accessToken).post({
				refresh: refreshToken,
			});
		} catch {
			// Silently fail - we still want to clear cookies
		}
	}

	cookieStore.delete("access_token");
	cookieStore.delete("refresh_token");

	redirect("/auth/login");
}

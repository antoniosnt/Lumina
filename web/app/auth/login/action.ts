"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { axiosInstance } from "@/lib/utils";

import { AxiosError } from "axios";

export default async function loginAction(
	_prevState: { error: string } | null,
	formData: FormData,
): Promise<{ error: string } | null> {
	const identifier = (formData.get("identifier") || formData.get("email") || "") as string;
	const password = (formData.get("password") || "") as string;

	const payload = {
		username: identifier.trim(),
		password,
	};

	try {
		const response = await axiosInstance("/api/auth/login/").post(payload);
		const { access, refresh } = response.data as {
			access: string;
			refresh: string;
		};

		const cookieStore = await cookies();
		const secure = process.env.NODE_ENV === "production";
		cookieStore.set("access_token", access, {
			httpOnly: true,
			secure,
			sameSite: "lax",
			path: "/",
		});
		cookieStore.set("refresh_token", refresh, {
			httpOnly: true,
			secure,
			sameSite: "lax",
			path: "/",
		});
	} catch (e) {
		if (e instanceof AxiosError && e.response?.data?.detail) {
			return { error: String(e.response.data.detail) };
		}
		return { error: "Invalid credentials. Please try again." };
	}

	redirect("/");
}

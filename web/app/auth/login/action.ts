"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { axiosInstance } from "@/lib/utils";

export default async function loginAction(
	_prevState: { error: string } | null,
	formData: FormData,
): Promise<{ error: string } | null> {
	const payload = {
		username: formData.get("email") as string,
		password: formData.get("password") as string,
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
	} catch {
		return { error: "Invalid credentials. Please try again." };
	}

	redirect("/");
}

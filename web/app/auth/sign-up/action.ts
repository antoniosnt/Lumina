"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { axiosInstance } from "@/lib/utils";
import { AxiosError } from "axios";

export default async function signUpAction(
	_prevState: { error: string } | null,
	formData: FormData,
): Promise<{ error: string } | null> {
	const payload = {
		username: formData.get("username") as string,
		email: formData.get("email") as string,
		first_name: formData.get("first_name") as string,
		last_name: formData.get("last_name") as string,
		password: formData.get("password") as string,
		password_confirm: formData.get("password_confirm") as string,
	};

	try {
		// Register the user
		await axiosInstance("/api/auth/register/").post(payload);

		// Auto-login after registration
		const loginResponse = await axiosInstance("/api/auth/login/").post({
			username: payload.username,
			password: payload.password,
		});

		const { access, refresh } = loginResponse.data as {
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
		if (e instanceof AxiosError && e.response?.data) {
			const data = e.response.data;
			const messages = Object.values(data).flat();
			return { error: messages.join(" ") };
		}
		return { error: "Registration failed. Please try again." };
	}

	redirect("/");
}

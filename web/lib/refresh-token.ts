import { cookies } from "next/headers";
import { axiosInstance } from "./utils";

export async function refreshAccessToken(): Promise<string | null> {
	const cookieStore = await cookies();
	const refreshToken = cookieStore.get("refresh_token")?.value;

	if (!refreshToken) return null;

	try {
		const response = await axiosInstance("/api/auth/token/refresh/").post({
			refresh: refreshToken,
		});

		const { access, refresh } = response.data as {
			access: string;
			refresh?: string;
		};

		const secure = process.env.NODE_ENV === "production";
		cookieStore.set("access_token", access, {
			httpOnly: true,
			secure,
			sameSite: "lax",
			path: "/",
		});

		// SimpleJWT with rotation returns a new refresh token
		if (refresh) {
			cookieStore.set("refresh_token", refresh, {
				httpOnly: true,
				secure,
				sameSite: "lax",
				path: "/",
			});
		}

		return access;
	} catch {
		// Refresh token is invalid or expired - clear cookies
		cookieStore.delete("access_token");
		cookieStore.delete("refresh_token");
		return null;
	}
}

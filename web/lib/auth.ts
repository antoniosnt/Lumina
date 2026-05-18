import { cookies } from "next/headers";
import { axiosInstance } from "./utils";
import { refreshAccessToken } from "./refresh-token";

export type User = {
	id: number;
	username: string;
	email: string;
	first_name: string;
	last_name: string;
};

export async function getCurrentUser(): Promise<User | null> {
	const cookieStore = await cookies();
	let token: string | null = cookieStore.get("access_token")?.value ?? null;

	if (!token) {
		token = await refreshAccessToken();
		if (!token) return null;
	}

	try {
		const response = await axiosInstance("/api/auth/me/", token).get();
		return response.data as User;
	} catch {
		// Token might be expired, try refreshing
		const newToken = await refreshAccessToken();
		if (!newToken) return null;

		try {
			const response = await axiosInstance("/api/auth/me/", newToken).get();
			return response.data as User;
		} catch {
			return null;
		}
	}
}

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Axios.
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatPayloadEntries(formData: FormData) {
	const entries = Array.from(formData.entries());
	const filtered = entries.filter(([key]) => !key.startsWith("$ACTION_"));
	return Object.fromEntries(filtered);
}

// Axios instance with base url and custom headers.
const api = axios.create({
	baseURL: process.env.NEXT_SERVER_API,
	headers: {
		"Content-Type": "application/json",
	},
});

// Factory to create axios instance with url.
export function axiosInstance(url: string, token?: string) {
	return {
		get: <T>(params?: Record<string, string>) =>
			api.get<T>(url, {
				params,
				headers: token ? { Authorization: `Bearer ${token}` } : undefined,
			}),

		post: <T>(data?: unknown) =>
			api.post<T>(url, data, {
				headers: token ? { Authorization: `Bearer ${token}` } : undefined,
			}),

		put: <T>(data?: unknown) =>
			api.put<T>(url, data, {
				headers: token ? { Authorization: `Bearer ${token}` } : undefined,
			}),

		delete: <T>() =>
			api.delete<T>(url, {
				headers: token ? { Authorization: `Bearer ${token}` } : undefined,
			}),
	};
}

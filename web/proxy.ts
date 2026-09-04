import { NextRequest, NextResponse } from "next/server";

const publicPaths = ["/auth/login", "/auth/sign-up"];

function isTokenExpired(token?: string): boolean {
	if (!token) return true;
	try {
		const base64Url = token.split(".")[1];
		if (!base64Url) return true;
		const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
		const jsonPayload = atob(base64);
		const { exp } = JSON.parse(jsonPayload);
		if (!exp) return true;
		return Date.now() >= exp * 1000 - 15000;
	} catch {
		return true;
	}
}

async function tryRefreshToken(
	refreshToken: string,
): Promise<{ access: string; refresh?: string } | null> {
	const apiBase = process.env.NEXT_SERVER_API || "http://127.0.0.1:8000";
	try {
		const res = await fetch(`${apiBase}/api/auth/token/refresh/`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ refresh: refreshToken }),
		});
		if (!res.ok) return null;
		return await res.json();
	} catch {
		return null;
	}
}

export default async function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;
	let accessToken = request.cookies.get("access_token")?.value;
	let refreshToken = request.cookies.get("refresh_token")?.value;
	const isPublic = publicPaths.some((path) => pathname.startsWith(path));
	const secure = process.env.NODE_ENV === "production";

	let refreshedTokens: { access: string; refresh?: string } | null = null;

	if ((!accessToken || isTokenExpired(accessToken)) && refreshToken) {
		refreshedTokens = await tryRefreshToken(refreshToken);
		if (refreshedTokens) {
			accessToken = refreshedTokens.access;
			if (refreshedTokens.refresh) {
				refreshToken = refreshedTokens.refresh;
			}
		} else {
			accessToken = undefined;
			refreshToken = undefined;
		}
	}

	const hasValidAuth = !!accessToken && !isTokenExpired(accessToken);

	if (isPublic) {
		if (hasValidAuth) {
			const redirectResponse = NextResponse.redirect(new URL("/", request.url));
			if (refreshedTokens) {
				redirectResponse.cookies.set("access_token", refreshedTokens.access, {
					httpOnly: true,
					secure,
					sameSite: "lax",
					path: "/",
				});
				if (refreshedTokens.refresh) {
					redirectResponse.cookies.set("refresh_token", refreshedTokens.refresh, {
						httpOnly: true,
						secure,
						sameSite: "lax",
						path: "/",
					});
				}
			}
			return redirectResponse;
		}

		const response = NextResponse.next();
		if (!hasValidAuth && request.cookies.has("refresh_token")) {
			response.cookies.delete("access_token");
			response.cookies.delete("refresh_token");
		}
		return response;
	}

	if (!hasValidAuth) {
		const redirectResponse = NextResponse.redirect(new URL("/auth/login", request.url));
		redirectResponse.cookies.delete("access_token");
		redirectResponse.cookies.delete("refresh_token");
		return redirectResponse;
	}

	if (refreshedTokens) {
		request.cookies.set("access_token", refreshedTokens.access);
		if (refreshedTokens.refresh) {
			request.cookies.set("refresh_token", refreshedTokens.refresh);
		}
		const requestHeaders = new Headers(request.headers);
		requestHeaders.set("cookie", request.cookies.toString());

		const response = NextResponse.next({
			request: {
				headers: requestHeaders,
			},
		});

		response.cookies.set("access_token", refreshedTokens.access, {
			httpOnly: true,
			secure,
			sameSite: "lax",
			path: "/",
		});
		if (refreshedTokens.refresh) {
			response.cookies.set("refresh_token", refreshedTokens.refresh, {
				httpOnly: true,
				secure,
				sameSite: "lax",
				path: "/",
			});
		}
		return response;
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};

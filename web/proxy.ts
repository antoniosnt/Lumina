import { NextRequest, NextResponse } from "next/server";

const publicPaths = ["/auth/login", "/auth/sign-up"];

export default function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const accessToken = request.cookies.get("access_token")?.value;
	const refreshToken = request.cookies.get("refresh_token")?.value;
	const hasAuth = accessToken || refreshToken;

	// Allow public routes
	if (publicPaths.some((path) => pathname.startsWith(path))) {
		// If already logged in, redirect away from auth pages
		if (hasAuth) {
			return NextResponse.redirect(new URL("/", request.url));
		}
		return NextResponse.next();
	}

	// Protect all other routes
	if (!hasAuth) {
		return NextResponse.redirect(new URL("/auth/login", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};

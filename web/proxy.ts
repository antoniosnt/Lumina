import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
	console.log(
		`\n\x1b[34m[INFO] PROXY\x1b[0m`,
		{ requestUrl: request.url, method: request.method },
		`\n`,
	);
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
	matcher: "/api/:path*",
};

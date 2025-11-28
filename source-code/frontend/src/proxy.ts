import { type NextRequest } from "next/server";

import { authProxy } from "$features/auth";

export async function proxy(request: NextRequest) {
	return authProxy(request);
}

export const config = {
	matcher: [
		"/((?!_next/static|_next/image|favicon.ico|manifest.json|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|pdf)$).*)",
	],
};

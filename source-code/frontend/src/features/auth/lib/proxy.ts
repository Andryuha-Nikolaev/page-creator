import { NextResponse, type NextRequest } from "next/server";

import { getRedirectPath } from "./redirect";

export const authProxy = (request: NextRequest) => {
	if (request.nextUrl.pathname.startsWith("/profile")) {
		if (!request.cookies.has("Auth-Token")) {
			return NextResponse.redirect(
				new URL(getRedirectPath(request.nextUrl.pathname), request.url)
			);
		}

		const headers = new Headers(request.headers);
		headers.set("x-pathname", request.nextUrl.pathname);

		return NextResponse.next({
			request: {
				headers,
			},
		});
	}
};

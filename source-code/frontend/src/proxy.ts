import { NextResponse, type NextRequest } from "next/server";

import { parse } from "set-cookie-parser";

import { getNewTokens } from "$shared/api/code-gen";
import {
	ACCOUNT_ROUTE,
	AUTH_CONSTANTS,
	HEADERS_CONSTANTS,
	ROUTES_CONSTANTS,
} from "$shared/config";

export async function proxy(request: NextRequest) {
	const accessToken = request.cookies.has(AUTH_CONSTANTS.ACCESS_TOKEN_NAME);
	const refreshToken = request.cookies.has(AUTH_CONSTANTS.REFRESH_TOKEN_NAME);

	if (!accessToken && !refreshToken) {
		if (request.nextUrl.pathname.startsWith(ACCOUNT_ROUTE)) {
			const response = NextResponse.redirect(
				new URL(`${request.nextUrl.origin}${ROUTES_CONSTANTS.LOGIN} `)
			);

			return response;
		}
	}

	if (!accessToken && refreshToken) {
		const requestCookies = request.headers.get("cookie") ?? "";

		try {
			const { response: newTokensResponse } = await getNewTokens({
				headers: {
					cookie: requestCookies,
				},
			});

			const response = NextResponse.next();

			if (newTokensResponse.ok) {
				const parsed = parse(newTokensResponse.headers.getSetCookie());

				for (const cookie of parsed) {
					response.cookies.set(cookie as never);
				}

				return response;
			}

			response.cookies.delete(AUTH_CONSTANTS.ACCESS_TOKEN_NAME);
			response.cookies.delete(AUTH_CONSTANTS.REFRESH_TOKEN_NAME);
			return response;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	const headers = new Headers(request.headers);
	headers.set(HEADERS_CONSTANTS.PATHNAME, request.nextUrl.pathname);

	return NextResponse.next({
		request: {
			headers,
		},
	});
}

export const config = {
	matcher: [
		"/((?!_next/static|_next/image|favicon.ico|manifest.json|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|pdf)$).*)",
	],
};

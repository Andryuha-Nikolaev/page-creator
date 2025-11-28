import { NextResponse, type NextRequest } from "next/server";

import { parse } from "set-cookie-parser";

import { getNewTokens } from "$shared/api/code-gen";
import { ACCOUNT_ROUTE, AUTH_CONSTANTS, HEADERS } from "$shared/config";

import { getRedirectPath } from "./redirect";

export const authProxy = async (request: NextRequest) => {
	const accessToken = request.cookies.has(AUTH_CONSTANTS.ACCESS_TOKEN_NAME);
	const refreshToken = request.cookies.has(AUTH_CONSTANTS.REFRESH_TOKEN_NAME);

	if (request.nextUrl.pathname.startsWith(ACCOUNT_ROUTE)) {
		if (!accessToken && !refreshToken) {
			return NextResponse.redirect(
				new URL(getRedirectPath(request.nextUrl.pathname), request.url)
			);
		}
	}

	const headers = new Headers(request.headers);
	headers.set(HEADERS.PATHNAME, request.nextUrl.pathname);

	const response = NextResponse.next({
		request: {
			headers,
		},
	});

	if (!accessToken && refreshToken) {
		const requestCookies = request.headers.get("cookie") ?? "";

		const { response: newTokensResponse } = await getNewTokens({
			headers: {
				cookie: requestCookies,
			},
		});

		if (newTokensResponse.ok) {
			const parsed = parse(newTokensResponse.headers.getSetCookie());

			for (const cookie of parsed) {
				response.cookies.set(cookie as never);
			}
		}
	}

	return response;
};

import { NextResponse, type NextRequest } from "next/server";

import { parse } from "set-cookie-parser";

import { getNewTokens } from "$shared/api/code-gen";
import {
	ACCOUNT_ROUTE,
	AUTH_CONSTANTS,
	HEADERS,
	ROUTES_CONSTANTS,
} from "$shared/config";

export const authProxy = async (request: NextRequest) => {
	const accessToken = request.cookies.has(AUTH_CONSTANTS.ACCESS_TOKEN_NAME);
	const refreshToken = request.cookies.has(AUTH_CONSTANTS.REFRESH_TOKEN_NAME);

	const requestPathname = request.nextUrl.pathname;

	const isLoginRoute = requestPathname === ROUTES_CONSTANTS.LOGIN;
	const isAccountRoute = requestPathname.startsWith(ACCOUNT_ROUTE);

	const headers = new Headers(request.headers);
	headers.set(HEADERS.PATHNAME, requestPathname);

	const response = NextResponse.next({
		request: {
			headers,
		},
	});

	if (isAccountRoute) {
		if (!accessToken && !refreshToken) {
			return NextResponse.redirect(
				new URL(ROUTES_CONSTANTS.LOGIN, request.url)
			);
		}
	}

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
		} else {
			response.cookies.delete(AUTH_CONSTANTS.REFRESH_TOKEN_NAME);
		}
	}

	if (isLoginRoute) {
		// TODO: only access
		if (accessToken || refreshToken) {
			return NextResponse.redirect(
				new URL(ROUTES_CONSTANTS.SETTINGS, request.url)
			);
		}
	}

	return response;
};

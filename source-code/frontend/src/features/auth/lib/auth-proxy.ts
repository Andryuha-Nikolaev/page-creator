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

	const headers = new Headers(request.headers);
	headers.set(HEADERS.PATHNAME, requestPathname);

	const response = NextResponse.next({
		request: {
			headers,
		},
	});

	const redirectResponse = NextResponse.redirect(
		new URL(`${request.nextUrl.origin}${ROUTES_CONSTANTS.LOGOUT}`)
	);

	if (requestPathname.startsWith(ACCOUNT_ROUTE)) {
		if (!accessToken && !refreshToken) {
			return redirectResponse;
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

			if (requestPathname.startsWith(ROUTES_CONSTANTS.LOGIN)) {
				const redirectResponse = NextResponse.redirect(
					new URL(`${request.nextUrl.origin}${ROUTES_CONSTANTS.SETTINGS}`)
				);

				for (const cookie of parsed) {
					redirectResponse.cookies.set(cookie as never);
				}

				return redirectResponse;
			}

			for (const cookie of parsed) {
				response.cookies.set(cookie as never);
			}
		}
	}

	if (requestPathname.startsWith(ROUTES_CONSTANTS.LOGIN)) {
		if (accessToken && refreshToken) {
			return NextResponse.redirect(
				new URL(`${request.nextUrl.origin}${ROUTES_CONSTANTS.SETTINGS}`)
			);
		}
	}

	return response;
};

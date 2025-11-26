import { NextResponse, type NextRequest } from "next/server";

import { parse } from "set-cookie-parser";

import { getNewTokens } from "$shared/api/code-gen";
import { ACCOUNT_ROUTE } from "$shared/config";
import { AUTH_CONSTANTS } from "$app/develop/auth/config/constants";

export async function proxy(request: NextRequest) {
	const accessToken = request.cookies.get(AUTH_CONSTANTS.ACCESS_TOKEN_NAME);
	const refreshToken = request.cookies.get(AUTH_CONSTANTS.REFRESH_TOKEN_NAME);

	if (!accessToken && !refreshToken) {
		if (request.nextUrl.pathname.startsWith(ACCOUNT_ROUTE)) {
			const response = NextResponse.redirect(new URL(request.nextUrl.origin));

			return response;
		}
	}

	if (!accessToken && refreshToken) {
		try {
			const { response: newTokensResponse } = await getNewTokens({
				headers: {
					cookie: `${refreshToken.name}=${refreshToken.value};`,
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

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/((?!_next/static|_next/image|favicon.ico|manifest.json|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|pdf)$).*)",
	],
};

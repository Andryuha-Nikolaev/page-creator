import { NextRequest, NextResponse } from "next/server";

import { parse } from "set-cookie-parser";

import { getNewTokens } from "$shared/api/code-gen";
import { AUTH_CONSTANTS } from "$app/develop/auth/config/constants";

export async function proxy(request: NextRequest) {
	const accessToken = request.cookies.get(AUTH_CONSTANTS.ACCESS_TOKEN_NAME);
	const refreshToken = request.cookies.get(AUTH_CONSTANTS.REFRESH_TOKEN_NAME);

	if (!accessToken && refreshToken) {
		const headers = new Headers(request.headers);
		const existingCookies = request.headers.get("cookie");

		try {
			const { response: newTokensResponse } = await getNewTokens({
				headers: {
					cookie: existingCookies,
				},
			});

			if (newTokensResponse.ok) {
				const refreshCookies =
					newTokensResponse.headers.get("set-cookie") ?? "";

				const parsed = parse(newTokensResponse.headers.getSetCookie());

				headers.set("cookie", refreshCookies ?? "");
				const modifiedRequest = new NextRequest(request, {
					headers: headers,
				});

				const response = NextResponse.next({
					request: modifiedRequest,
				});

				for (const cookie of parsed) {
					response.cookies.set(cookie as never);
				}

				return response;
			}
		} catch (error) {
			console.error(error);
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/((?!_next/static|_next/image|favicon.ico|manifest.json|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|pdf)$).*)",
	],
};

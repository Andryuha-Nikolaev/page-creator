import { NextRequest, NextResponse } from "next/server";

import { getNewTokens } from "$shared/api/code-gen";
import { AUTH_CONSTANTS } from "$app/develop/auth/config/constants";

export async function proxy(request: NextRequest) {
	const accessToken = request.cookies.get(AUTH_CONSTANTS.ACCESS_TOKEN_NAME);
	const refreshToken = request.cookies.get(AUTH_CONSTANTS.REFRESH_TOKEN_NAME);

	if (!accessToken && refreshToken) {
		const headers = new Headers(request.headers);
		const existingCookies = request.headers.get("cookie");

		try {
			const newTokensResponse = await getNewTokens({
				headers: {
					cookie: existingCookies,
				},
			});

			console.log(newTokensResponse.response.status);
		} catch (error) {
			console.log(error);
		}

		headers.set(
			"cookie",
			`${existingCookies ? `${existingCookies};` : ""} vercel=fast; custom-cookie=value`
		);
		const modifiedRequest = new NextRequest(request, {
			headers: headers,
		});

		const response = NextResponse.next({
			request: modifiedRequest,
		});

		return response;
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/((?!_next/static|_next/image|favicon.ico|manifest.json|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|pdf)$).*)",
	],
};

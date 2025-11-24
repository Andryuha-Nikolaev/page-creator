import { NextRequest, NextResponse } from "next/server";

import { AUTH_CONSTANTS } from "$app/develop/auth/config/constants";

export function proxy(request: NextRequest) {
	const accessToken = request.cookies.get(AUTH_CONSTANTS.ACCESS_TOKEN_NAME);
	const refreshToken = request.cookies.get(AUTH_CONSTANTS.REFRESH_TOKEN_NAME);

	if (!accessToken && refreshToken) {
		const headers = new Headers(request.headers);
		const existingCookies = request.headers.get("cookie");
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

	// Добавляем или обновляем cookie в заголовках

	// Создаем новый запрос с обновленными заголовками

	// console.log(modifiedRequest);

	// response.cookies.set("vercel", "fast");
	// response.cookies.set({
	// 	name: "vercel",
	// 	value: "fast",
	// 	path: "/",
	// });

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/((?!_next/static|_next/image|favicon.ico|manifest.json|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|pdf)$).*)",
	],
};

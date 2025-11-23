"use server";

import { cookies } from "next/headers";

import { parse } from "set-cookie-parser";

export async function pickCookiesFromResponse(response: Response) {
	const setCookie = response.headers.getSetCookie();

	if (!setCookie) {
		return;
	}

	const responseCookies = await cookies();
	const parsed = parse(setCookie);

	for (const cookie of parsed) {
		responseCookies.set(cookie as never);
	}
}

export async function headersFromCookies(): Promise<HeadersInit> {
	const cookiesStore = await cookies();

	return {
		cookie: cookiesStore.toString(),
	};
}

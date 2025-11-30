import "server-only";

import { cookies } from "next/headers";

import { parse } from "set-cookie-parser";

export async function pickCookiesFromResponse(response: Response) {
	const setCookie = response.headers.getSetCookie();

	if (!setCookie || !setCookie.length) {
		return;
	}

	const responseCookies = await cookies();
	const parsed = parse(setCookie);

	for (const cookie of parsed) {
		responseCookies.set(cookie as never);
	}
}

export async function getHeadersFromCookies(): Promise<HeadersInit> {
	const cookiesStore = await cookies();

	return {
		Cookie: cookiesStore.toString(),
	};
}

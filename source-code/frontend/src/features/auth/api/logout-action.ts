"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

import { logout } from "$shared/api/code-gen";
import {
	ACCOUNT_ROUTE,
	AUTH_CONSTANTS,
	HEADERS,
	ROUTES_CONSTANTS,
} from "$shared/config";
import { pickCookiesFromResponse } from "$shared/lib";
import { getHeadersFromCookies } from "$shared/lib/cookies";

export async function logoutAction() {
	const { response } = await logout({
		headers: await getHeadersFromCookies(),
	});

	if (response.ok) {
		await pickCookiesFromResponse(response);
	} else {
		const cookieStore = await cookies();
		cookieStore.delete(AUTH_CONSTANTS.ACCESS_TOKEN_NAME);
		cookieStore.delete(AUTH_CONSTANTS.REFRESH_TOKEN_NAME);
	}

	const headersList = await headers();
	const pathname = headersList.get(HEADERS.PATHNAME);

	if (pathname?.includes(ACCOUNT_ROUTE)) {
		redirect(ROUTES_CONSTANTS.HOME);
	}
}

"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

import { logout } from "$shared/api/code-gen";
import {
	ACCOUNT_ROUTE,
	AUTH_CONSTANTS,
	ROUTES_CONSTANTS,
} from "$shared/config";
import { pickCookiesFromResponse } from "$shared/lib";
import { headersFromCookies } from "$shared/lib/cookies";

export async function logoutAction() {
	try {
		const { response } = await logout({
			headers: await headersFromCookies(),
		});

		if (response.ok) {
			await pickCookiesFromResponse(response);
			return;
		}

		throw new Error(`Logout error: ${response.status}`);
	} catch (error) {
		console.error(error);

		const cookieStore = await cookies();
		cookieStore.delete(AUTH_CONSTANTS.ACCESS_TOKEN_NAME);
		cookieStore.delete(AUTH_CONSTANTS.REFRESH_TOKEN_NAME);
	}

	const headersList = await headers();
	const pathname = headersList.get("x-pathname");

	if (pathname?.includes(ACCOUNT_ROUTE)) {
		redirect(ROUTES_CONSTANTS.HOME);
	}
}

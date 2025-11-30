"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

import { createApi } from "$shared/api";
import { logout as onLogout } from "$shared/api/code-gen";
import {
	ACCOUNT_ROUTE,
	AUTH_CONSTANTS,
	HEADERS,
	ROUTES_CONSTANTS,
} from "$shared/config";
import { pickCookiesFromResponse } from "$shared/lib/index.server";

export async function logout() {
	const client = await createApi({ bearer: true });

	const { response, error } = await onLogout({
		client,
	});

	if (!error) {
		await pickCookiesFromResponse(response);
	} else {
		console.error(`${error.message} (${error.statusCode})`);
		const cookieStore = await cookies();
		cookieStore.delete(AUTH_CONSTANTS.ACCESS_TOKEN_NAME);
		cookieStore.delete(AUTH_CONSTANTS.REFRESH_TOKEN_NAME);
	}

	const headersList = await headers();
	const pathname = headersList.get(HEADERS.PATHNAME);

	if (pathname?.startsWith(ACCOUNT_ROUTE)) {
		redirect(ROUTES_CONSTANTS.HOME);
	}
}

"use server";

import { logout } from "$shared/api/code-gen";
import { pickCookiesFromResponse } from "$shared/lib";
import { headersFromCookies } from "$shared/lib/api/cookies";

export async function logoutAction() {
	try {
		const response = await logout({
			headers: await headersFromCookies(),
		});

		console.log(response);

		await pickCookiesFromResponse(response.response);
	} catch (error) {
		console.error(error);
	}
}

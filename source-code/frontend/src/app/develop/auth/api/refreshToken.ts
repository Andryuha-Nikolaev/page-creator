"use server";

import { getNewTokens } from "$shared/api/code-gen";
import { pickCookiesFromResponse } from "$shared/lib";
import { headersFromCookies } from "$shared/lib/api/cookies";

export async function refreshTokensAction() {
	try {
		const response = await getNewTokens({
			headers: await headersFromCookies(),
		});

		if (response.response.ok) {
			await pickCookiesFromResponse(response.response);
		}
	} catch (error) {
		console.error(error);
	}
}

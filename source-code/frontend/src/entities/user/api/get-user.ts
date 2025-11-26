import { profile } from "$shared/api/code-gen";
import { REVALIDATE_TAGS } from "$shared/config";
import { headersFromCookies } from "$shared/lib";

import { isUserMaybeAuthorized } from "../lib/checks";

export async function getUser() {
	console.log("get user");

	const isMaybeAuthorized = await isUserMaybeAuthorized();

	if (!isMaybeAuthorized) {
		return null;
	}

	try {
		const { data, response } = await profile({
			headers: await headersFromCookies(),
			next: {
				tags: [REVALIDATE_TAGS.USER],
			},
		});

		if (data) {
			return data.user;
		}

		if (response.status === 401) {
			return null;
		}

		throw new Error(`Get user error: ${response.status}`);
	} catch (error) {
		console.error(error);
		throw error;
	}
}

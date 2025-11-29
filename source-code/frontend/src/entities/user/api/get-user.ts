"use server";

import { profile } from "$shared/api/code-gen";
import { REVALIDATE_TAGS } from "$shared/config";
import { getHeadersFromCookies } from "$shared/lib";

import { isUserMaybeAuthorized } from "../lib/checks";

export async function getUser() {
	const isMaybeAuthorized = await isUserMaybeAuthorized();

	if (!isMaybeAuthorized) {
		return null;
	}

	const { data, response } = await profile({
		headers: await getHeadersFromCookies(),
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
}

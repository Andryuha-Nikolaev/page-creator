import "server-only";

import { createApi } from "$shared/api";
import { profile } from "$shared/api/code-gen";
import { REVALIDATE_TAGS } from "$shared/config";

import { isUserMaybeAuthorized } from "../lib/checks";

export async function getUser() {
	const isMaybeAuthorized = await isUserMaybeAuthorized();

	if (!isMaybeAuthorized) {
		return null;
	}

	const client = await createApi({ cookies: true });

	const { data, response } = await profile({
		client: client,
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

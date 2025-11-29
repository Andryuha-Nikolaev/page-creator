"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { profile } from "$shared/api/code-gen";
import {
	ACCOUNT_ROUTE,
	HEADERS,
	REVALIDATE_TAGS,
	ROUTES_CONSTANTS,
} from "$shared/config";
import { getHeadersFromCookies } from "$shared/lib";

import { isUserMaybeAuthorized } from "../lib/checks";

export async function getUser() {
	const isMaybeAuthorized = await isUserMaybeAuthorized();

	const headersList = await headers();
	const pathname = headersList.get(HEADERS.PATHNAME);

	if (!isMaybeAuthorized) {
		if (pathname?.startsWith(ACCOUNT_ROUTE)) {
			redirect(ROUTES_CONSTANTS.LOGOUT);
		}
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
		redirect(ROUTES_CONSTANTS.LOGOUT);
	}

	throw new Error(`Get user error: ${response.status}`);
}

"use server";

import { updateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { profile } from "$shared/api/code-gen";
import {
	AUTH_CONSTANTS,
	REVALIDATE_TAGS,
	ROUTES_CONSTANTS,
} from "$shared/config";
import { getHeadersFromCookies } from "$shared/lib";

export async function revalidateUserAction() {
	const cookieStore = await cookies();
	const accessToken = cookieStore.has(AUTH_CONSTANTS.ACCESS_TOKEN_NAME);
	const refreshToken = cookieStore.has(AUTH_CONSTANTS.REFRESH_TOKEN_NAME);

	if (accessToken && refreshToken) {
		const { response } = await profile({
			headers: await getHeadersFromCookies(),
		});

		if (response.ok) {
			redirect(ROUTES_CONSTANTS.SETTINGS);
		}
	}

	updateTag(REVALIDATE_TAGS.USER);
}

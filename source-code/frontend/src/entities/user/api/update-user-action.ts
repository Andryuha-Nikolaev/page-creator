"use server";

import { updateTag } from "next/cache";

import { updateProfile, type UserDto } from "$shared/api/code-gen";
import { REVALIDATE_TAGS } from "$shared/config";
import { headersFromCookies } from "$shared/lib/api/cookies";

export async function updateUserAction(data: UserDto) {
	try {
		const { response } = await updateProfile({
			body: data,
			headers: await headersFromCookies(),
		});

		if (response.ok) {
			updateTag(REVALIDATE_TAGS.USER);
		}
	} catch (error) {
		console.error(error);
	}
}

"use server";

import { updateTag } from "next/cache";

import { updateProfile, type UserDto } from "$shared/api/code-gen";
import { REVALIDATE_TAGS } from "$shared/config";
import { getHeadersFromCookies } from "$shared/lib";

export async function updateUserAction(data: UserDto) {
	try {
		const { response } = await updateProfile({
			body: data,
			headers: await getHeadersFromCookies(),
		});

		if (response.ok) {
			updateTag(REVALIDATE_TAGS.USER);
		}
	} catch (error) {
		console.error(error);
	}
}

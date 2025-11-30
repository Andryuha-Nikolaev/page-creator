"use server";

import { updateTag } from "next/cache";

import { createApi } from "$shared/api";
import { updateProfile, type UserDto } from "$shared/api/code-gen";
import { REVALIDATE_TAGS } from "$shared/config";

export async function updateUser(data: UserDto) {
	const client = await createApi({ bearer: true, authorized: true });

	const { response } = await updateProfile({
		client,
		body: data,
	});

	if (response.ok) {
		updateTag(REVALIDATE_TAGS.USER);
	}
}

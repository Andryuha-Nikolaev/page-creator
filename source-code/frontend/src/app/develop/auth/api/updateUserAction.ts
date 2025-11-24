"use server";

import { updateProfile, type UserDto } from "$shared/api/code-gen";
import { pickCookiesFromResponse } from "$shared/lib";

export async function updateUserAction(data: UserDto) {
	try {
		const response = await updateProfile({
			body: data,
		});

		await pickCookiesFromResponse(response.response);
	} catch (error) {
		console.error(error);
	}
}

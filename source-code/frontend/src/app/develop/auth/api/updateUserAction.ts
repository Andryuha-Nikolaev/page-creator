"use server";

import { updateProfile, type UserDto } from "$shared/api/code-gen";
import { headersFromCookies } from "$shared/lib/api/cookies";

export async function updateUserAction(data: UserDto) {
	try {
		const response = await updateProfile({
			body: data,
			headers: await headersFromCookies(),
		});

		console.log(response.response.status);
	} catch (error) {
		console.error(error);
	}
}

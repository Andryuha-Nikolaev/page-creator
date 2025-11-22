"use server";

import { login } from "$shared/api/code-gen";
import { pickCookiesFromResponse } from "$shared/lib";

export const loginAction = async () => {
	try {
		const response = await login({
			body: {
				email: "andryuha_nikolaev@mail.ru",
				password: "123456",
			},
		});

		await pickCookiesFromResponse(response.response);
	} catch (error) {
		console.error(error);
	}
};

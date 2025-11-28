"use server";

import { redirect } from "next/navigation";

import { login } from "$shared/api/code-gen";
import { ROUTES_CONSTANTS } from "$shared/config";
import { pickCookiesFromResponse } from "$shared/lib";

export async function loginAction() {
	const { response } = await login({
		body: {
			email: "andryuha_nikolaev@mail.ru",
			password: "123456",
		},
	});

	if (response.ok) {
		await pickCookiesFromResponse(response);
		redirect(ROUTES_CONSTANTS.SETTINGS);
	}
}

"use server";

import { redirect } from "next/navigation";

import { login as onLogin } from "$shared/api/code-gen";
import { ROUTES_CONSTANTS } from "$shared/config";
import { pickCookiesFromResponse } from "$shared/lib/index.server";

export async function login() {
	const { response } = await onLogin({
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

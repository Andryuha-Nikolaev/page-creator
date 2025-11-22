"use server";

import { login } from "$shared/api/code-gen";

export const loginAction = async () => {
	try {
		const res = await login({
			body: {
				email: "andryuha_nikolaev@mail.ru",
				password: "123456",
			},
		});

		console.log(res.data);
	} catch (error) {
		console.error(error);
	}
};

import { profile } from "$shared/api/code-gen";
import { headersFromCookies } from "$shared/lib/api/cookies";

export async function getUser() {
	try {
		const response = await profile({
			headers: await headersFromCookies(),
		});

		if (response.response.ok) {
			return response.data?.user;
		}
	} catch (error) {
		console.error(error);
	}
}

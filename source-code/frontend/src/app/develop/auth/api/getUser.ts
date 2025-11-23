import { profile } from "$shared/api/code-gen";
import { headersFromCookies } from "$shared/lib/api/cookies";

export async function getUser() {
	try {
		const response = await profile({
			headers: await headersFromCookies(),
		});

		return response;
	} catch (error) {
		console.error(error);
	}
}

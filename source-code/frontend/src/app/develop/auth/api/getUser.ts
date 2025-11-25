import { profile } from "$shared/api/code-gen";
import { REVALIDATE_TAGS } from "$shared/config";
import { headersFromCookies } from "$shared/lib/api/cookies";

export async function getUser() {
	try {
		const response = await profile({
			headers: await headersFromCookies(),
			next: {
				tags: [REVALIDATE_TAGS.USER],
			},
		});

		if (response.response.ok) {
			return response.data?.user;
		}
	} catch (error) {
		console.error(error);
	}
}

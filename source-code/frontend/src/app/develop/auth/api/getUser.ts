import { profile } from "$shared/api/code-gen";
import { REVALIDATE_TAGS } from "$shared/config";
import { headersFromCookies } from "$shared/lib/api/cookies";

export async function getUser() {
	try {
		const { data } = await profile({
			headers: await headersFromCookies(),
			next: {
				tags: [REVALIDATE_TAGS.USER],
			},
		});

		if (data) {
			return data.user;
		}

		return null;
	} catch (error) {
		console.error(error);
	}
}

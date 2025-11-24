import { getNewTokens, profile } from "$shared/api/code-gen";
import { createClient } from "$shared/api/code-gen/client";
import { headersFromCookies } from "$shared/lib/api/cookies";

export async function getUser() {
	const cl = createClient({
		baseUrl: process.env.NEXT_PUBLIC_API_URL,
		headers: await headersFromCookies(),
	});

	try {
		const response = await profile({
			client: cl,
		});

		if (response.response.ok) {
			return response.data?.user;
		}

		if (response.response.status === 401) {
			const refreshResponse = await getNewTokens({
				client: cl,
			});

			if (refreshResponse.response.ok) {
				cl.setConfig({
					headers: {
						cookie: refreshResponse.response.headers.get("set-cookie"),
					},
				});

				const response = await profile({
					client: cl,
				});

				if (response.response.ok) {
					return response.data?.user;
				}
			}
		}
	} catch (error) {
		console.error(error);
	}
}

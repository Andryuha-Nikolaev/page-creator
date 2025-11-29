import { redirect } from "next/navigation";

import { getHeadersFromCookies } from "$shared/lib";

import { createClient } from "./code-gen/client";
import { createClientConfig } from "./hey-api";

type CreateApi = {
	withCookies?: boolean;
	withUnauthorized?: boolean;
};

export const createApi = async ({
	withCookies,
	withUnauthorized,
}: CreateApi) => {
	const client = createClient(createClientConfig());

	if (withCookies) {
		const headersFromCookies = await getHeadersFromCookies();

		client.setConfig({
			headers: headersFromCookies,
		});
	}

	if (withUnauthorized) {
		client.interceptors.response.use((response) => {
			if (response.status === 401) {
				redirect("/");
			}

			return response;
		});
	}

	console.log(client.getConfig());

	return client;
};

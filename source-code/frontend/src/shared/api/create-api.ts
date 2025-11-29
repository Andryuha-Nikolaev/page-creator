import { notFound, redirect } from "next/navigation";

import { ROUTES_CONSTANTS } from "$shared/config";
import { getHeadersFromCookies } from "$shared/lib";

import { createClient } from "./code-gen/client";
import { createClientConfig } from "./hey-api";

type CreateApi = {
	cookies?: boolean;
	authorized?: boolean;
	notFoundHandler?: boolean;
};

export const createApi = async ({
	cookies,
	authorized,
	notFoundHandler,
}: CreateApi) => {
	const client = createClient(createClientConfig());

	if (cookies || authorized) {
		const headersFromCookies = await getHeadersFromCookies();

		client.setConfig({
			headers: headersFromCookies,
		});
	}

	if (authorized) {
		client.interceptors.response.use((response) => {
			if (response.status === 401) {
				redirect(ROUTES_CONSTANTS.LOGOUT);
			}

			return response;
		});
	}

	if (notFoundHandler) {
		client.interceptors.response.use((response) => {
			if (response.status === 404) {
				notFound();
			}

			return response;
		});
	}

	// console.log(client.getConfig());

	return client;
};

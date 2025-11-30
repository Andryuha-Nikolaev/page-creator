import { notFound, redirect } from "next/navigation";

import { ROUTES_CONSTANTS } from "$shared/config";
import {
	getHeadersFromCookies,
	getHeadersWithBearer,
} from "$shared/lib/index.server";

import { createClient } from "./code-gen/client";
import { createClientConfig } from "./hey-api";

type CreateApi = {
	bearer?: boolean;
	cookies?: boolean;
	authorized?: boolean;
	notFoundHandler?: boolean;
};

export const createApi = async ({
	bearer,
	cookies,
	authorized,
	notFoundHandler,
}: CreateApi) => {
	const client = createClient(createClientConfig());

	if (bearer) {
		const headersWithBearer = await getHeadersWithBearer();

		if (headersWithBearer) {
			client.setConfig({
				headers: headersWithBearer,
			});
		}
	}

	if (cookies) {
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

	return client;
};

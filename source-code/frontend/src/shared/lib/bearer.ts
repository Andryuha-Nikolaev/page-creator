import "server-only";

import { cookies } from "next/headers";

import { AUTH_CONSTANTS } from "$shared/config";

export async function getHeadersWithBearer(): Promise<HeadersInit | null> {
	const cookiesStore = await cookies();
	const accessTokenValue = cookiesStore.get(
		AUTH_CONSTANTS.ACCESS_TOKEN_NAME
	)?.value;

	if (!accessTokenValue) {
		return null;
	}

	return {
		Authorization: `Bearer ${accessTokenValue}`,
	};
}

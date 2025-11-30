import "server-only";

import { cookies } from "next/headers";

import { AUTH_CONSTANTS } from "$shared/config";

export const isUserMaybeAuthorized = async () => {
	const cookieStore = await cookies();

	return !!cookieStore.get(AUTH_CONSTANTS.ACCESS_TOKEN_NAME);
};

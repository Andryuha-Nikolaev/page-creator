import { cookies } from "next/headers";

import { AUTH_CONSTANTS } from "$app/develop/auth/config/constants";

export const isUserMaybeAuthorized = async () => {
	const cookieStore = await cookies();

	return !!cookieStore.get(AUTH_CONSTANTS.ACCESS_TOKEN_NAME);
};

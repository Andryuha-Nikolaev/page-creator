import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { AUTH_CONSTANTS, ROUTES_CONSTANTS } from "$shared/config";

export const GET = async () => {
	const cookieStore = await cookies();

	cookieStore.delete(AUTH_CONSTANTS.ACCESS_TOKEN_NAME);
	cookieStore.delete(AUTH_CONSTANTS.REFRESH_TOKEN_NAME);
	redirect(ROUTES_CONSTANTS.LOGIN);
};

import { redirect } from "next/navigation";

import { ROUTES_CONSTANTS } from "$shared/config";
import { deleteAuthCookies } from "$shared/lib/cookies";

export const GET = async () => {
	await deleteAuthCookies();
	redirect(ROUTES_CONSTANTS.LOGIN);
};

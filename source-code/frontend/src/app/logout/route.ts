import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

import { ROUTES_CONSTANTS } from "$shared/config";
import { deleteAuthCookies } from "$shared/lib/cookies";

export const GET = async (request: NextRequest) => {
	await deleteAuthCookies();
	redirect(`${ROUTES_CONSTANTS.LOGIN}${request.nextUrl.search}`);
};

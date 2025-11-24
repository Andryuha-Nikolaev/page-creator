"use server";

import { cookies } from "next/headers";

export async function testCookieAction() {
	const cookiesStore = await cookies();
	cookiesStore.set("coc", "coooooocaaaaaaaaaaaaaaa");
}

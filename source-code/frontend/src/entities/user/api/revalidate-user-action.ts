"use server";

import { updateTag } from "next/cache";

import { REVALIDATE_TAGS } from "$shared/config";

// eslint-disable-next-line @typescript-eslint/require-await
export async function revalidateUserAction() {
	updateTag(REVALIDATE_TAGS.USER);
}

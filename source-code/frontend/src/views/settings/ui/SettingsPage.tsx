"use client";

import Link from "next/link";

import { ROUTES_CONSTANTS } from "$shared/config";
import { updateUserAction } from "$entities/user/api/update-user-action";
import { logoutAction } from "$features/auth";

export const SettingsPage = () => {
	return (
		<div>
			<h1>SettingsPage</h1>
			<Link href={ROUTES_CONSTANTS.HOME}>Home</Link>
			<button onClick={() => void logoutAction()}>Logout</button>
			<button onClick={() => void updateUserAction({ name: "Andrey" })}>
				Update Andrey
			</button>
			<button onClick={() => void updateUserAction({ name: "Andreyka" })}>
				Update Andreyka
			</button>
		</div>
	);
};

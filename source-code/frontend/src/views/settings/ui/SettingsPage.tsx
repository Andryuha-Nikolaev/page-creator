"use client";

import Link from "next/link";

import { ROUTES_CONSTANTS } from "$shared/config";
import { useUserContext } from "$entities/user";
import { updateUserAction } from "$entities/user/api/update-user-action";
import { logoutAction } from "$features/auth";

export const SettingsPage = () => {
	const user = useUserContext();

	if (!user) {
		return null;
	}

	return (
		<div>
			<h1>SettingsPage {user.email}</h1>
			<Link href={ROUTES_CONSTANTS.HOME}>Home page</Link>
			<div>
				<button onClick={() => void logoutAction()}>Logout</button>
			</div>
			<div>
				<button onClick={() => void updateUserAction({ name: "Andrey" })}>
					Update Andrey
				</button>
			</div>
			<div>
				<button onClick={() => void updateUserAction({ name: "Andreyka" })}>
					Update Andreyka
				</button>
			</div>
		</div>
	);
};

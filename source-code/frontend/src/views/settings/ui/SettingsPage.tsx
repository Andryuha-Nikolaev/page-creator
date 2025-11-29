"use client";

import Link from "next/link";

import { ROUTES_CONSTANTS } from "$shared/config";
import { updateUser } from "$entities/user/api/update-user";
import { logout } from "$features/auth";

export const SettingsPage = () => {
	return (
		<div>
			<h1>SettingsPage</h1>
			<Link href={ROUTES_CONSTANTS.HOME}>Home page</Link>
			<div>
				<button onClick={() => void logout()}>Logout</button>
			</div>
			<div>
				<button onClick={() => void updateUser({ name: "Andrey" })}>
					Update Andrey
				</button>
			</div>
			<div>
				<button onClick={() => void updateUser({ name: "Andreyka" })}>
					Update Andreyka
				</button>
			</div>
		</div>
	);
};

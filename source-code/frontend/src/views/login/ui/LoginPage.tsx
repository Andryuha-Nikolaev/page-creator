"use client";

import { useEffect } from "react";
import Link from "next/link";

import { ROUTES_CONSTANTS } from "$shared/config";
import { revalidateUserAction } from "$entities/user";
import { loginAction } from "$features/auth";

export const LoginPage = () => {
	useEffect(() => {
		console.log("update user action");

		// TODO:

		void revalidateUserAction();
	}, []);

	return (
		<div>
			<h1>LoginPage</h1>
			<div>
				<Link href={ROUTES_CONSTANTS.HOME}>Home page</Link>
			</div>
			<div>
				<Link href={ROUTES_CONSTANTS.SETTINGS}>Account settings page</Link>
			</div>
			<button onClick={() => void loginAction()}>On login</button>
		</div>
	);
};

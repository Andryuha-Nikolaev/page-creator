"use client";

import Link from "next/link";

import { ROUTES_CONSTANTS } from "$shared/config";
import { login } from "$features/auth";

export const LoginPage = () => {
	return (
		<div>
			<h1>LoginPage</h1>
			<div>
				<Link href={ROUTES_CONSTANTS.HOME}>Home page</Link>
			</div>
			<div>
				<Link href={ROUTES_CONSTANTS.SETTINGS}>Account settings page</Link>
			</div>
			<button onClick={() => void login()}>On login</button>
		</div>
	);
};

"use client";

import { loginAction } from "$features/auth";

export const LoginPage = () => {
	return (
		<div>
			<h1>LoginPage</h1>
			<button onClick={() => void loginAction()}>Login</button>
		</div>
	);
};

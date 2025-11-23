"use client";

import { loginAction } from "./api/loginAction";
import { logoutAction } from "./api/logoutAction";

import s from "./AuthPage.module.scss";

export const AuthPage = () => {
	return (
		<div className={s.block}>
			<h1>AuthPage</h1>

			<button onClick={() => void loginAction()}>Login</button>
			<button onClick={() => void logoutAction()}>Logout</button>
		</div>
	);
};

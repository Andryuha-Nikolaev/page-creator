"use client";

import { loginAction } from "./api/loginAction";
import { logoutAction } from "./api/logoutAction";
import { refreshTokensAction } from "./api/refreshToken";
import { updateUserAction } from "./api/updateUserAction";

import s from "./AuthPage.module.scss";

export const AuthPage = () => {
	return (
		<div className={s.block}>
			<h1>AuthPage</h1>

			<button onClick={() => void loginAction()}>Login</button>
			<button onClick={() => void logoutAction()}>Logout</button>

			<button onClick={() => void updateUserAction({ name: "Andrey" })}>
				Update Andrey
			</button>
			<button onClick={() => void updateUserAction({ name: "Andreyka" })}>
				Update Andreyka
			</button>

			<button onClick={() => void refreshTokensAction()}>Refresh token</button>
		</div>
	);
};

import Link from "next/link";

import { ROUTES_CONSTANTS } from "$shared/config";

import s from "./HomePage.module.scss";

export const HomePage = () => {
	return (
		<div className={s.block}>
			<h1>HomePage</h1>
			<div>
				{" "}
				<Link href={ROUTES_CONSTANTS.SETTINGS}>Account settings page</Link>
			</div>
			<div>
				{" "}
				<Link href={ROUTES_CONSTANTS.LOGIN}>Login page</Link>
			</div>
		</div>
	);
};

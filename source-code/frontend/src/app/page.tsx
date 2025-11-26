import Link from "next/link";

import { ROUTES_CONSTANTS } from "$shared/config";
import { HomePage } from "$pages/home";

export default function Home() {
	return (
		<>
			<Link href={ROUTES_CONSTANTS.SETTINGS}>Account settings</Link>
			<Link href={ROUTES_CONSTANTS.LOGIN}>Login</Link>
			<HomePage />
		</>
	);
}

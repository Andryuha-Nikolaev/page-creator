import Link from "next/link";

import { ROUTES_CONSTANTS } from "$shared/config";

export default function Develop() {
	return (
		<>
			<h1>DevelopPage</h1>

			<Link href={ROUTES_CONSTANTS.HOME}>Home</Link>
		</>
	);
}

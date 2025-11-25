import Link from "next/link";

import { ROUTES_CONSTANTS } from "$shared/config";

export default function Settings() {
	return (
		<>
			<Link href={ROUTES_CONSTANTS.HOME}>Home</Link>
			<div>Settings</div>
		</>
	);
}

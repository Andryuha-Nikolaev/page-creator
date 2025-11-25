import Link from "next/link";

import { getUser } from "$features/user";

export default async function Develop() {
	const user = await getUser();

	return (
		<>
			<h1>{user?.name}</h1>
			<p>DevelopPage</p>
			<Link href="/develop/auth">/develop/auth</Link>
		</>
	);
}

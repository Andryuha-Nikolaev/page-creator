import Link from "next/link";

import { getUser } from "$features/user";

import { AuthPage } from "./AuthPage";

export default async function Auth() {
	const user = await getUser();

	return (
		<>
			<h1>{user?.name}</h1>
			<AuthPage />
			<Link href="/develop">/develop</Link>
		</>
	);
}

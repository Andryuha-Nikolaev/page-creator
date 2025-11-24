import Link from "next/link";

import { getUser } from "./api/getUser";
import { AuthPage } from "./AuthPage";

const Auth = async () => {
	const user = await getUser();

	return (
		<>
			<h1>{user?.name}</h1>
			<AuthPage />
			<Link href="/develop">/develop</Link>
		</>
	);
};

export default Auth;

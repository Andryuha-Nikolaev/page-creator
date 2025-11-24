import Link from "next/link";

import { getUser } from "./auth/api/getUser";

const Develop = async () => {
	const user = await getUser();

	return (
		<>
			<h1>{user?.name}</h1>
			<p>DevelopPage</p>
			<Link href="/develop/auth">/develop/auth</Link>
		</>
	);
};

export default Develop;

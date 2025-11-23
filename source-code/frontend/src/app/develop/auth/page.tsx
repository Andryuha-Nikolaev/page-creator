import { getUser } from "./api/getUser";
import { AuthPage } from "./AuthPage";

const Auth = async () => {
	const user = await getUser();

	return (
		<>
			<h1>{user?.data?.user.name}</h1>
			<AuthPage />
		</>
	);
};

export default Auth;

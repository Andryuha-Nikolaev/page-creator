import { authControllerLogin } from "$shared/api/code-gen";
import { HomePage } from "$pages/home";

export default async function Home() {
	const res = await authControllerLogin({
		body: {
			email: "andryuha_nikolaev@mail.ru",
			password: "",
		},
	});

	console.log(res);

	return <HomePage />;
}

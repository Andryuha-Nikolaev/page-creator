import { login } from "$shared/api/code-gen";
import { HomePage } from "$pages/home";

export default async function Home() {
	const res = await login({
		body: {
			email: "andryuha_nikolaev@mail.ru",
			password: "123456",
		},
	});

	console.log(res.response.ok);

	return <HomePage />;
}

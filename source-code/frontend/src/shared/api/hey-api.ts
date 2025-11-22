import { type CreateClientConfig } from "./code-gen/client";

export const createClientConfig: CreateClientConfig = (config) => ({
	...config,
	baseUrl: process.env.NEXT_PUBLIC_API_URL,
});

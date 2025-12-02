declare namespace NodeJS {
	interface ProcessEnv {
		NEXT_PUBLIC_BUILD_PROFILE: "local" | "development" | "production";
		NEXT_PUBLIC_SITE_URL: string;
		NEXT_PUBLIC_API_URL: string;
	}
}

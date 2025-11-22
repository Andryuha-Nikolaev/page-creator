import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
	input: `http://localhost:4200/api/docs-yaml`,
	output: {
		path: "./src/shared/api/code-gen",
		format: "prettier",
		lint: "eslint",
	},
	plugins: [
		{
			name: "@hey-api/client-next",
			runtimeConfigPath: "../hey-api",
		},
	],
});

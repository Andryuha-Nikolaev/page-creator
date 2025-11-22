import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
	input: `${process.env.NEXT_PUBLIC_API_URL}docs-yaml`,
	output: {
		path: "./src/shared/api/code-gen",
		format: "prettier",
		lint: "eslint",
	},
});

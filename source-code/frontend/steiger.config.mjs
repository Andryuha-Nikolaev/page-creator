import fsd from "@feature-sliced/steiger-plugin";
import { defineConfig } from "steiger";

export default defineConfig([
	...fsd.configs.recommended,
	{
		rules: {
			"fsd/insignificant-slice": "off",
		},
	},
	{
		files: ["./src/shared/styles/**"],
		rules: {
			"fsd/public-api": "off",
		},
	},
	{
		files: ["./src/shared/api/code-gen/**"],
		rules: {
			"fsd/no-public-api-sidestep": "off",
		},
	},
]);

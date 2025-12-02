import nextConfig from "@m-social/eslint-config-next";
import { defineConfig } from "eslint/config";

export default defineConfig(
	{
		ignores: ["eslint.config.mjs", "steiger.config.mjs"],
	},
	nextConfig({
		tsconfigRootDir: import.meta.dirname,
		reactCompiler: true,
	}),
	{
		files: ["src/shared/api/code-gen/**"],
		rules: {
			"@typescript-eslint/no-unsafe-assignment": "off",
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/ban-ts-comment": "off",
			"@typescript-eslint/no-unsafe-return": "off",
			"@typescript-eslint/no-unsafe-argument": "off",
			"@typescript-eslint/only-throw-error": "off",
			"@eslint-react/hooks-extra/no-unnecessary-use-prefix": "off",
			"@typescript-eslint/no-redundant-type-constituents": "off",
			"@typescript-eslint/no-floating-promises": "off",
			"@eslint-react/no-unnecessary-use-prefix": "off",
		},
	}
);

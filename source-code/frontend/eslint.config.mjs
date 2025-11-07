import nextConfig from "@m-social/eslint-config-next";
import { defineConfig } from "eslint/config";

export default defineConfig(
	{
		ignores: ["eslint.config.mjs", "steiger.config.mjs"],
	},
	nextConfig({
		tsconfigRootDir: import.meta.dirname,
		reactCompiler: true,
	})
);

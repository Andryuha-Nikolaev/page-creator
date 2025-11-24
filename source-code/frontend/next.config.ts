import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: "standalone",
	images: {
		formats: ["image/webp"],
		remotePatterns: [
			{
				hostname: "**",
				pathname: "**",
			},
		],
		qualities: [90, 100],
	},
	reactCompiler: true,
	experimental: {
		useCache: true,
	},
};

export default nextConfig;

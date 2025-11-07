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
		qualities: [85, 95, 100],
	},
	reactCompiler: true,
};

export default nextConfig;

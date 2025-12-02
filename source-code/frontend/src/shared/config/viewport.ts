import type { Viewport } from "next";

export const viewportConfig: Viewport = {
	width: "device-width",
	userScalable: false,
	maximumScale: 1,
	minimumScale: 1,
	initialScale: 1,
	colorScheme: "dark",
	themeColor: "#0a0a0a",
	// themeColor: [
	// 	{ media: "(prefers-color-scheme: light)", color: "white" },
	// 	{ media: "(prefers-color-scheme: dark)", color: "black" },
	// ],
};

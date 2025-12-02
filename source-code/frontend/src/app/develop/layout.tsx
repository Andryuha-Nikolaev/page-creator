import { notFound } from "next/navigation";

export default function DevelopLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	if (process.env.NEXT_PUBLIC_BUILD_PROFILE === "production") {
		return notFound();
	}

	return children;
}

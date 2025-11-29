"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { ROUTES_CONSTANTS } from "$shared/config";
import { useUserContext } from "$entities/user";

export default function AccountLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const user = useUserContext();

	const router = useRouter();

	useEffect(() => {
		if (!user) {
			router.replace(ROUTES_CONSTANTS.LOGOUT);
		}
	}, [router, user]);

	if (!user) {
		return <div>Redirecting...</div>;
	}

	return children;
}

"use client";

import { createContext, use, type ProviderProps } from "react";

import { type UserWithoutPassword } from "$shared/api/code-gen";

export type UserContextValue = UserWithoutPassword | null;

const UserContext = createContext<UserContextValue>(null);

export const UserContextProvider = (props: ProviderProps<UserContextValue>) => (
	<UserContext {...props} />
);

export function useUserContext() {
	return use(UserContext);
}

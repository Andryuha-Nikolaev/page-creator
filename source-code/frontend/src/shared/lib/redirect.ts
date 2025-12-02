import { SEARCH_PARAMS } from "$shared/config";

export const buildRedirectQuery = (returnUrl?: string) => {
	const search = new URLSearchParams();
	if (returnUrl) {
		search.set(SEARCH_PARAMS.REDIRECT_TO, encodeURIComponent(returnUrl));
	}

	return `?${search.toString()}`;
};

export const getRedirectPath = (path: string, returnUrl?: string) =>
	`${path}${buildRedirectQuery(returnUrl)}`;

export const parseReturnUrl = () => {
	const redirect = new URLSearchParams(location.search).get(
		SEARCH_PARAMS.REDIRECT_TO
	);

	if (!redirect) {
		return undefined;
	}

	try {
		return decodeURIComponent(redirect);
	} catch {
		return undefined;
	}
};

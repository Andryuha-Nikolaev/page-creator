import { ROUTES_CONSTANTS } from "$shared/config";
import { SEARCH_PARAMS } from "$shared/config/search-params";

export const buildRedirectQuery = (returnUrl?: string) => {
	// TODO: import modal id from constants
	const search = new URLSearchParams({ [SEARCH_PARAMS.ACTION]: "sign-in" });
	if (returnUrl) {
		search.set(SEARCH_PARAMS.REDIRECT_TO, encodeURIComponent(returnUrl));
	}

	return `?${search.toString()}`;
};

export const getRedirectPath = (returnUrl?: string) =>
	`${ROUTES_CONSTANTS.HOME}${buildRedirectQuery(returnUrl)}`;

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

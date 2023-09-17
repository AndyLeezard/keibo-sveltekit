/* eslint-disable @typescript-eslint/no-explicit-any */
import { PUBLIC_HOST } from "$env/static/public"

type TGenericFetchResponse<T> = {
	statusCode: number;
	networkError: boolean;
	data: T | null;
};
export const BASE_URL = `${PUBLIC_HOST}/api` as const;
export const REQUEST_INIT = {
	credentials: 'include',
	mode: 'cors'
} as const;
export const FIELD_ERROR: TGenericFetchResponse<null> = {
	statusCode: 0,
	networkError: true,
	data: null
};
export const baseFetchQuery = async <T>(args: {
	uri: string;
	statusCode?: number;
	networkError?: boolean;
	data?: any;
	init?: RequestInit;
}): Promise<TGenericFetchResponse<T>> => {
	let { statusCode = 0, networkError = false, data = null } = args;
	const { uri, init } = args;
	try {
		const response = await fetch(uri, init);
		statusCode = response.status;
		if (!response.ok) {
			throw new Error(
				`Network response was not ok with status ${statusCode} - ${response.statusText}`
			);
		}
		const as_json = await response.json();
		data = as_json;
	} catch (error) {
		console.error(error);
		if (!statusCode) {
			networkError = true;
		}
	}
	return {
		statusCode,
		networkError,
		data
	};
};
export const getClientUser = async (): Promise<TGenericFetchResponse<SerializedUser>> => {
	const uri = `${BASE_URL}/users/me/`;
	const init = {
		...REQUEST_INIT,
		method: 'GET'
	};
	return await baseFetchQuery<SerializedUser>({
		uri,
		init
	});
};

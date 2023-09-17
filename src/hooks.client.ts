/* eslint-disable @typescript-eslint/no-explicit-any */
import { user } from '$stores/auth';
// import { get } from 'svelte/store';

export async function handle({ request, resolve }: { request: Request; resolve: any }) {
	if (user) {
		// Handle authenticated state
	}

	const response = await resolve(request);
	return response;
}

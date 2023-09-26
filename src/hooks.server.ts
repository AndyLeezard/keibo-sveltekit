/* This file was created by inlang.
It is needed in order to circumvent a current limitation of SvelteKit. See https://github.com/inlang/inlang/issues/647
You can remove this comment and modify the file as you like. We just need to make sure it exists.
Please do not delete it (inlang will recreate it if needed). */
// import type { RequestEvent } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').Handle} */
/* export async function handle({ event, resolve }) {
	if (event.url.pathname.startsWith('/custom')) {
		return new Response('custom response');
	}

	const response = await resolve(event);
	return response;
} */

/** @type {import('@sveltejs/kit').HandleFetch} */
/*
export async function handleFetch({ event, request, fetch }) {
  console.log("hooks.server.ts > handleFetch")
  
  const cookie = event.request.headers.get('cookie');
  console.log(cookie);
  if (cookie) {
    request.headers.set('cookie', cookie);
  }
  
  return fetch(request);
}
*/
/* export async function handleFetch(input: {
  event: RequestEvent;
  request: Request;
  fetch: typeof fetch;
}) {
  const { event, request, fetch } = input;
  console.log("this ran")
  if (request.url.startsWith('https://keibo') || request.url.startsWith('http://www.keibo')) {
    const cookie = event.request.headers.get('cookie');
    console.log(cookie)
    if (cookie) {
      request.headers.set('cookie', cookie);
    }
  }

  return fetch(request, {
    credentials: 'include'
  });
}
 */

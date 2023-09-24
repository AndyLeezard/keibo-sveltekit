/* This file was created by inlang.
It is needed in order to circumvent a current limitation of SvelteKit. See https://github.com/inlang/inlang/issues/647
You can remove this comment and modify the file as you like. We just need to make sure it exists.
Please do not delete it (inlang will recreate it if needed). */
/* eslint-disable @typescript-eslint/ban-types */
import { redirect } from '@sveltejs/kit';

const protectedUrlPatterns: RegExp[] = [
  /(?:^\/?)my\/?/,
  /(?:^\/?)wallet\/new\/?/
  // ...other patterns
];
function isProtectedUrl(pathname: string): boolean {
  const segments = pathname.split('/').slice(2).join('/');
  for (const pattern of protectedUrlPatterns) {
    if (pattern.test(segments)) {
      return true;
    }
  }
  return false;
}
export function load({ cookies, url }) {
  const access = cookies.get('access');
  const refresh = cookies.get('refresh');
  const userHasJWT = Boolean(access) && Boolean(refresh);
  if (!userHasJWT && isProtectedUrl(url.pathname)) {
    throw redirect(307, '/lang');
  }
  return {
    userHasJWT
  };
}

/* eslint-disable @typescript-eslint/ban-types */
import type { LoadEvent } from '@sveltejs/kit';
import type { RouteParams } from './$types';
// import { goto } from '$app/navigation';

export function load({ url }: LoadEvent<RouteParams, null, {}, '/[lang]/auth/resend-email'>) {
  const email = url.searchParams.get('email');
  return {
    email
  };
}

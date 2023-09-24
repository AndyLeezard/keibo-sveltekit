/* eslint-disable @typescript-eslint/ban-types */
import type { LoadEvent } from '@sveltejs/kit';
import type { RouteParams } from './$types';
// import { goto } from '$app/navigation';

export function load({
  params
}: LoadEvent<RouteParams, null, {}, '/[lang]/auth/password-reset/[uid]/[token]'>) {
  const { uid, token } = params;
  return {
    uid,
    token
  };
}

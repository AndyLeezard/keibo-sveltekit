/* eslint-disable @typescript-eslint/ban-types */
import type { LoadEvent } from '@sveltejs/kit';
import type { RouteParams } from './$types';

export function load({
  params,
  url
}: LoadEvent<RouteParams, null, {}, '/[lang]/auth/oauth/[provider]'>) {
  const state = url.searchParams.get('state');
  const code = url.searchParams.get('code');
  const urlParams = state && code ? { state, code } : null;
  return {
    provider: params.provider,
    urlParams
  };
}

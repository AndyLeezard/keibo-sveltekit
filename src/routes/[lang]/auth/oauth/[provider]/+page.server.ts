export function load({ params, url }) {
  const state = url.searchParams.get('state');
  const code = url.searchParams.get('code');
  const urlParams = state && code ? { state, code } : null;
  return {
    provider: params.provider,
    urlParams
  };
}

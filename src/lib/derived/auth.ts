import { checkCookies } from '$lib/cookie';
import {
  BASE_URL,
  REQUEST_INIT,
  baseFetchQuery
} from '../node-fetch'; /* eslint-disable @typescript-eslint/no-explicit-any */
import { PUBLIC_REDIRECT_URL } from '$env/static/public';
import { dev } from '$app/environment';

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

export type AuthAccessResponseToken = {
  access: string;
};

export type AuthResponseTokens = AuthAccessResponseToken & {
  refresh: string; // StringDecoder
};

/**
 * is the login function
 */
export const jwtCreate = async (args: {
  email: string;
  password: string;
}): Promise<TGenericFetchResponse<AuthResponseTokens>> => {
  const uri = `${BASE_URL}/jwt/create/`;
  const init = {
    ...REQUEST_INIT,
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(args)
  };
  return await baseFetchQuery<AuthResponseTokens>({
    uri,
    init
  });
};

/**
 * Returns `null` is irrelevant (the jwt do not exist)
 *
 * Returns `{ statusCode, networkError, data }` if relevant (the jwt exist)
 */
export async function checkLoginStatus() {
  const { access, refresh } = checkCookies(['access', 'refresh']);
  if (access && refresh) {
    const response = await getClientUser();
    // const { statusCode, networkError, data } = response;
    return response;
  } else {
    return null;
    /*
    user.update(() => null);
    */
  }
}

export const logout = async () => {
  const uri = `${BASE_URL}/logout/`;
  const init = {
    credentials: 'include',
    method: 'POST'
    // redirect: 'follow'
  } as const;
  return await baseFetchQuery<'', 'text'>({
    uri,
    init,
    resDataType: 'text'
  });
};

export async function oAuthLogin(provider: string) {
  const uri = `${BASE_URL}/o/${provider}/?redirect_uri=${
    dev ? 'http://localhost:3000' : PUBLIC_REDIRECT_URL
  }/lang/auth/oauth/${provider}`;
  const init = {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    credentials: "include",
  } as const;
  return await baseFetchQuery<{
    authorization_url: string;
  }>({
    uri,
    init
  });
}

export const handleOAuthRedirection = async (args: {
  provider: string; // "google-oauth2" | "github"
  state: string;
  code: string;
}): Promise<TGenericFetchResponse<AuthResponseTokens>> => {
  const { provider, state, code } = args;
  const uri = `${BASE_URL}/o/${provider}/?state=${state}&code=${code}`;
  const init = {
    ...REQUEST_INIT,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'POST'
  };
  return await baseFetchQuery<AuthResponseTokens>({
    uri,
    init
  });
};

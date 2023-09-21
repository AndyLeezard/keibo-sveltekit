import { checkCookies } from '$lib/cookie';
import { BASE_URL, REQUEST_INIT, baseFetchQuery } from '../node-fetch';

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
    method: 'POST',
    // redirect: 'follow'
  } as const;
  return await baseFetchQuery<"", 'text'>({
    uri,
    init,
    resDataType: 'text'
  });
};

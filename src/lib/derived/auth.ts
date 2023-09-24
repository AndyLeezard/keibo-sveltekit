import { PUBLIC_REDIRECT_URL } from '$env/static/public';
import { dev } from '$app/environment';
import { baseGetQuery, basePostQuery } from '$lib/axios';

export const getClientUser = async () => {
  const uri = '/users/me/';
  return await baseGetQuery<SerializedUser>({
    uri
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
export const jwtCreate = async (payload: { email: string; password: string }) => {
  const uri = '/jwt/create/';
  return await basePostQuery<AuthResponseTokens>({
    uri,
    payload
  });
};

export const logout = async () => {
  const uri = '/logout/';
  return await basePostQuery<''>({
    uri,
    payload: undefined
  });
};

export async function oAuthLogin(provider: string) {
  const uri = `/o/${provider}/?redirect_uri=${
    dev ? 'http://localhost:3000' : PUBLIC_REDIRECT_URL
  }/lang/auth/oauth/${provider}`;
  return await baseGetQuery<{
    authorization_url: string;
  }>({
    uri
  });
}

export const handleOAuthRedirection = async (args: {
  provider: string; // "google-oauth2" | "github"
  state: string;
  code: string;
}) => {
  const { provider, state, code } = args;
  const uri = `/o/${provider}/?state=${encodeURIComponent(state)}&code=${encodeURIComponent(code)}`;
  return await basePostQuery<AuthResponseTokens>({
    uri,
    payload: undefined,
    config: {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Cookie: `state=${state}; code=${code};`
      }
    }
  });
};

export const registerUser = async (payload: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  re_password: string;
}) => {
  const uri = '/users/';
  return await basePostQuery<SerializedUser>({
    uri,
    payload
  });
};

export const checkUser = async (email: string) => {
  const uri = 'check_user/';
  return await basePostQuery<{ exists: false } | { exists: true; activated: boolean }>({
    uri,
    payload: { email }
  });
};

export const activateAccount = async (payload: { uid: string; token: string }) => {
  const uri = 'users/activation/';
  return await basePostQuery<''>({
    uri,
    payload
  });
};

export const resendVerificationEmail = async (payload: { email: string }) => {
  const uri = '/users/resend_activation/';
  return await basePostQuery<''>({
    uri,
    payload
  });
};

export const requestPasswordReset = async (payload: { email: string }) => {
  const uri = '/users/reset_password/';
  return await basePostQuery<''>({
    uri,
    payload
  });
};

export const confirmPasswordReset = async (payload: {
  uid: string;
  token: string;
  new_password: string;
  re_new_password: string;
}) => {
  const uri = '/users/reset_password_confirm/';
  return await basePostQuery<''>({
    uri,
    payload
  });
};

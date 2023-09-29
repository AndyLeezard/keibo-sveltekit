import {
  SECRET_JWT_AUTH_ACCESS_KEY_NAME,
  SECRET_JWT_AUTH_REFRESH_KEY_NAME
} from '$env/static/private';

export async function GET({ cookies }) {
  if (SECRET_JWT_AUTH_ACCESS_KEY_NAME) {
    cookies.delete(SECRET_JWT_AUTH_ACCESS_KEY_NAME, { path: '/' });
  }
  if (SECRET_JWT_AUTH_REFRESH_KEY_NAME) {
    cookies.delete(SECRET_JWT_AUTH_REFRESH_KEY_NAME, { path: '/' });
  }
  return new Response(null, {
    status: 204
  });
}

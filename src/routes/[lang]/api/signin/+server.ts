import {
  SECRET_JWT_AUTH_ACCESS_MAX_AGE_IN_HOURS,
  SECRET_JWT_AUTH_REFRESH_MAX_AGE_IN_HOURS,
  SECRET_JWT_AUTH_ACCESS_KEY_NAME,
  SECRET_JWT_AUTH_REFRESH_KEY_NAME
} from '$env/static/private';

export async function POST({ request, cookies }) {
  let { access_max_age, refresh_max_age } = await request.json();
  if (!access_max_age || !refresh_max_age) {
    return new Response('', {
      status: 400,
      statusText: 'Request body is missing the expected properties in json format.'
    });
  }
  if (typeof access_max_age !== 'number' || typeof refresh_max_age !== 'number') {
    return new Response('', {
      status: 400,
      statusText:
        'Request body has the expected properties in json format, but a type exception was raised.'
    });
  }
  const server_side_access_max_age = Number(SECRET_JWT_AUTH_ACCESS_MAX_AGE_IN_HOURS);
  const server_side_refresh_max_age = Number(SECRET_JWT_AUTH_REFRESH_MAX_AGE_IN_HOURS);
  if (isNaN(server_side_access_max_age) || isNaN(server_side_refresh_max_age)) {
    return new Response('', {
      status: 500,
      statusText: 'Internal Server Error - case #1'
    });
  }
  access_max_age = Math.min(server_side_access_max_age * 60 * 60, access_max_age);
  refresh_max_age = Math.min(server_side_refresh_max_age * 60 * 60, refresh_max_age);
  cookies.set(SECRET_JWT_AUTH_ACCESS_KEY_NAME, 'granted', {
    path: '/',
    httpOnly: true,
    secure: true,
    maxAge: access_max_age
  });
  cookies.set(SECRET_JWT_AUTH_REFRESH_KEY_NAME, 'granted', {
    path: '/',
    httpOnly: true,
    secure: true,
    maxAge: refresh_max_age
  });
  return new Response(null, {
    status: 204,
    statusText: 'No Content'
  });
}

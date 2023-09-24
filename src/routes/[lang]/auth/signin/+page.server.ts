export function load({ url }) {
  const from_register = url.searchParams.get('register');
  const from_activation = url.searchParams.get('activate');
  const from_reset_pw_request = url.searchParams.get('reset-pw-request');
  const from_confirm_pw_request = url.searchParams.get('reset-pw-confirm');
  return {
    from_register,
    from_activation,
    from_reset_pw_request,
    from_confirm_pw_request
  };
}

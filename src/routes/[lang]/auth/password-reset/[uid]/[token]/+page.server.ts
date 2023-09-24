export function load({ params }) {
  const { uid, token } = params;
  return {
    uid,
    token
  };
}

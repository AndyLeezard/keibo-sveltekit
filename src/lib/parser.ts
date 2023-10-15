export const parseWalletRole = (role: 1 | 2 | 3 | 4) => {
  switch (role) {
    case 1:
      return 'viewer';
    case 2:
      return 'editor';
    case 3:
      return 'co_owner';
    case 4:
      return 'owner';
    default:
      return 'unknown';
  }
};

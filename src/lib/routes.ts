import { goto } from '$app/navigation';
import { language } from '@inlang/sdk-js';

export const navigateTo = (path: string) => {
  goto(
    `${
      !path ? `/${language}` : path.startsWith('/') ? `/${language}${path}` : `/${language}/${path}`
    }`
  );
};

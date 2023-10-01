import { goto } from '$app/navigation';
import { language } from '@inlang/sdk-js';

export const navigateTo = (path: string) => {
  goto(
    `${
      !path ? `/${language}` : path.startsWith('/') ? `/${language}${path}` : `/${language}/${path}`
    }`
  );
};

/**
 * A user component has to provide its expected url (href).
 * Returns a boolean that indicates whether it matches a segment of
 * the current `$page.url.pathname` - split by '/' - where page is imported from `$app/stores`.
 *
 * Default index for the segment is -1 (checks if `href` matchs the last segment of the current `pathname`).
 */
export const routeIsSelected = (pathname: string, href: string, indexOfSegment: number = -1) => {
  const href_segments = href.split('/');
  const pathname_segments = pathname.split('/');
  const href_segment = href_segments.at(-1);
  const pathname_segment = pathname_segments.at(indexOfSegment);
  if (!href_segment) {
    console.log(`%c href segemnt not found : (${href_segment})`, 'color: #ff6464');
    return false;
  }
  if (!pathname_segment) {
    console.log(`%c pathname segemnt not found : (${pathname_segment})`, 'color: #ff6464');
    return false;
  }
  // console.log(`href_segment ${href_segment} === pathname_segment ${pathname_segment}`);
  return href_segment === pathname_segment;
};

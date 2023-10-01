<script lang="ts">
  import { Link } from '$components/util';
  import clsx from 'clsx';
  import { routeIsSelected } from '$lib/routes';
  import { page } from '$app/stores';
  export let href: string;
  $: isSelected = routeIsSelected($page.url.pathname, href);
</script>

<Link
  role="button"
  className={clsx('btn btn-sm ', {
    ['bg-surface-300 dark:bg-surface-500']: !isSelected,
    ['variant-ghost-surface opacity-75 pointer-events-none']: isSelected
  })}
  {href}
>
  <slot />
</Link>

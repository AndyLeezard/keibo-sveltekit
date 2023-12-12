<script lang="ts">
  import { Link } from '$components/util';
  import { page } from '$app/stores';
  import { clsx } from 'clsx';
  import { routeIsSelected } from '$lib/routes';
  export let href: string;
  export let className: string | undefined = undefined;
  $: isSelected = routeIsSelected($page.url.pathname, href);
</script>

<Link
  className={clsx(
    className,
    'flex btn rounded-none items-center py-3.5 pl-4 pr-16 gap-3 border-l-4 border-solid',
    {
      'border-transparent variant-soft-surface': !isSelected,
      'pointer-events-none font-medium variant-filled-surface': isSelected
    }
  )}
  {href}
>
  <slot />
</Link>

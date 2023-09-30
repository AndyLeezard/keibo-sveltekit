<script lang="ts">
  import clsx from 'clsx';

  export let className: string | undefined = undefined;
</script>

<div
  class={clsx(
    className,
    'hidden sm:flex flex-col border-solid border-r border-gray-200 dark:border-zinc-600 variant-soft-surface'
  )}
>
  <slot />
</div>

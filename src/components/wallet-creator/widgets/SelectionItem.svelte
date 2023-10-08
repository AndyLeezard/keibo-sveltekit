<script lang="ts">
  import clsx from 'clsx';
  import Icon from '@iconify/svelte';
  export let label: string;
  export let icon: TIcon | undefined = undefined;
  export let iconClass: string | undefined = undefined;
  export let image: string | undefined = undefined;
  export let imageClass: string | undefined = undefined;

  /** If given, the default background `#fff` will be unset */
  export let imageWrapperClass: string | undefined = undefined;
</script>

<div class="flex flex-col items-center justify-center w-[100px] gap-2">
  <div
    class={clsx(
      'rounded-lg',
      'relative overflow-hidden p-2',
      {
        ['bg-white']: !imageWrapperClass
      },
      imageWrapperClass
    )}
  >
    {#if image}
      <img
        class={clsx('w-14 h-14 object-contain rounded-clip-md', imageClass)}
        src={image}
        alt=""
      />
    {:else if icon}
      <Icon class={clsx('w-14 h-14', icon.class, iconClass)} icon={icon.source} />
    {:else}
      <Icon class="w-14 h-14 text-surface-800" icon="clarity:unknown-status-line" />
    {/if}
  </div>
  <span
    class={clsx(
      'h-[32px] max-w-full',
      'text-sm leading-[0.875rem] text-center',
      'overflow-hidden whitespace-wrap overflow-ellipsis'
    )}>{label}</span
  >
</div>

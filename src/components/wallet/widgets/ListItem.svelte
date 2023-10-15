<script lang="ts">
  import clsx from 'clsx';
  export let selected: boolean;
  export let label: string;
  export let icon: TIcon | undefined = undefined;
  export let iconClass: string | undefined = undefined;
  export let image: string | undefined = undefined;
  export let imageClass: string | undefined = undefined;
  export let onClick: () => void;
  import Icon from '@iconify/svelte';
</script>

<button
  type="button"
  class={clsx('flex items-center p-1 rounded-lg gap-2', 'min-h-[48px]', {
    ['variant-filled-surface']: selected,
    ['hover:variant-soft-surface']: !selected
  })}
  on:click={onClick}
>
  <div
    class={clsx(
      'w-8 h-8 p-1',
      'flex items-center flex-shrink-0 justify-center',
      'relative overflow-hidden bg-white',
      'rounded-lg'
    )}
  >
    {#if image}
      <img
        class={clsx('w-full h-full object-contain rounded-clip-md', imageClass)}
        src={image}
        alt=""
      />
    {:else if icon}
      <Icon class={clsx('w-full h-full', icon.class, iconClass)} icon={icon.source} />
    {:else}
      <Icon class="w-full h-full text-surface-800" icon="clarity:unknown-status-line" />
    {/if}
  </div>
  <span>{label}</span>
</button>

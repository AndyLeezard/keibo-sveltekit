<script lang="ts">
  import { getModalStore } from '@skeletonlabs/skeleton';
  export let dismiss_button_text: Optional<string> = 'Dismiss';

  const modalStore = getModalStore();
</script>

<div class="card p-4 flex flex-col gap-4 bg-tertiary-200 dark:bg-surface-700 max-w-[556px]">
  <slot />
  <button
    type="button"
    class="btn variant-filled self-center px-4"
    on:click={() => {
      modalStore.close();
    }}
  >
    <kbd class="kbd variant-filled-surface">Esc</kbd>
    <span class="font-semibold">{dismiss_button_text}</span>
  </button>
</div>

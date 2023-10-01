<script lang="ts">
  import { baseGetQuery } from '$lib/axios';
  import { onMount } from 'svelte';
  import { getToastStore } from '@skeletonlabs/skeleton';
  let loaded = false;
  let wallets: Array<SerializedWallet> | null = null;
  const toastStore = getToastStore();

  const target = 4;
  const range = -2;
  onMount(async () => {
    const { errorMessage, data } = await baseGetQuery<Array<SerializedWallet>>({
      uri: `get_wallets/${target}/${range}/`
    });
    loaded = true;
    if (errorMessage) {
      toastStore.trigger({
        message: errorMessage
          ? errorMessage
          : 'An uncaught error occurred while requesting a password reset',
        background: 'variant-filled-error'
      });
      return;
    }
    if (data) {
      wallets = data;
    }
  });
</script>

<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<svelte:head>
  <title>Keibo - overview</title>
</svelte:head>
<div class="flex flex-1 flex-col">
  <div class="inline-flex p-2">
    <h1 class="text-3xl font-bold">Overview</h1>
  </div>
  {#if loaded}
    {#if wallets}
      <code class="code m-auto">{JSON.stringify(wallets)}</code>
    {:else}
      <code class="code m-auto">TODO : Overview</code>
    {/if}
  {:else}
    <section class="card w-full">
      <div class="p-4 space-y-4">
        <div class="placeholder" />
        <div class="grid grid-cols-3 gap-8">
          <div class="placeholder" />
          <div class="placeholder" />
          <div class="placeholder" />
        </div>
        <div class="grid grid-cols-4 gap-4">
          <div class="placeholder" />
          <div class="placeholder" />
          <div class="placeholder" />
          <div class="placeholder" />
        </div>
      </div>
    </section>
  {/if}
</div>

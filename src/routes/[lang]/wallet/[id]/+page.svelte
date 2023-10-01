<script lang="ts">
  import { baseGetQuery } from '$lib/axios';
  import { onMount } from 'svelte';
  import { getToastStore } from '@skeletonlabs/skeleton';
  export let data;
  const { wallet_id } = data;
  let loaded = false;
  let wallet: SerializedWallet | null = null;

  const toastStore = getToastStore();
  onMount(async () => {
    const { errorMessage, data } = await baseGetQuery<SerializedWallet>({
      uri: `wallet/${wallet_id}/`
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
      wallet = data;
    }
  });
</script>

<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<svelte:head>
  <title>Keibo - wallet</title>
</svelte:head>

<div class="container h-full m-auto flex justify-center items-center">
  {#if loaded}
    {#if wallet}
      <code class="code">TODO : view wallet (wallet_id)</code>
    {:else}
      <code class="code">Loaded, but wallet does not exist</code>
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

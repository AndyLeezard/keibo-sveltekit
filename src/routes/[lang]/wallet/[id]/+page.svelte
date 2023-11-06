<script lang="ts">
  import { baseGetQuery } from '$lib/axios';
  import { onMount } from 'svelte';
  import { getToastStore } from '@skeletonlabs/skeleton';
  import clsx from 'clsx';
  import Icon from '@iconify/svelte';
  import { i } from '@inlang/sdk-js';
  import { TransactionShell, Transaction } from '$components/wallet/transaction';
  export let data;
  const { wallet_id } = data;
  let wallet: SerializedWallet | null = null;
  let asset: TWalletAssetMetadata | null = null;
  let transactions: SerializedTransaction[] | null = null;

  const toastStore = getToastStore();
  onMount(async () => {
    const { errorMessage, data } = await baseGetQuery<SerializedWallet>({
      uri: `wallet/${wallet_id}/`
    });
    if (errorMessage) {
      toastStore.trigger({
        message: errorMessage
          ? errorMessage
          : 'An uncaught error occurred while fetching the wallet data',
        background: 'variant-filled-error'
      });
      return;
    }
    if (!data) return;
    wallet = data;
    switch (wallet.category) {
      case 'cash':
      case 'crypto': {
        const { errorMessage, data } = await baseGetQuery<TWalletAssetMetadata>({
          uri: `assets/${wallet.category}/${wallet.asset}`,
          server: 'sveltekit'
        });
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
          asset = data;
        }
      }
    }
    const { errorMessage: tr_errorMessage, data: tr_data } = await baseGetQuery<
      SerializedTransaction[]
    >({
      uri: `get_transactions/${wallet_id}/`
    });
    if (tr_errorMessage) {
      toastStore.trigger({
        message: tr_errorMessage
          ? tr_errorMessage
          : 'An uncaught error occurred while fetching transaction history',
        background: 'variant-filled-error'
      });
      return;
    }
    if (tr_data) {
      transactions = tr_data;
    }
  });
</script>

<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<svelte:head>
  <title>Keibo - wallet</title>
</svelte:head>

<div class="container h-full flex flex-col">
  <div class="inline-flex p-2">
    {#if wallet}
      <h1 class="text-3xl font-bold">{wallet.name}</h1>
    {:else}
      <span class="h-9 w-40 placeholder"></span>
    {/if}
  </div>
  <div class="inline-flex p-2">
    {#if wallet && asset}
      <h2 class="text-2xl font-bold">
        {wallet.balance}
        {asset.symbol.toUpperCase()}
        {#if typeof wallet.val_usd === 'number'}
          <span class="text-sm">({wallet.val_usd.toFixed(2)} in USD)</span>
        {/if}
      </h2>
    {:else}
      <span class="h-8 w-40 placeholder"></span>
    {/if}
  </div>
  <div class={clsx('m-2 flex flex-col overflow-auto', 'variant-soft-surface')}>
    <div
      class={clsx(
        'flex space-x-2',
        'divide-x divide-surface-800 dark:divide-surface-50',
        'variant-filled-surface'
      )}
    >
      <TransactionShell>
        <svelte:fragment slot="category-image">
          <Icon icon="mdi:category-plus-outline" />
        </svelte:fragment>
        <svelte:fragment slot="category">Category</svelte:fragment>
        <svelte:fragment slot="description">Description</svelte:fragment>
        <svelte:fragment slot="amount">Amount</svelte:fragment>
        <svelte:fragment slot="fee">Transaction fee</svelte:fragment>
        <svelte:fragment slot="date">Date</svelte:fragment>
      </TransactionShell>
    </div>
    {#if wallet}
      {#if transactions?.length}
        {#each transactions as transaction}
          <button
            type="button"
            class={clsx(
              'flex space-x-2',
              'divide-x divide-surface-800 dark:divide-surface-50',
              'hover:brightness-125'
            )}
            on:click={() => {
              alert('todo: go to user profile');
            }}
          >
            <Transaction {transaction} wallet_id={wallet.id} />
          </button>
        {/each}
      {:else}
        <span>NO TRANSACTIONS</span>
      {/if}
    {/if}
  </div>
</div>

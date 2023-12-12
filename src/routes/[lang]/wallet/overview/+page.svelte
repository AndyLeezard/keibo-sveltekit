<script lang="ts">
  import { baseGetQuery } from '$lib/axios';
  import { onMount } from 'svelte';
  import { getToastStore } from '@skeletonlabs/skeleton';
  import { Wallet, WalletShell } from '$components/wallet/overview';
  import Icon from '@iconify/svelte';
  import { i } from '@inlang/sdk-js';
  import clsx from 'clsx';
  import { parseAnchorUrl } from '$lib/routes';
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
  {#if loaded && wallets}
    <div class={clsx('m-2 flex flex-col h-full overflow-auto', 'variant-soft-surface')}>
      <div
        class={clsx(
          'flex space-x-2',
          'divide-x divide-surface-800 dark:divide-surface-50',
          'variant-filled-surface'
        )}
      >
        <WalletShell>
          <svelte:fragment slot="provider-image">
            <Icon class="w-full h-full" icon="fa:institution" />
          </svelte:fragment>
          <svelte:fragment slot="provider">
            <span>{i('provider.tag')}</span>
          </svelte:fragment>
          <svelte:fragment slot="asset-image">
            <Icon
              class="w-full h-full"
              icon="streamline:shopping-jewelry-diamond-1-diamond-money-payment-finance-wealth"
            />
          </svelte:fragment>
          <svelte:fragment slot="asset">
            <span>{i('asset.tag')}</span>
          </svelte:fragment>
          <svelte:fragment slot="asset-category">
            <span>{i('category.tag')}</span>
          </svelte:fragment>
          <svelte:fragment slot="role">
            <span>{i('wallet.role.tag')}</span>
          </svelte:fragment>
          <svelte:fragment slot="name">
            <span>{i('wallet.name.tag')}</span>
          </svelte:fragment>
          <svelte:fragment slot="valuation">
            <span>{i('wallet.valuation.tag')}</span>
          </svelte:fragment>
          <svelte:fragment slot="public">
            <span>{i('wallet.public.tag')}</span>
          </svelte:fragment>
        </WalletShell>
      </div>
      {#if wallets.length}
        {#each wallets as wallet}
          <!-- <pre>{JSON.stringify(wallet, null, 4)}</pre> -->
          <a
            class={clsx(
              'flex space-x-2',
              'divide-x divide-surface-800 dark:divide-surface-50',
              'hover:brightness-125'
            )}
            href={parseAnchorUrl('/wallet/new')}
          >
            <Wallet {wallet} />
          </a>
        {/each}
      {:else}
        <div class={clsx('flex flex-col my-auto')}>
          <span class={'text-center mb-2 text-2xl'}>No result</span>
          <a
            class={clsx(
              'mx-auto text-xl text-shadow-thin shadow-black',
              'bg-primary-300-600-token bg-opacity-50 hover:bg-primary-200-700-token',
              'font-bold p-1 rounded-md'
            )}
            href={parseAnchorUrl('/wallet/new')}
          >
            Create a wallet
          </a>
        </div>
      {/if}
    </div>
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

<script lang="ts">
  import { baseGetQuery } from '$lib/axios';
  import { onMount } from 'svelte';
  import { getToastStore } from '@skeletonlabs/skeleton';
  import MdiCashMultiple from 'virtual:icons/mdi/cash-multiple';
  import MdiGraphLine from 'virtual:icons/mdi/graph-line';
  import MdiBitcoin from 'virtual:icons/mdi/bitcoin';
  import MdiBank from 'virtual:icons/mdi/bank';
  import MdiPiggyBank from 'virtual:icons/mdi/piggy-bank';
  import clsx from 'clsx';
  import { i } from '@inlang/sdk-js';
  export let onConfirm: (walletCategory: TWalletCategoryConstructor | null) => void;

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const categoryIconMap: Map<AssetCategory, any> = new Map([
    ['cash', MdiCashMultiple],
    ['equity', MdiGraphLine],
    ['crypto', MdiBitcoin],
    ['fund', MdiBank],
    ['other', MdiPiggyBank]
  ]);

  const toastStore = getToastStore();
  let current_category: TWalletCategoryConstructor | null = null;
  let categories: Array<TWalletCategoryConstructor> | null = null;

  const select = (cat: TWalletCategoryConstructor | null) => {
    current_category = cat;
  };

  const confirm = () => {
    onConfirm(current_category);
  };

  onMount(async () => {
    const { errorMessage, data } = await baseGetQuery<Array<TWalletCategoryConstructor>>({
      uri: '/api/wallet/categories',
      server: 'sveltekit'
    });
    if (errorMessage || !data) {
      toastStore.trigger({
        message: errorMessage
          ? errorMessage
          : 'An uncaught error occurred while fetching asset categories',
        background: 'variant-filled-error'
      });
      return;
    }
    categories = data;
  });
</script>

<div class="max-w-[648px] m-auto flex flex-col variant-soft-surface p-2 rounded-lg gap-4">
  <div class="flex flex-wrap gap-4">
    {#if categories}
      {#each categories as cat, _i}
        <button
          class={clsx(
            'btn p-2 m-0 rounded-md h-[200px] w-[200px]',
            'flex flex-col justify-center whitespace-normal',
            'variant-filled-surface',
            {
              ['ring ring-primary-400']: cat.id === current_category?.id
            }
          )}
          id={cat.id}
          on:click={() => {
            if (cat.id === current_category?.id) {
              select(null);
            } else {
              select(cat);
            }
          }}
        >
          {#if categoryIconMap.has(cat.id)}
            <svelte:component this={categoryIconMap.get(cat.id)} class="w-16 h-16" />
          {/if}
          <label for={cat.id} class="mb-2 font-semibold">{cat.display_name}</label>
          {#if cat.description}
            <span class="text-surface-600-300-token text-xs">{cat.description}</span>
          {/if}
        </button>
      {/each}
    {:else}
      {#each Array(5) as _, _i}
        <div
          class="placeholder variant-filled-surface animate-pulse h-[200px] w-[200px] rounded-md"
        ></div>
      {/each}
    {/if}
  </div>
  <button
    class={clsx('btn self-center variant-filled-surface duration-100', {
      ['animate-wiggle hover:animate-none']: Boolean(current_category)
    })}
    disabled={!current_category}
    on:click={confirm}>{i('misc.confirm')}</button
  >
</div>

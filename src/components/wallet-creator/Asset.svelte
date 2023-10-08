<script lang="ts">
  import { baseGetQuery } from '$lib/axios';
  import { t } from '$lib/intl';
  import { i } from '@inlang/sdk-js';
  import { ProgressRadial, getToastStore } from '@skeletonlabs/skeleton';
  import clsx from 'clsx';
  import { PAGE_RANGE } from './constants';
  import Icon from '@iconify/svelte';
  import { onMount } from 'svelte';
  import { generateNextArray, generatePreviousArray } from './utils';
  import { FormShell, ListItem, SelectionItem } from './widgets';
  export let category: TWalletCategoryConstructor | null;
  export let provider: TWalletProviderConstructor | null;
  export let onConfirm: (walletAsset: TWalletAssetConstructor | null) => void;
  export let onBack: () => void;

  const toastStore = getToastStore();
  let current_asset: TWalletAssetConstructor | null = null;
  let assets: Array<TWalletAssetConstructor> | null = null;

  /** input state */
  let keyword: string = '';
  let current_page: number = 0;
  let display_data: AwaitedArrayData<TWalletAssetConstructor> = {
    metadata: {
      page_ended: false
    },
    data: []
  };
  let max_known_page = 0;

  const select = (asset: TWalletAssetConstructor | null) => {
    current_asset = asset;
  };

  const confirm = () => {
    onConfirm(current_asset);
  };

  const search = async () => {
    if (category!.id !== 'cash' && category!.id !== 'crypto') {
      return;
    }
    const { errorMessage, data } = await baseGetQuery<AwaitedArrayData<TWalletAssetConstructor>>({
      uri: `/api/assets/${category!.id}?&size=5&page=${current_page}${
        keyword ? `&keyword=${keyword}` : ''
      }`,
      server: 'sveltekit'
    });
    if (errorMessage || !data) {
      toastStore.trigger({
        message: errorMessage
          ? errorMessage
          : 'An uncaught error occurred while fetching asset data',
        background: 'variant-filled-error'
      });
      return;
    }
    display_data = data;
    assets = data.data;
    if (current_page > max_known_page && data.data.length) {
      max_known_page = current_page;
    }
  };
  onMount(search);

  let previousPageArray: number[] = [];
  let nextPageArray: number[] = [];
  $: (() => {
    previousPageArray = generatePreviousArray(current_page, PAGE_RANGE);
  })();
  $: (() => {
    nextPageArray = generateNextArray(current_page, Math.max(0, PAGE_RANGE - 1), max_known_page);
  })();
</script>

<FormShell
  instruction={t({
    en: "Tell us about the asset you're holding in this wallet (account).",
    de: 'Erzählen Sie uns von dem Vermögenswert, den Sie in dieser Brieftasche halten (Konto).',
    fr: "Parlez-nous de l'actif que vous détenez dans ce portefeuille (compte).",
    ko: '어떤 자산이 보관되는지 말해주세요.'
  })}
>
  <!-- CURRENT SELECTIONS -->
  <div class="flex justify-center items-center gap-3">
    {#if category}
      <SelectionItem
        label={category.display_name}
        icon={category.icon}
        iconClass={'text-surface-800'}
        image={category.image}
      />
    {/if}
    {#if provider}
      <Icon icon="fa6-solid:plus" class="w-8 h-8" />
      <SelectionItem label={provider.display_name} image={provider.image} icon={provider.icon} />
    {/if}
    {#if current_asset}
      <Icon icon="fa6-solid:plus" class="w-8 h-8" />
      <SelectionItem
        label={current_asset.display_name}
        image={current_asset.image}
        icon={current_asset.icon}
      />
    {/if}
  </div>
  <!-- KEYWORD FORM -->
  <form class="flex flex-col variant-soft-surface p-2 rounded-md" on:submit|preventDefault={search}>
    <label class="label" for="input-keyword">{i('asset.asset.label')}</label>
    <div class="w-full inline-flex items-center gap-2">
      <input
        id="input-keyword"
        bind:value={keyword}
        class="input rounded-md"
        type="text"
        placeholder={i(`asset.asset.placeholders.${category?.id}`)}
      />
      <button class="btn-icon hover:variant-ghost-surface">
        <Icon icon="mdi:magnify" class="w-8 h-8" />
      </button>
    </div>
  </form>
  <!-- LIST OF ITEMS -->
  <div
    class={clsx('flex flex-col variant-soft-surface rounded-md', {
      ['justify-center items-center']: !assets
    })}
  >
    {#if assets}
      {#each assets as asset, _i}
        <ListItem
          onClick={() => {
            if (asset.id === current_asset?.id) {
              select(null);
            } else {
              select(asset);
            }
          }}
          image={asset.image}
          icon={asset.icon}
          label={asset.display_name}
          selected={current_asset?.id === asset.id}
        />
      {/each}
    {:else}
      <ProgressRadial
        value={undefined}
        width="w-6"
        meter="stroke-primary-500"
        track="stroke-primary-500/30"
      />
    {/if}
  </div>
  <!-- PAGES INDICATOR -->
  <div class={'flex items-center justify-center gap-4'}>
    <div class={clsx('first:flex-row-reverse', 'flex flex-1 items-center gap-4')}>
      {#if previousPageArray.length}
        {#each previousPageArray as prevPage}
          <button
            type="button"
            class="first:text-xl cursor-pointer"
            on:click={() => {
              current_page = prevPage;
              search();
            }}
          >
            {prevPage + 1}
          </button>
        {/each}
      {/if}
      {#if current_page - PAGE_RANGE > 0}
        <button
          type="button"
          class="first:text-xl cursor-pointer"
          on:click={() => {
            current_page = 0;
            search();
          }}
        >
          1...
        </button>
      {/if}
    </div>
    <span class={'select-none text-2xl font-bold'}>{current_page + 1}</span>
    <div class={clsx('first:flex-row-reverse', 'flex flex-1 items-center gap-4')}>
      {#if nextPageArray?.length}
        {#each nextPageArray as nextPage}
          <button
            type="button"
            class="first:text-xl cursor-pointer"
            on:click={() => {
              current_page = nextPage;
              search();
            }}
          >
            {nextPage + 1}
          </button>
        {/each}
      {:else if !display_data.metadata.page_ended}
        <button
          type="button"
          class="first:text-xl cursor-pointer"
          on:click={() => {
            current_page += 1;
            search();
          }}
        >
          {current_page + 2}
        </button>
      {:else}
        <!-- else content here -->
      {/if}
    </div>
  </div>
  <!-- BUTTONS -->
  <button
    class={clsx('btn self-center variant-filled-surface duration-100', 'min-w-[100px]', {
      ['animate-wiggle hover:animate-none']: Boolean(current_asset)
    })}
    disabled={!current_asset}
    on:click={confirm}>{i('misc.confirm')}</button
  >
  <button
    class={clsx('btn self-center variant-soft-error duration-100', 'min-w-[100px]')}
    on:click={onBack}>{i('misc.back')}</button
  >
</FormShell>

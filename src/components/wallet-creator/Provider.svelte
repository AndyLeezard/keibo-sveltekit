<script lang="ts">
  import { baseGetQuery } from '$lib/axios';
  import { t } from '$lib/intl';
  import { i } from '@inlang/sdk-js';
  import { ProgressRadial, getToastStore } from '@skeletonlabs/skeleton';
  import clsx from 'clsx';
  import { PAGE_RANGE, categoryIconMap } from './constants';
  import MdiMagnify from 'virtual:icons/mdi/magnify';
  import Fa6SolidPlus from 'virtual:icons/fa6-solid/plus';
  import { onMount } from 'svelte';
  import { generateNextArray, generatePreviousArray } from './utils';
  export let category: TWalletCategoryConstructor | null;
  export let onConfirm: (walletProvider: TWalletProviderConstructor | null) => void;
  export let onBack: () => void;

  const toastStore = getToastStore();
  let current_provider: TWalletProviderConstructor | null = null;
  let providers: Array<TWalletProviderConstructor> | null = null;

  /** input state */
  let keyword: string = '';
  let current_page: number = 0;
  let display_data: AwaitedArrayData<TWalletProviderConstructor> = {
    metadata: {
      page_ended: false
    },
    data: []
  };
  let max_known_page = 0;

  const select = (provider: TWalletProviderConstructor | null) => {
    current_provider = provider;
  };

  const confirm = () => {
    onConfirm(current_provider);
  };

  const search = async () => {
    const { errorMessage, data } = await baseGetQuery<AwaitedArrayData<TWalletCategoryConstructor>>(
      {
        uri: `/api/wallet/providers?category=${category!.id}&size=5&page=${current_page}${
          keyword ? `&keyword=${keyword}` : ''
        }`,
        server: 'sveltekit'
      }
    );
    if (errorMessage || !data) {
      toastStore.trigger({
        message: errorMessage
          ? errorMessage
          : 'An uncaught error occurred while fetching asset categories',
        background: 'variant-filled-error'
      });
      return;
    }
    display_data = data;
    providers = data.data;
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

<div class="max-w-[648px] m-auto flex flex-col variant-soft-surface p-2 rounded-lg gap-4">
  <h1 class="text-center">
    {t({
      en: 'Tell us about the organization or the instrument in charge.',
      fr: "Parlez-nous de l'organisation ou de l'instrument en charge.",
      de: 'Erzählen Sie uns von der Organisation oder dem zuständigen Instrument.',
      ko: '위탁 기관 또는 지갑 종류에 대해 말해주세요.'
    })}
  </h1>
  <div class="flex justify-center items-center gap-3">
    <div class="flex flex-col items-center justify-center">
      {#if category && categoryIconMap.has(category.id)}
        <svelte:component this={categoryIconMap.get(category.id)} class="w-16 h-16" />
      {/if}
      <span>{category?.display_name}</span>
    </div>
    {#if current_provider}
      <Fa6SolidPlus class="w-8 h-8" />
      <div class="flex flex-col items-center justify-center">
        {#if current_provider.image}
          <div class={clsx('rounded-lg', 'relative p-0 overflow-hidden bg-white')}>
            <img class="w-16 h-16 object-contain" src={current_provider.image} alt="" />
          </div>
        {/if}
        <span>{current_provider.display_name}</span>
      </div>
    {/if}
  </div>
  <form class="flex flex-col variant-soft-surface p-2 rounded-md" on:submit|preventDefault={search}>
    <label class="label" for="input-keyword">{i('asset.provider.label')}</label>
    <div class="w-full inline-flex items-center gap-2">
      <input
        id="input-keyword"
        bind:value={keyword}
        class="input rounded-md"
        type="text"
        placeholder={i(`asset.category.placeholders.${category?.id}`)}
      />
      <button class="btn-icon hover:variant-ghost-surface">
        <MdiMagnify class="w-8 h-8" />
      </button>
    </div>
  </form>
  <div
    class={clsx('flex flex-col variant-soft-surface rounded-md', {
      ['justify-center items-center']: !providers
    })}
  >
    {#if providers}
      {#each providers as provider, _i}
        <button
          type="button"
          class={clsx('flex items-center p-2 rounded-lg gap-2', 'min-h-[48px]', {
            ['variant-filled-surface']: current_provider?.id === provider.id,
            ['hover:variant-soft-surface']: current_provider?.id !== provider.id
          })}
          on:click={() => {
            if (provider.id === current_provider?.id) {
              select(null);
            } else {
              select(provider);
            }
          }}
        >
          {#if provider.image}
            <div
              class={clsx(
                'w-8 h-8',
                'flex items-center flex-shrink-0 justify-center',
                'relative p-0 overflow-hidden bg-white',
                'rounded-lg'
              )}
            >
              <img src={provider.image} alt="" />
            </div>
          {/if}
          {provider.display_name}
        </button>
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
  <button
    class={clsx('btn self-center variant-filled-surface duration-100', {
      ['animate-wiggle hover:animate-none']: Boolean(current_provider)
    })}
    disabled={!current_provider}
    on:click={confirm}>{i('misc.confirm')}</button
  >
  <button class={clsx('btn self-center variant-soft-error duration-100')} on:click={onBack}
    >{i('misc.back')}</button
  >
</div>

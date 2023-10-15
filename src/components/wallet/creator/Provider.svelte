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
  import { FormShell, ListItem, SelectionItem } from '../widgets';
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
        uri: `wallet/providers?category=${category!.id}&size=5&page=${current_page}${
          keyword ? `&keyword=${keyword}` : ''
        }`,
        server: 'sveltekit'
      }
    );
    if (errorMessage || !data) {
      toastStore.trigger({
        message: errorMessage
          ? errorMessage
          : 'An uncaught error occurred while fetching asset providers',
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

<FormShell
  instruction={t({
    en: 'Tell us about the organization or the instrument in charge.',
    fr: "Parlez-nous de l'organisation ou de l'instrument en charge.",
    de: 'Erzählen Sie uns von der Organisation oder dem zuständigen Instrument.',
    ko: '위탁 기관 또는 지갑 종류에 대해 말해주세요.'
  })}
>
  <!-- CURRENT SELECTIONS -->
  <div class="flex justify-center items-center gap-3">
    {#if category}
      <SelectionItem
        label={category.display_name}
        icon={category.icon}
        image={category.image}
        iconClass={'text-surface-800'}
      />
    {/if}
    {#if current_provider}
      <Icon icon="fa6-solid:plus" class="w-8 h-8" />
      <SelectionItem
        label={current_provider.display_name}
        icon={current_provider.icon}
        image={current_provider.image}
      />
    {/if}
  </div>
  <!-- KEYWORD FORM -->
  <form class="flex flex-col variant-soft-surface p-2 rounded-md" on:submit|preventDefault={search}>
    <label class="label" for="input-keyword">{i('provider.form.label')}</label>
    <div class="w-full inline-flex items-center gap-2">
      <input
        id="input-keyword"
        bind:value={keyword}
        class="input rounded-md"
        type="text"
        placeholder={i(`category.form.placeholders.${category?.id}`)}
      />
      <button class="btn-icon hover:variant-ghost-surface">
        <Icon icon="mdi:magnify" class="w-8 h-8" />
      </button>
    </div>
  </form>
  <!-- LIST OF ITEMS -->
  <div
    class={clsx('flex flex-col variant-soft-surface rounded-md', {
      ['justify-center items-center']: !providers
    })}
  >
    {#if providers}
      {#each providers as provider, _i}
        <ListItem
          selected={current_provider?.id === provider.id}
          label={provider.display_name}
          image={provider.image}
          icon={provider.icon}
          onClick={() => {
            if (provider.id === current_provider?.id) {
              select(null);
            } else {
              select(provider);
            }
          }}
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
      ['animate-wiggle hover:animate-none']: Boolean(current_provider)
    })}
    disabled={!current_provider}
    on:click={confirm}>{i('misc.confirm')}</button
  >
  <button
    class={clsx('btn self-center variant-soft-error duration-100', 'min-w-[100px]')}
    on:click={onBack}>{i('misc.back')}</button
  >
</FormShell>

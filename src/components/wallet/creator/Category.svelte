<script lang="ts">
  import { baseGetQuery } from '$lib/axios';
  import { onMount } from 'svelte';
  import { getToastStore } from '@skeletonlabs/skeleton';
  import clsx from 'clsx';
  import { i } from '@inlang/sdk-js';
  import { t } from '$lib/intl';
  import Icon from '@iconify/svelte';
  import { FormShell } from '../widgets';
  export let onConfirm: (walletCategory: TWalletCategoryConstructor | null) => void;

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
      uri: 'wallet/categories',
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

<FormShell
  instruction={t({
    en: 'Tell us about your new wallet.',
    fr: 'Parlez-nous de votre nouveau portefeuille.',
    de: 'Erzählen Sie uns von Ihrer neuen Brieftasche.',
    ko: '지갑의 종류에 대해 말해주세요.'
  })}
>
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
          {#if cat.icon}
            <Icon icon={cat.icon.source} class={clsx('w-16 h-16', cat.icon.class)} />
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
    class={clsx('btn self-center variant-filled-surface duration-100', 'min-w-[100px]', {
      ['animate-wiggle hover:animate-none']: Boolean(current_category)
    })}
    disabled={!current_category}
    on:click={confirm}>{i('misc.confirm')}</button
  >
</FormShell>

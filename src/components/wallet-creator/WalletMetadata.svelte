<script lang="ts">
  import { ProgressRadial, getToastStore } from '@skeletonlabs/skeleton';
  import { FormShell, SelectionItem } from './widgets';
  import { t } from '$lib/intl';
  import Icon from '@iconify/svelte';
  import { i } from '@inlang/sdk-js';
  import clsx from 'clsx';
  export let category: TWalletCategoryConstructor | null;
  export let provider: TWalletProviderConstructor | null;
  export let asset: TWalletAssetConstructor | null;
  export let processing: boolean;
  export let onConfirm: () => void;
  export let onBack: () => void;

  const toastStore = getToastStore();

  let wallet_name: string = '';
  let wallet_balance: number = 0;

  const onSubmit = () => {
    if (processing) return;
    if (!wallet_name.trim()) {
      toastStore.trigger({
        message: `${i('error.required_field')}: ${i('wallet.name.label')}`,
        background: 'variant-filled-error'
      });
      return;
    }
    onConfirm();
  };
</script>

<FormShell
  instruction={t({
    en: 'Tell us about your new wallet.',
    fr: 'Parlez-nous de votre nouveau portefeuille.',
    de: 'Erzählen Sie uns von Ihrer neuen Brieftasche.',
    ko: '지갑의 종류에 대해 말해주세요.'
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
    {#if asset}
      <Icon icon="fa6-solid:plus" class="w-8 h-8" />
      <SelectionItem label={asset.display_name} image={asset.image} icon={asset.icon} />
    {/if}
  </div>
  <!-- KEYWORD FORM -->
  <form
    class="flex flex-col variant-soft-surface p-2 rounded-md"
    on:submit|preventDefault={onSubmit}
  >
    <label class="label" for="input-wallet-name">{i('wallet.name.label')}</label>
    <div class="w-full inline-flex items-center gap-2">
      <input
        id="input-wallet-name"
        bind:value={wallet_name}
        class="input rounded-md"
        type="text"
        placeholder={i('wallet.name.placeholder')}
      />
    </div>
    <label class="label" for="input-wallet-balance">{i('wallet.balance.label')}</label>
    <div class="w-full inline-flex items-center gap-2 mb-2">
      <input
        id="input-wallet-balance"
        bind:value={wallet_balance}
        class="input rounded-md"
        type="text"
      />
    </div>
  </form>
  <button
    type="button"
    class={clsx('btn self-center variant-filled-surface duration-100', 'min-w-[100px]', {
      ['animate-wiggle hover:animate-none']: Boolean(!processing && wallet_name.trim())
    })}
    disabled={processing || !wallet_name.trim()}
    on:click={() => onSubmit()}
    >{#if processing}
      <ProgressRadial
        value={undefined}
        width="w-6"
        meter="stroke-primary-500"
        track="stroke-primary-500/30"
      />
    {:else}
      {i('misc.confirm')}
    {/if}</button
  >
  <button
    class={clsx('btn self-center variant-soft-error duration-100', 'min-w-[100px]')}
    on:click={onBack}>{i('misc.back')}</button
  >
</FormShell>

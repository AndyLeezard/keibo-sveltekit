<script lang="ts">
  import { onMount } from 'svelte';
  import WalletShell from './WalletShell.svelte';
  import { baseGetQuery } from '$lib/axios';
  import Icon from '@iconify/svelte';
  import clsx from 'clsx';
  import { t } from '$lib/intl';
  import { parseWalletRole } from '$lib/parser';

  export let wallet: SerializedWallet;
  let provider: TWalletProviderConstructor | null = null;
  let asset: TWalletAssetMetadata | null = null;
  onMount(async () => {
    const { errorMessage: providerErrorMessage, data: provider_metadata } =
      await baseGetQuery<TWalletProviderConstructor>({
        uri: `wallet/providers/${wallet.provider}`,
        server: 'sveltekit'
      });
    if (providerErrorMessage) {
      console.log(`%c${providerErrorMessage}`, '#ff6464');
      return;
    }
    console.log(provider_metadata);
    if (provider_metadata) {
      provider = provider_metadata;
    }
    if (wallet.category === 'cash' || wallet.category === 'crypto') {
      const { errorMessage: assetErrorMessage, data: asset_metadata } =
        await baseGetQuery<TWalletAssetMetadata>({
          uri: `assets/${wallet.category}/${wallet.asset}`,
          server: 'sveltekit'
        });
      if (assetErrorMessage) {
        console.log(`%c${assetErrorMessage}`, '#ff6464');
        return;
      }
      console.log(asset_metadata);
      if (asset_metadata) {
        asset = asset_metadata;
      }
    }
  });
</script>

<WalletShell>
  <svelte:fragment slot="provider-image">
    {#if provider && provider.icon}
      <Icon class={clsx('w-full h-full', provider.icon.class)} icon={provider.icon.source} />
    {:else if provider && provider.image}
      <div class="w-full h-full p-1 bg-white">
        <img
          class="w-full h-full"
          src={provider.image}
          alt={provider.display_name}
          title={provider.display_name}
        />
      </div>
    {:else}
      <span class="w-full h-full placeholder animate-pulse" />
    {/if}
  </svelte:fragment>
  <svelte:fragment slot="provider">
    <span>{provider?.display_name}</span>
  </svelte:fragment>
  <svelte:fragment slot="asset-image">
    {#if asset && asset.icon}
      <Icon class={clsx('w-full h-full', asset.icon.class)} icon={asset.icon.source} />
    {:else if asset && asset.image}
      <div class="w-full h-full p-1 bg-white">
        <img
          class="w-full h-full"
          src={asset.image}
          alt={asset.display_name}
          title={asset.display_name}
        />
      </div>
    {:else}
      <span class="w-full h-full placeholder animate-pulse" />
    {/if}
  </svelte:fragment>
  <svelte:fragment slot="asset">
    <span>{asset?.display_name}</span>
  </svelte:fragment>
  <svelte:fragment slot="asset-category">
    <span>{wallet.category}</span>
  </svelte:fragment>
  <svelte:fragment slot="role">
    <span>{t(parseWalletRole(wallet.role))}</span>
  </svelte:fragment>
  <svelte:fragment slot="name">
    <span>{wallet.name}</span>
  </svelte:fragment>
  <svelte:fragment slot="valuation">
    <div class="flex flex-col">
      <span>{wallet.balance}{asset?.symbol ? asset.symbol.toUpperCase() : ''}</span>
      <span class="text-sm">({wallet.val_usd} in USD)</span>
    </div>
  </svelte:fragment>
  <svelte:fragment slot="public">
    {#if wallet.is_public}
      <Icon class="w-6 h-6" icon="uil:cloud-unlock" />
    {:else}
      <Icon class="w-6 h-6 text-red-300" icon="uil:cloud-lock" />
    {/if}
  </svelte:fragment>
</WalletShell>

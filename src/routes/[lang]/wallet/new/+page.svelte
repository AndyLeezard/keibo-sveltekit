<script lang="ts">
  import { getToastStore } from '@skeletonlabs/skeleton';
  import { countNonNullValues } from '$lib/ts-utils';
  import { Asset, Category, Provider, WalletMetadata } from '$components/wallet-creator';
  import { basePostQuery } from '$lib/axios';
  import { i } from '@inlang/sdk-js';
  import { navigateTo } from '$lib/routes';

  let confirmed_category: TWalletCategoryConstructor | null = null;
  let confirmed_provider: TWalletProviderConstructor | null = null;
  let confirmed_asset: TWalletAssetConstructor | null = null;
  let creation_processing: boolean = false;

  const toastStore = getToastStore();

  $: step = countNonNullValues({
    confirmed_category,
    confirmed_provider,
    confirmed_asset
  });

  const create_wallet = async ({
    wallet_name,
    wallet_balance
  }: {
    wallet_name: string;
    wallet_balance: number;
  }) => {
    creation_processing = true;
    if (!confirmed_provider || !confirmed_category || !confirmed_asset) {
      const field = !confirmed_provider
        ? 'provider'
        : !confirmed_category
        ? 'category'
        : !confirmed_asset
        ? 'asset'
        : 'unknown';
      toastStore.trigger({
        message: `${i('error.required_field')}: ${field}`,
        background: 'variant-filled-error'
      });
      creation_processing = false;
      return;
    }
    const payload: Partial<SerializedWallet> = {
      provider: confirmed_provider.id,
      category: confirmed_category.id,
      asset: confirmed_asset.id,
      balance: wallet_balance,
      name: wallet_name,
      is_public: false
    };
    const uri = '/wallet/';
    const { errorMessage, data } = await basePostQuery<{ id: string }>({
      uri,
      payload
    });
    creation_processing = false;
    if (errorMessage) {
      toastStore.trigger({
        message: errorMessage,
        background: 'variant-filled-error'
      });
      return;
    }
    if (data?.id) {
      navigateTo(`wallet/${data.id}`);
    }
  };
</script>

<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<svelte:head>
  <title>Keibo - new wallet</title>
</svelte:head>
<div class="flex flex-1 flex-col">
  <div class="inline-flex p-2">
    <h1 class="text-3xl font-bold">New wallet</h1>
  </div>
  <div class="m-auto p2 flex flex-col">
    {#if step === 0}
      <Category
        onConfirm={(cat) => {
          confirmed_category = cat;
        }}
      />
    {:else if step === 1}
      <Provider
        category={confirmed_category}
        onConfirm={(provider) => {
          confirmed_provider = provider;
        }}
        onBack={() => {
          confirmed_category = null;
        }}
      />
    {:else if step === 2}
      <Asset
        category={confirmed_category}
        provider={confirmed_provider}
        onConfirm={(asset) => {
          confirmed_asset = asset;
        }}
        onBack={() => {
          confirmed_provider = null;
        }}
      />
    {:else if step === 3}
      <WalletMetadata
        category={confirmed_category}
        provider={confirmed_provider}
        asset={confirmed_asset}
        processing={creation_processing}
        onConfirm={create_wallet}
        onBack={() => {
          confirmed_asset = null;
        }}
      />
    {/if}
    <span class="text-center self-center mt-2 text-surface-800-100-token">{step + 1}/4</span>
  </div>
</div>

<script lang="ts">
  import { countNonNullValues, sleep } from '$lib/ts-utils';
  import { Asset, Category, Provider, WalletMetadata } from '$components/wallet-creator';

  let confirmed_category: TWalletCategoryConstructor | null = null;
  let confirmed_provider: TWalletProviderConstructor | null = null;
  let confirmed_asset: TWalletAssetConstructor | null = null;
  let creation_processing: boolean = false;

  $: step = countNonNullValues({
    confirmed_category,
    confirmed_provider,
    confirmed_asset
  });

  const create_wallet = async () => {
    creation_processing = true;
    console.log('Unimplemented: create_wallet');
    await sleep(1000);
    /** TODO: Implement Wallet Creation Submit */
    creation_processing = false;
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

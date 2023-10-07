<script lang="ts">
  import { countNonNullValues } from '$lib/ts-utils';
  import { Category, Provider } from '$components/wallet-creator';

  let confirmed_category: TWalletCategoryConstructor | null = null;
  let confirmed_provider: TWalletProviderConstructor | null = null;
  let confirmed_asset: TWalletAssetConstructor | null = null;

  $: step = countNonNullValues({
    confirmed_category,
    confirmed_provider,
    confirmed_asset
  });
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
    {:else}
      <!-- else content here -->
    {/if}
    <span class="text-center self-center mt-2 text-surface-800-100-token">{step + 1}/4</span>
  </div>
</div>

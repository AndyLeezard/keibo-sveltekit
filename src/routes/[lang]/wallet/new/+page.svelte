<script lang="ts">
  import { countNonNullValues } from '$lib/ts-utils';
  import Category from '$components/wallet-creator/Category.svelte';

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
  <div class="flex flex-1 p2">
    {#if step === 0}
      <Category
        onConfirm={(cat) => {
          confirmed_category = cat;
        }}
      />
    {:else}
      <!-- else content here -->
    {/if}
  </div>
  <code class="code m-auto">TODO : New wallet</code>
</div>

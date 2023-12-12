<script lang="ts">
  import Icon from '@iconify/svelte';
  import TransactionShell from './TransactionShell.svelte';
  import { dev } from '$app/environment';
  export let transaction: SerializedTransaction;
  export let wallet_id: string;

  if (dev) {
    console.log(wallet_id);
  }
</script>

<TransactionShell>
  <svelte:fragment slot="executed_at">
    {new Date(transaction.executed_at).toLocaleDateString()}
    {new Date(transaction.executed_at).toLocaleTimeString()}
  </svelte:fragment>
  <svelte:fragment slot="settled_at">
    {new Date(transaction.settled_at).toLocaleDateString()}
    {new Date(transaction.settled_at).toLocaleTimeString()}
  </svelte:fragment>
  <svelte:fragment slot="category-image">
    <Icon icon="fluent-mdl2:tag-unknown" />
  </svelte:fragment>
  <svelte:fragment slot="category">
    {transaction.category}
  </svelte:fragment>
  <svelte:fragment slot="counterparty">
    {transaction.counterparty}
  </svelte:fragment>
  <svelte:fragment slot="description">
    {transaction.description}
  </svelte:fragment>
  <svelte:fragment slot="amount">
    {transaction.amount}
  </svelte:fragment>
  <svelte:fragment slot="tags">
    {transaction.tags}
  </svelte:fragment>
</TransactionShell>

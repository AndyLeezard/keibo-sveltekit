<script lang="ts">
  import { onMount } from 'svelte';
  import Icon from '@iconify/svelte';
  import TransactionShell from './TransactionShell.svelte';
  import { baseGetQuery } from '$lib/axios';
  export let transaction: SerializedTransaction;
  export let wallet_id: string;
  let description = transaction.description;
  let recipient: SerializedUser | null = null;
  let sender: SerializedUser | null = null;
  let i_am_the_sender = 'recipient' in transaction && transaction.recipient === wallet_id;
  let i_am_the_recipient = 'sender' in transaction && transaction.sender === wallet_id;
  onMount(async () => {
    if (!description) {
      description = '';
    }
    const original_description = description;
    if (i_am_the_sender) {
      // I am expending the money
      if ('recipient' in transaction) {
        // To another keibo-registered account
        description = 'Wired to';
        const { errorMessage, data } = await baseGetQuery<SerializedUser>({
          uri: `wallet/get_owner/${transaction.recipient}/`,
          server: 'sveltekit'
        });
        if (errorMessage) {
          console.log(`%c${errorMessage}`, '#ff6464');
        }
        if (data) {
          recipient = data;
          description += ` ${data.first_name} ${data.last_name}`;
        }
      } else {
        description = 'Spent';
      }
    }
    if (i_am_the_recipient) {
      // I am receiving the money
      if ('sender' in transaction) {
        // from another keibo-registered account
        description = 'Wired from';
        const { errorMessage, data } = await baseGetQuery<SerializedUser>({
          uri: `wallet/get_owner/${transaction.sender}/`,
          server: 'sveltekit'
        });
        if (errorMessage) {
          console.log(`%c${errorMessage}`, '#ff6464');
        }
        if (data) {
          sender = data;
          description += ` ${data.first_name} ${data.last_name}`;
        }
      } else {
        description = 'Earned';
      }
    }
    description += ` - ${original_description}`;
  });
</script>

<TransactionShell>
  <svelte:fragment slot="category-image">
    <Icon icon="fluent-mdl2:tag-unknown" />
  </svelte:fragment>
  <svelte:fragment slot="category">
    {transaction.category}
  </svelte:fragment>
  <svelte:fragment slot="description">
    {description}
  </svelte:fragment>
  <svelte:fragment slot="amount">
    {i_am_the_sender ? transaction.gross_amount : transaction.net_amount}
  </svelte:fragment>
  <svelte:fragment slot="fee">
    {transaction.transaction_fee}
    {i_am_the_sender ? '(included)' : '(excluded)'}
  </svelte:fragment>
  <svelte:fragment slot="date">
    {new Date(transaction.date).toLocaleDateString()}
    {new Date(transaction.date).toLocaleTimeString()}
  </svelte:fragment>
</TransactionShell>

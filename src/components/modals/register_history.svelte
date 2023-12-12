<script lang="ts">
  import { getModalStore } from '@skeletonlabs/skeleton';
  import Shell from './shell.svelte';
  import { formatDate } from '$lib/ts-utils';
  // import clsx from 'clsx';

  // const modalStore = getModalStore();
  const submitHistory = () => {};
  let transaction_date = formatDate(new Date());
  /* let category = {
    
  } */
</script>

<Shell dismiss_button_text="Cancel">
  <form on:submit|preventDefault={submitHistory}>
    <label class="label" for="input-keyword">When did the transaction occur?</label>
    <div class="w-full inline-flex items-center gap-2">
      <input
        id="input-keyword"
        bind:value={transaction_date}
        class="input rounded-md"
        type="datetime-local"
        step="1"
      />
    </div>
    <label class="label" for="input-keyword">What was the purpose?</label>
    <div class="w-full inline-flex items-center gap-2">
      <input
        id="input-keyword"
        bind:value={transaction_date}
        class="input rounded-md"
        type="datetime-local"
        step="1"
      />
    </div>
  </form>
</Shell>

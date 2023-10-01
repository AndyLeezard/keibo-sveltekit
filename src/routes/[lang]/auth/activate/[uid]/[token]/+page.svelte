<script lang="ts">
  import { activateAccount } from '$lib/derived/auth';
  import { navigateTo } from '$lib/routes.js';
  import { t } from '$lib/intl.js';
  import { getToastStore } from '@skeletonlabs/skeleton';
  import { onMount } from 'svelte';

  export let data;
  const toastStore = getToastStore();
  let error: null | string = null;
  onMount(async () => {
    const { statusCode, errorMessage } = await activateAccount(data);
    if (`${statusCode}`.startsWith('2')) {
      navigateTo('auth/signin?activate=true');
      return;
    }
    if (errorMessage) {
      error = errorMessage ? errorMessage : 'An uncaught error occurred while activating account';
      toastStore.trigger({
        message: error,
        background: 'variant-filled-error'
      });
      return;
    }
  });
</script>

<div class="container h-full m-auto flex justify-center items-center">
  <div class="card p-4 flex flex-col items-center gap-2 animate-pulse">
    {#if error}
      <span>
        {error}
      </span>
    {:else}
      <span>
        {t({
          en: 'Activating your account...',
          fr: "En cours d'activation de votre compte...",
          ko: '계정 인증 처리중...',
          de: 'Aktivieren Sie Ihr Konto ...'
        })}
      </span>
    {/if}
  </div>
</div>

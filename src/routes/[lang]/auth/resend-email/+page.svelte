<script lang="ts">
  import { resendVerificationEmail } from '$lib/derived/auth.js';
  import { navigateTo } from '$lib/routes.js';
  import { t } from '$lib/trad';
  import { i } from '@inlang/sdk-js';
  import { ProgressRadial, focusTrap, getToastStore } from '@skeletonlabs/skeleton';
  export let data;
  const toastStore = getToastStore();
  let email: string = data.email ?? '';
  let processing = false;

  let isFocused = true;
  const sendEmail = async () => {
    if (processing) return;
    processing = true;
    const email_resend_res = await resendVerificationEmail({ email });
    processing = false;
    if (email_resend_res.statusCode === 204) {
      navigateTo('/auth/signin?register=true');
      return;
    }
    if (email_resend_res.errorMessage) {
      toastStore.trigger({
        message: email_resend_res.errorMessage
          ? email_resend_res.errorMessage
          : 'An uncaught error occurred while re-sending a verification email.',
        background: 'variant-filled-error'
      });
      return;
    }
  };
</script>

<div class="container h-full mx-auto flex justify-center items-center">
  <form
    use:focusTrap={isFocused}
    class="card p-4 w-[400px] text-token space-y-4"
    on:submit|preventDefault={sendEmail}
  >
    <h2 class="text-center text-xl sm:text-2xl font-bold leading-9 tracking-tight">
      {t({
        en: 'Re-send a verification email',
        fr: 'Renvoyez un mail de vérification',
        ko: '계정 인증 이메일 재발송',
        de: 'Senden Sie eine Überprüfungs-E-Mail erneut'
      })}
    </h2>
    <label class="label">
      <span>{t({ en: 'Email', ko: '메일 주소' })}</span>
      <input bind:value={email} class="input" type="email" placeholder="example@keibo.app" />
    </label>
    <button type="submit" disabled={processing} class="btn variant-filled-surface w-full">
      {#if processing}
        <ProgressRadial
          value={undefined}
          width="w-6"
          meter="stroke-primary-500"
          track="stroke-primary-500/30"
        />
      {:else}
        <span class="font-semibold">{i('misc.confirm')}</span>
      {/if}
    </button>
  </form>
</div>

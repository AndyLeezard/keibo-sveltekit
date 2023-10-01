<script lang="ts">
  import { ProgressRadial, focusTrap, getToastStore } from '@skeletonlabs/skeleton';
  import { t } from '$lib/intl';
  import { checkUser, requestPasswordReset } from '$lib/derived/auth';
  import { navigateTo } from '$lib/routes';
  import { i } from '@inlang/sdk-js';
  // let display_pw = false;
  const toastStore = getToastStore();
  let processing = false;
  let isFocused: boolean = true;
  let email = '';

  const onSubmit = async () => {
    if (processing) return;
    processing = true;
    const check_user_res = await checkUser(email);
    if (check_user_res.errorMessage || !check_user_res.data) {
      toastStore.trigger({
        message: check_user_res.errorMessage
          ? check_user_res.errorMessage
          : 'An uncaught error occurred while checking user',
        background: 'variant-filled-error'
      });
      processing = false;
      return;
    }
    if (!check_user_res.data.exists) {
      toastStore.trigger({
        message: i('auth.no_active_account'),
        background: 'variant-filled-error'
      });
      processing = false;
      return;
    }
    const password_reset_res = await requestPasswordReset({ email });
    processing = false;
    if (password_reset_res.statusCode === 204) {
      navigateTo('/auth/signin?reset-pw-request=true');
      return;
    }
    if (password_reset_res.errorMessage) {
      toastStore.trigger({
        message: password_reset_res.errorMessage
          ? password_reset_res.errorMessage
          : 'An uncaught error occurred while requesting a password reset',
        background: 'variant-filled-error'
      });
      return;
    }
  };
</script>

<svelte:head>
  <title>Keibo - password recovery</title>
</svelte:head>
<div class="container h-full m-auto flex justify-center items-center">
  <form
    use:focusTrap={isFocused}
    class="card variant-form-material p-4 w-[400px] text-token space-y-4 border-b-0"
    on:submit|preventDefault={onSubmit}
  >
    <h2 class="text-center text-xl sm:text-2xl font-bold leading-9 tracking-tight">
      {t({
        en: 'Reset your password',
        fr: 'Réinitialiser le mot de passe',
        ko: '패스워드 재설정',
        de: 'Setze dein Passwort zurück'
      })}
    </h2>
    <label class="label">
      <span>{t({ en: 'Email', ko: '메일 주소' })}</span>
      <input
        disabled={processing}
        bind:value={email}
        class="input"
        type="email"
        placeholder="example@keibo.app"
      />
    </label>
    <button disabled={processing} type="submit" class="btn variant-filled-surface w-full">
      {#if processing}
        <ProgressRadial
          value={undefined}
          width="w-6"
          meter="stroke-primary-500"
          track="stroke-primary-500/30"
        />
      {:else}<span class="text-slate-800 dark:text-slate-200 font-semibold"
          >{t({
            en: 'Request email verification',
            fr: 'Demander la vérification par mail',
            ko: '인증 이메일 받기',
            de: 'Fordern Sie eine E-Mail-Bestätigung an'
          })}</span
        >
      {/if}
    </button>
  </form>
</div>

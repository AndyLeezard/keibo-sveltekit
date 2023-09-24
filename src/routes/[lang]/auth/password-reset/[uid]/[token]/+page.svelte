<script lang="ts">
  import { confirmPasswordReset } from '$lib/derived/auth.js';
  import { navigateTo } from '$lib/routes.js';
  import { t } from '$lib/trad.js';
  import { i } from '@inlang/sdk-js';
  import { getToastStore, focusTrap, ProgressRadial } from '@skeletonlabs/skeleton';
  export let data;
  const { uid, token } = data;
  const toastStore = getToastStore();
  let isFocused = true;
  let password = '';
  let re_password = '';
  let processing = false;

  let error: null | string = null;
  const onRequest = async () => {
    if (processing) return;
    processing = true;
    const new_password = password.replace(' ', '');
    const re_new_password = re_password.replace(' ', '');
    if (new_password !== re_new_password) {
      toastStore.trigger({
        message: t({
          en: 'The password does not match its confirmation',
          fr: "Le mot de passe ne correspond pas à sa confirmation'",
          ko: '패스워드 재확인이 일치하지 않습니다.',
          de: 'Das Passwort stimmt nicht mit seiner Bestätigung überein.'
        }),
        background: 'variant-filled-error'
      });
      processing = false;
      return;
    }
    const { statusCode, errorMessage } = await confirmPasswordReset({
      uid,
      token,
      new_password,
      re_new_password
    });
    if (`${statusCode}`.startsWith('2')) {
      navigateTo('auth/signin?reset-pw-confirm=true');
      return;
    }
    if (errorMessage) {
      error = errorMessage
        ? errorMessage
        : 'An uncaught error occurred while requesting a password reset';
      toastStore.trigger({
        message: error,
        background: 'variant-filled-error'
      });
      processing = false;
      return;
    }
  };
</script>

<svelte:head>
  <title>Keibo - new password</title>
</svelte:head>
<div class="container h-full mx-auto flex justify-center items-center">
  <form
    use:focusTrap={isFocused}
    class="card variant-form-material p-4 w-[400px] text-token space-y-4 border-b-0"
    on:submit|preventDefault={onRequest}
  >
    <h2 class="text-center text-xl sm:text-2xl font-bold leading-9 tracking-tight">
      {t({
        en: 'New password',
        fr: 'Nouveau mot de passe',
        ko: '새로운 패스워드 설정',
        de: 'Neues Kennwort'
      })}
    </h2>
    <label class="label relative">
      <span>{i('auth.password')}</span>
      <!-- type={display_pw ? 'text' : 'password'} -->
      <input
        disabled={processing}
        bind:value={password}
        class="input pr-[72px]"
        type="password"
        placeholder="********"
      />
      <!-- <button
      type="button"
      class="btn pt-0 pb-0 pl-2 pr-2 w-[56px] text-sm variant-filled-surface absolute right-3 top-1/2"
      on:click={(e) => {
        e.preventDefault();
        e.stopPropagation();
        display_pw = !display_pw;
      }}
    >
      {i(display_pw ? 'auth.hide' : 'auth.view')}
    </button> -->
    </label>
    <label class="label relative">
      <span>{i('auth.password_confirm')}</span>
      <input
        disabled={processing}
        bind:value={re_password}
        class="input pr-[72px]"
        type="password"
        placeholder="********"
      />
      <!-- <button
      type="button"
      class="btn pt-0 pb-0 pl-2 pr-2 w-[56px] text-sm variant-filled-surface absolute right-3 top-1/2"
      on:click={(e) => {
        e.preventDefault();
        e.stopPropagation();
        display_pw = !display_pw;
      }}
    >
      {i(display_pw ? 'auth.hide' : 'auth.view')}
    </button> -->
    </label>
    <button disabled={processing} type="submit" class="btn variant-filled-surface w-full">
      {#if processing}
        <ProgressRadial
          value={undefined}
          width="w-6"
          meter="stroke-primary-500"
          track="stroke-primary-500/30"
        />
      {:else}
        <span class="text-slate-800 dark:text-slate-200 font-semibold">{i('misc.confirm')}</span>
      {/if}
    </button>
  </form>
</div>

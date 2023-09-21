<script lang="ts">
  import { i } from '@inlang/sdk-js';
  import { focusTrap } from '@skeletonlabs/skeleton';
  import { Link } from '$components/util';
  import { t } from '$lib/trad';
  import { user } from '$stores/auth';
  // let display_pw = false;
  let isFocused: boolean = true;
  let email = '';

  const onSubmit = async () => {
    // TODO: Implement password recovery logic here
  };
</script>

<svelte:head>
  <title>Keibo - password recovery</title>
</svelte:head>
<div class="container h-full mx-auto flex justify-center items-center">
  <form
    use:focusTrap={isFocused}
    class="card variant-form-material p-4 w-[400px] text-token space-y-4 border-b-0"
    on:submit|preventDefault={onSubmit}
  >
    <h2 class="text-center text-xl sm:text-2xl font-bold leading-9 tracking-tight">
      {t({
        en: "Reset your password",
        fr: "Réinitialiser le mot de passe",
        ko: "비밀번호 재설정",
        de: "Setze dein Passwort zurück"
      })}
    </h2>
    <label class="label">
      <span>{t({ en: 'Email', ko: '메일 주소' })}</span>
      <input bind:value={email} class="input" type="email" placeholder="example@keibo.app" />
    </label>
    <button
      type="submit"
      class="btn bg-slate-400 dark:bg-slate-500 flex w-full justify-center items-center"
    >
      <span class="text-slate-800 dark:text-slate-200 font-semibold"
        >{t({
          en: 'Request email verification',
          fr: 'Demander la vérification par mail',
          ko: '인증 이메일 받기',
          de: 'Fordern Sie eine E-Mail-Bestätigung an'
        })}</span
      >
    </button>
  </form>
</div>

<style lang="postcss">
</style>

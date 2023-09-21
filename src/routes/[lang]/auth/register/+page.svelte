<script lang="ts">
  import { i } from '@inlang/sdk-js';
  import { focusTrap } from '@skeletonlabs/skeleton';
  import Google from 'virtual:icons/devicon/google';
  import Github from 'virtual:icons/devicon/github';
  import { Link } from '$components/util';
  import { user } from '$stores/auth';
  import { t } from '$lib/trad';
  let isFocused: boolean = true;
  let email = '';
  let password = '';
  let passwordConfirm = '';

  const register = async () => {
    // TODO: Implement registration logic here
  };
</script>

<svelte:head>
  <title>Keibo - register</title>
</svelte:head>
<div class="container h-full mx-auto flex justify-center items-center">
  <form
    use:focusTrap={isFocused}
    class="card p-4 w-[400px] text-token space-y-4"
    on:submit|preventDefault={register}
  >
    <label class="label">
      <span>Email</span>
      <input bind:value={email} class="input" type="email" placeholder="example@keibo.app" />
    </label>
    <label class="label relative">
      <span>Password</span>
      <!-- type={display_pw ? 'text' : 'password'} -->
      <input
        bind:value={password}
        class="input pr-[72px]"
        type='password'
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
      <span>Password confirm</span>
      <input
        bind:value={passwordConfirm}
        class="input pr-[72px]"
        type='password'
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
    <button
      type="submit"
      class="btn bg-slate-400 dark:bg-slate-500 flex w-full justify-center items-center"
    >
      <span class="text-slate-800 dark:text-slate-200 font-semibold">Register</span>
    </button>
    <p class="text-center text-sm text-gray-600 dark:text-gray-300">
      {t({
        en: "Do you already have an account?",
        fr: "Vous avez déjà un compte ?",
        ko: '계정이 이미 있으신가요?',
        de: 'Haben Sie bereits ein Konto?'
      })}
      &nbsp;&nbsp;&nbsp;
      <Link
        href="/auth/signin"
        className="font-bold leading-6 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
      >
        {i("auth.signin")}
      </Link>
    </p>
    <hr
      class="h-[2px] border-t-0 bg-transparent bg-gradient-to-r from-transparent via-slate-500 to-transparent opacity-100"
    />
    <button
      type="button"
      class="btn bg-slate-400 dark:bg-slate-500 flex w-full justify-center items-center"
    >
      <Google class="w-6 h-6" />
      <span class="text-slate-800 dark:text-slate-50 font-semibold"
        >{t({
          en: 'With Google',
          fr: 'Avec Google',
          ko: 'Google 로그인',
          de: 'Mit Google'
        })}</span
      >
    </button>
    <button
      type="button"
      class="btn bg-slate-400 dark:bg-slate-500 flex w-full justify-center items-center"
    >
      <Github class="w-6 h-6" />
      <span class="text-slate-800 dark:text-slate-50 font-semibold"
        >{t({
          en: 'With Github',
          fr: 'Inscrivez-vous ici',
          ko: 'Github 로그인',
          de: 'Mit Github'
        })}</span
      >
    </button>
  </form>
</div>

<style lang="postcss">
</style>

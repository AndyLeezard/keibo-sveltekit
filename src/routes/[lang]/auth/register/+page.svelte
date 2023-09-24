<script lang="ts">
  import { i } from '@inlang/sdk-js';
  import { focusTrap, getToastStore } from '@skeletonlabs/skeleton';
  import Google from 'virtual:icons/devicon/google';
  import Github from 'virtual:icons/devicon/github';
  import { Link } from '$components/util';
  import { user } from '$stores/auth';
  import { t } from '$lib/trad';
  import { registerUser } from '$lib/derived/auth';
  import { navigateTo } from '$lib/routes';
  let isFocused: boolean = true;
  let first_name = '';
  let last_name = '';
  let email = '';
  let password = '';
  let re_password = '';
  let processing = false;

  const toastStore = getToastStore();
  const register = async () => {
    if (processing) return;
    processing = true;
    const { errorMessage, statusCode, data } = await registerUser({
      first_name,
      last_name,
      email,
      password,
      re_password
    });
    processing = false;
    if (errorMessage || !data) {
      toastStore.trigger({
        message: errorMessage ? `${errorMessage} while creating JWT tokens.` : 'Uncaught error',
        background: 'variant-filled-error'
      });
      return;
    }
    if (data) {
      navigateTo('/auth/signin?register=true');
    }
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
    <h2 class="text-center text-xl sm:text-2xl font-bold leading-9 tracking-tight">
      {t({
        en: 'Create a new account',
        fr: 'Créer un nouveau compte',
        ko: '새로운 계정',
        de: 'Ein neues Konto erstellen'
      })}
    </h2>
    <label class="label">
      <span>{i('auth.first_name')}</span>
      <input
        bind:value={first_name}
        class="input"
        type="text"
        placeholder={t({
          en: 'John',
          fr: 'Michel', // Jean
          ko: '길동',
          de: 'Max'
        })}
      />
    </label>
    <label class="label">
      <span>{i('auth.last_name')}</span>
      <input
        bind:value={last_name}
        class="input"
        type="text"
        placeholder={t({
          en: 'Smith',
          fr: 'Douceur', // Dupont
          ko: '홍',
          de: 'Mustermann'
        })}
      />
    </label>
    <label class="label">
      <span
        >{t({
          en: 'Email',
          ko: '이메일'
        })}</span
      >
      <input bind:value={email} class="input" type="email" placeholder="example@keibo.app" />
    </label>
    <label class="label relative">
      <span>{i('auth.password')}</span>
      <!-- type={display_pw ? 'text' : 'password'} -->
      <input bind:value={password} class="input pr-[72px]" type="password" placeholder="********" />
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
    <button
      type="submit"
      class="btn variant-filled-surface w-full"
    >
      <span class="text-slate-800 dark:text-slate-200 font-semibold">{i('auth.signup')}</span>
    </button>
    <p class="text-center text-sm text-gray-600 dark:text-gray-300">
      {t({
        en: 'Do you already have an account?',
        fr: 'Vous avez déjà un compte ?',
        ko: '계정이 이미 있으신가요?',
        de: 'Haben Sie bereits ein Konto?'
      })}
      &nbsp;&nbsp;&nbsp;
      <Link
        href="/auth/signin"
        className="font-bold leading-6 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
      >
        {i('auth.signin')}
      </Link>
    </p>
    <hr
      class="h-[2px] border-t-0 bg-transparent bg-gradient-to-r from-transparent via-slate-500 to-transparent opacity-100"
    />
    <button
      type="button"
      class="btn variant-filled-surface w-full"
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
      class="btn variant-filled-surface w-full"
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

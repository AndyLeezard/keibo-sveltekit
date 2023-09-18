<script lang="ts">
  import { i } from '@inlang/sdk-js';
  import { focusTrap } from '@skeletonlabs/skeleton';
  import Google from 'virtual:icons/devicon/google';
  import Github from 'virtual:icons/devicon/github';
  import { Link } from '$components/util';
  import { t } from '$lib/trad';
  let display_pw = false;
  let isFocused: boolean = true;
</script>

<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<svelte:head>
  <title>Keibo - authentification</title>
</svelte:head>
<div class="container h-full mx-auto flex justify-center items-center">
  <form
    use:focusTrap={isFocused}
    class="card variant-form-material p-4 w-[400px] text-token space-y-4 border-b-0"
    action=""
  >
    <h2 class="text-center text-xl sm:text-2xl font-bold leading-9 tracking-tight">
      {t({
        en: 'Sign in to your account',
        fr: 'Connectez-vous à votre compte',
        ko: '당신의 계정에 연결하세요',
        de: 'Melden Sie sich bei Ihrem Konto an'
      })}
    </h2>
    <label class="label">
      <span>
        {t({
          en: 'Email',
          ko: '메일 주소'
        })}
      </span>
      <input class="input" type="text" placeholder="example@keibo.app" />
    </label>
    <label class="label relative">
      <div class="flex justify-between">
        <span>{i('auth.password')}</span>
        <Link href="auth/register" className="mr-2"
          >{t({
            en: 'Recovery',
            fr: 'Retrouver',
            de: 'Vergessen?',
            ko: '되찾기'
          })}</Link
        >
      </div>
      <input
        class="input pr-[72px]"
        type={display_pw ? 'text' : 'password'}
        placeholder="********"
      />
      <button
        type="button"
        class="btn pt-0 pb-0 pl-2 pr-2 w-[56px] text-sm variant-filled-surface absolute right-3 top-1/2"
        on:click={(e) => {
          e.preventDefault();
          e.stopPropagation();
          display_pw = !display_pw;
        }}
      >
        {i(display_pw ? 'auth.hide' : 'auth.view')}
      </button>
    </label>
    <p class="text-center text-sm text-gray-600 dark:text-gray-300">
      {t({
        en: "Don't have an account?",
        fr: "Vous n'avez pas de compte ?",
        ko: '계정이 없으신가요?',
        de: 'Sie haben noch kein Konto?'
      })}
      &nbsp;&nbsp;&nbsp;
      <Link
        href="/auth/register"
        className="font-bold leading-6 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
      >
        {t({
          en: 'Sign up',
          fr: 'Inscrivez-vous ici',
          ko: '회원가입하기',
          de: 'Melden Sie sich an'
        })}
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

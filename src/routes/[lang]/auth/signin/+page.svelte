<script lang="ts">
  import { i } from '@inlang/sdk-js';
  import { ProgressRadial, focusTrap, getToastStore } from '@skeletonlabs/skeleton';
  import { goto } from '$app/navigation';
  import Google from 'virtual:icons/devicon/google';
  import Github from 'virtual:icons/devicon/github';
  import { Link } from '$components/util';
  import { t } from '$lib/trad';
  import { user } from '$stores/auth';
  import { oAuthLogin, jwtCreate, getClientUser } from '$lib/derived/auth';
  import { navigateTo } from '$lib/routes';

  const toastStore = getToastStore();
  // let display_pw = false;
  let isFocused: boolean = true;
  let email = '';
  let password = '';
  let processing = false;

  const login = async () => {
    if (processing) return;
    processing = true;
    const jwt_res = await jwtCreate({
      email,
      password
    });
    processing = false;
    if (jwt_res.networkError || !jwt_res.data) {
      toastStore.trigger({
        message: jwt_res.networkError
          ? `Network error occurred ${
              jwt_res.statusCode
                ? `with status Code: ${jwt_res.statusCode} while creating JWT tokens.`
                : ''
            }`
          : !jwt_res.data
          ? 'Uncaught error'
          : '',
        // Provide any utility or variant background style:
        background: 'variant-filled-error'
      });
      return;
    }
    const user_res = await getClientUser();
    if (user_res.networkError || !user_res.data) {
      toastStore.trigger({
        message: jwt_res.networkError
          ? `Network error occurred ${
              user_res.statusCode
                ? `with status Code: ${user_res.statusCode} while fetching user data.`
                : ''
            }`
          : !jwt_res.data
          ? 'Uncaught error'
          : '',
        // Provide any utility or variant background style:
        background: 'variant-filled-error'
      });
      return;
    }
    user.set(user_res.data);
    navigateTo('/my/dashboard');
  };
  const socialLogin = async (provider: string) => {
    if (processing) return;
    processing = true;
    const { statusCode, networkError, data } = await oAuthLogin(provider);
    processing = false;
    if (networkError || !data?.authorization_url) {
      toastStore.trigger({
        message: networkError
          ? `Network error occurred ${
              statusCode ? `with status Code: ${statusCode} while creating JWT tokens.` : ''
            }`
          : !data
          ? 'Uncaught error'
          : '',
        // Provide any utility or variant background style:
        background: 'variant-filled-error'
      });
      return;
    }
    goto(data.authorization_url);
  };
</script>

<svelte:head>
  <title>Keibo - authentification</title>
</svelte:head>
<div class="container h-full mx-auto flex justify-center items-center">
  <form
    use:focusTrap={isFocused}
    class="card variant-form-material p-4 w-[400px] text-token space-y-4 border-b-0"
    on:submit|preventDefault={login}
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
      <span>{t({ en: 'Email', ko: '메일 주소' })}</span>
      <input bind:value={email} class="input" type="email" placeholder="example@keibo.app" />
    </label>
    <label class="label relative">
      <div class="flex justify-between">
        <span>{i('auth.password')}</span>
        <Link href="auth/password-reset" className="mr-2">
          {t({ en: 'Recovery', fr: 'Retrouver', de: 'Vergessen?', ko: '되찾기' })}
        </Link>
      </div>
      <!-- type={display_pw ? 'text' : 'password'} -->
      <input bind:value={password} class="input pr-[72px]" type="password" placeholder="********" />
      <!-- <button type="button" class="btn pt-0 pb-0 pl-2 pr-2 w-[56px] text-sm variant-filled-surface absolute right-3 top-1/2" on:click={(e) => {
				e.preventDefault();
				e.stopPropagation();
				display_pw = !display_pw;
			}}>
				{i(display_pw ? 'auth.hide' : 'auth.view')}
			</button> -->
    </label>
    <button
      type="submit"
      disabled={processing}
      class="btn bg-slate-400 dark:bg-slate-500 flex w-full justify-center items-center"
    >
      {#if processing}
        <ProgressRadial
          value={undefined}
          width="w-6"
          meter="stroke-primary-500"
          track="stroke-primary-500/30"
        />
      {:else}
        <span class="text-slate-800 dark:text-slate-200 font-semibold">{i('auth.signin')}</span>
      {/if}
    </button>
    <p class="text-center text-sm text-gray-600 dark:text-gray-300">
      {t({
        en: "Don't have an account?",
        fr: "Vous n'avez pas de compte ?",
        ko: '계정이 없으신가요?',
        de: 'Sie haben noch kein Konto?'
      })}
      &nbsp;&nbsp;&nbsp;
      {#if processing}
        <span
          class="cursor-wait font-bold leading-6 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
        >
          {i('auth.signup')}
        </span>
      {:else}
        <Link
          href="/auth/register"
          className="font-bold leading-6 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
        >
          {i('auth.signup')}
        </Link>
      {/if}
    </p>
    <hr
      class="h-[2px] border-t-0 bg-transparent bg-gradient-to-r from-transparent via-slate-500 to-transparent opacity-100"
    />
    <button
      type="button"
      disabled={processing}
      class="btn bg-slate-400 dark:bg-slate-500 flex w-full justify-center items-center"
      on:click={() => socialLogin('google-oauth2')}
    >
      {#if processing}
        <ProgressRadial
          value={undefined}
          width="w-6"
          meter="stroke-primary-500"
          track="stroke-primary-500/30"
        />
      {:else}
        <Google class="w-6 h-6" />
        <span class="text-slate-800 dark:text-slate-50 font-semibold"
          >{t({
            en: 'With Google',
            fr: 'Avec Google',
            ko: 'Google 로그인',
            de: 'Mit Google'
          })}</span
        >
      {/if}
    </button>
    <button
      type="button"
      disabled={processing}
      class="btn bg-slate-400 dark:bg-slate-500 flex w-full justify-center items-center"
      on:click={() => socialLogin('github')}
    >
      {#if processing}
        <ProgressRadial
          value={undefined}
          width="w-6"
          meter="stroke-primary-500"
          track="stroke-primary-500/30"
        />
      {:else}
        <Github class="w-6 h-6" />
        <span class="text-slate-800 dark:text-slate-50 font-semibold"
          >{t({
            en: 'With Github',
            fr: 'Inscrivez-vous ici',
            ko: 'Github 로그인',
            de: 'Mit Github'
          })}</span
        >
      {/if}
    </button>
  </form>
</div>

<style lang="postcss">
</style>

<script lang="ts">
  import { i } from '@inlang/sdk-js';
  import { ProgressRadial, focusTrap, getToastStore } from '@skeletonlabs/skeleton';
  import { goto } from '$app/navigation';
  import Google from 'virtual:icons/devicon/google';
  import Github from 'virtual:icons/devicon/github';
  import { Link } from '$components/util';
  import { t } from '$lib/trad';
  import { user } from '$stores/auth';
  import { oAuthLogin, jwtCreate, getClientUser, checkUser } from '$lib/derived/auth';
  import { navigateTo } from '$lib/routes';
  export let data;
  const { from_register, from_activation, from_reset_pw_request, from_confirm_pw_request } = data;
  const toastStore = getToastStore();
  // let display_pw = false;
  let isFocused = true;
  let email = '';
  let password = '';
  let processing = false;

  if (from_register) {
    toastStore.trigger({
      message: i('auth.go_check_activation_mail'),
      background: 'variant-filled-success'
    });
  }
  if (from_activation) {
    toastStore.trigger({
      message: t({
        en: 'Your account has been successfully activated',
        fr: 'Votre compte a été activé avec succès',
        ko: '메일 주소 인증 완료',
        de: 'Ihr Konto wurde erfolgreich aktiviert'
      }),
      background: 'variant-filled-success'
    });
  }
  if (from_reset_pw_request) {
    toastStore.trigger({
      message: i('auth.go_check_pw_reset_mail'),
      background: 'variant-filled-success'
    });
  }
  if (from_confirm_pw_request) {
    toastStore.trigger({
      message: i('auth.pw_reset_confirmed'),
      background: 'variant-filled-success'
    });
  }

  const login = async () => {
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
    if (check_user_res.data.exists && !check_user_res.data.activated) {
      navigateTo(`/auth/resend-email/?email=${email}`);
      processing = false;
      return;
    }
    const jwt_res = await jwtCreate({
      email,
      password
    });
    if (jwt_res.errorMessage || !jwt_res.data) {
      toastStore.trigger({
        message: jwt_res.errorMessage
          ? jwt_res.errorMessage
          : 'An uncaught error occurred while signing in',
        background: 'variant-filled-error'
      });
      processing = false;
      return;
    }
    const user_res = await getClientUser();
    if (user_res.errorMessage || !user_res.data) {
      toastStore.trigger({
        message: jwt_res.errorMessage
          ? `${jwt_res.errorMessage}`
          : 'An uncaught error occurred while fetching user data',
        background: 'variant-filled-error'
      });
      processing = false;
      return;
    }
    processing = false;
    user.set(user_res.data);
    navigateTo('/my/dashboard');
  };
  const socialLogin = async (provider: string) => {
    if (processing) return;
    processing = true;
    const oauth_jwt_res = await oAuthLogin(provider);
    processing = false;
    if (oauth_jwt_res.errorMessage || !oauth_jwt_res.data?.authorization_url) {
      toastStore.trigger({
        message: oauth_jwt_res.errorMessage
          ? `${oauth_jwt_res.errorMessage} while creating JWT tokens.}`
          : 'An uncaught error occurred while signing in',
        background: 'variant-filled-error'
      });
      return;
    }
    window.alert(oauth_jwt_res.data.authorization_url);
    // goto(oauth_jwt_res.data.authorization_url);
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
    <button type="submit" disabled={processing} class="btn variant-filled-surface w-full">
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
      class="btn variant-filled-surface w-full"
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
      class="btn variant-filled-surface w-full"
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

<script lang="ts">
  import { t } from '$lib/trad';
  import { page } from '$app/stores';
  import Google from 'virtual:icons/devicon/google';
  import Github from 'virtual:icons/devicon/github';
  import { onMount } from 'svelte';
  import { user } from '$stores/auth';
  import { getClientUser, handleOAuthRedirection } from '$lib/derived/auth';
  import { getToastStore } from '@skeletonlabs/skeleton';
  import { navigateTo } from '$lib/routes';
  import { fetchPostQuery } from '$lib/node-fetch.js';
  export let data;
  const toastStore = getToastStore();
  const providerMap = new Map<
    string,
    {
      providerIdentifier: string;
      displayName: string;
    }
  >([
    ['google-oauth2', { providerIdentifier: 'google-oauth2', displayName: 'Google' }],
    ['github', { providerIdentifier: 'github', displayName: 'Github' }]
  ]);
  let error = '';
  onMount(async () => {
    const provider = providerMap.get(data.provider);
    if (!provider) {
      // unsupported provider
      return;
    }
    const urlParams: null | {
      state: string;
      code: string;
    } = data.urlParams;
    if (!urlParams || typeof urlParams?.code !== 'string' || typeof urlParams?.state !== 'string') {
      // no url params
      error =
        t({
          en: 'Invalid redirect parameters:',
          fr: 'Paramètres de redirection invalides :',
          ko: '잘못된 리디렉션 매개변수:',
          de: 'Ungültige Weiterleitungsparameter:'
        }) + " ('state', 'code')";
      return;
    }
    const { state, code } = urlParams;
    const jwt_res = await handleOAuthRedirection({
      provider: provider.providerIdentifier,
      state,
      code
    });
    if (!`${jwt_res.statusCode}`.startsWith('2') && jwt_res.errorMessage) {
      error = jwt_res.errorMessage
        ? `${jwt_res.errorMessage} while creating JWT tokens.`
        : 'Uncaught error';
      toastStore.trigger({
        message: error,
        background: 'variant-filled-error'
      });
      return;
    }
    // define access-meta and refresh-meta with obtained maxage
    const jwt_meta_res = await fetchPostQuery<null>({
      uri: '/lang/api/signin',
      payload: jwt_res.data,
      noContentExpected: true
    });
    if (jwt_meta_res.errorMessage) {
      error = jwt_meta_res.errorMessage
        ? jwt_meta_res.errorMessage
        : 'An uncaught error occurred while signing in';
      toastStore.trigger({
        message: error,
        background: 'variant-filled-error'
      });
      return;
    }
    const user_res = await getClientUser();
    if (user_res.errorMessage || !user_res.data) {
      error = jwt_res.errorMessage
        ? `${jwt_res.errorMessage} while fetching user data.`
        : 'Uncaught error';
      toastStore.trigger({
        message: error,
        background: 'variant-filled-error'
      });
      return;
    }
    user.set(user_res.data);
    navigateTo('/my/dashboard');
  });
</script>

<div class="container h-full mx-auto flex justify-center items-center">
  <div class="card p-4 flex flex-col items-center gap-2 animate-pulse">
    {#if !providerMap.has(data.provider)}
      <span>
        {t({
          en: `Unsupported OAuth provider: ${data.provider}`,
          fr: `OAuth provider inconnu : ${data.provider}`,
          ko: `지원되지 않은 OAuth provider: ${data.provider}`,
          de: `Nicht unterstützter OAuth -Anbieter: ${data.provider}`
        })}
      </span>
    {:else if $page.url.pathname.includes('google')}
      <Google class="w-6 h-6" />
    {:else if $page.url.pathname.includes('github')}
      <Github class="w-6 h-6" />
    {/if}
    {#if error}
      <span>
        {error}
      </span>
    {:else if providerMap.has(data.provider)}
      <span>
        {t({
          en: 'Authenticating with Google...',
          fr: 'Authentification en cours avec Google...',
          ko: 'Google에서 인증하는 중...',
          de: 'Authentifizierung mit Google ...'
        })}
      </span>
    {/if}
  </div>
</div>

<script lang="ts">
  import { Link } from '$components/util';
  import { logout } from '$lib/derived/auth';
  import { navigateTo } from '$lib/routes';
  import { t } from '$lib/trad';
  import { user } from '$stores/auth';
  import { Avatar, popup, getToastStore, ProgressBar } from '@skeletonlabs/skeleton';
  import type { PopupSettings } from '@skeletonlabs/skeleton';
  import { page } from '$app/stores';
  import { i } from '@inlang/sdk-js';

  let processing = false;

  $: initial_1 = ($user?.first_name ? $user.first_name.at(0) : undefined) ?? '';
  $: initial_2 = ($user?.last_name ? $user.last_name.at(0) : undefined) ?? '';
  $: initial = initial_1 + initial_2;
  // $: lastpathsegement = $page.url.pathname.split('/').at(-1);

  const popupClick: PopupSettings = {
    event: 'click',
    target: 'popupAvatar',
    placement: 'bottom',
    closeQuery: '#btn-sign-out'
  };
  const toastStore = getToastStore();

  const onLogOut = async () => {
    if (processing) return;
    processing = true;
    const { statusCode, errorMessage } = await logout();
    processing = false;
    if (statusCode === 204) {
      user.set(null);
      toastStore.trigger({
        message: t({
          en: 'Successfully signed out',
          de: 'Erfolgreich unterschrieben',
          fr: 'Vous vous êtes déconnecté(e)',
          ko: '로그아웃 완료'
        }),
        background: 'variant-filled-success'
      });
      navigateTo('/');
      return;
    }
    toastStore.trigger({
      message: errorMessage ? errorMessage : 'An uncaught error occurred while signing out',
      // Provide any utility or variant background style:
      background: 'variant-filled-error'
    });
  };
</script>

{#if $page.url.pathname.includes('auth')}
  <div class="hidden" />
{:else if $user}
  <button type="button" class="btn m-0 p-0" use:popup={popupClick}>
    <Avatar
      role="button"
      initials={initial ? initial : 'Guest'}
      class=""
      width="w-8"
      background="variant-soft-primary"
    />
  </button>
  <div class="card p-4 min-w-[128px]" data-popup="popupAvatar">
    <div class="grid grid-cols-1 gap-2">
      <button
        disabled={processing}
        id="btn-sign-out"
        class="btn variant-filled-error"
        on:click={() => onLogOut()}
      >
        {#if processing}
          <ProgressBar value={undefined} />
        {:else}
          {i('auth.signout')}
        {/if}
      </button>
    </div>
    <div class="arrow bg-surface-100-800-token" />
  </div>
{:else if $user === undefined}
  <div class="btn variant-filled-surface animate-pulse min-h-[42px] min-w-[84px]" />
{:else}
  <Link href={'auth/signin'} className="btn variant-filled font-semibold">{i('auth.signin')}</Link>
{/if}

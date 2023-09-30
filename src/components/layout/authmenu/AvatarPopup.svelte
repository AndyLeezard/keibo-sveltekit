<script lang="ts">
  import { Link } from '$components/util';
  import { logout } from '$lib/derived/auth';
  import { fetchGetQuery } from '$lib/node-fetch';
  import { navigateTo } from '$lib/routes';
  import { user } from '$stores/auth';
  import { t } from '$lib/trad';
  import { i } from '@inlang/sdk-js';
  import { Avatar, popup, getToastStore, ProgressBar } from '@skeletonlabs/skeleton';
  import type { PopupSettings } from '@skeletonlabs/skeleton';
  let processing = false;

  const popupClick: PopupSettings = {
    event: 'click',
    target: 'popupAvatar',
    placement: 'bottom',
    closeQuery: '#btn-sign-out'
  };
  const toastStore = getToastStore();

  $: initial_1 = ($user?.first_name ? $user.first_name.at(0) : undefined) ?? '';
  $: initial_2 = ($user?.last_name ? $user.last_name.at(0) : undefined) ?? '';
  $: initial = initial_1 + initial_2;

  const onLogOut = async () => {
    if (processing) return;
    processing = true;
    await fetchGetQuery({
      uri: '/base/api/signout',
      noContentExpected: true
    });
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

<button type="button" id="main-avatar" class="btn m-0 p-0" use:popup={popupClick}>
  <Avatar
    role="button"
    initials={initial ? initial : 'Guest'}
    rounded="rounded-md"
    width="w-8"
    background="bg-primary-500 dark:bg-primary-600"
  />
</button>
<div
  class="card bg-surface-200 dark:bg-surface-700 p-2 min-w-[128px] max-w-[192px] translate-x-[-16px]"
  data-popup="popupAvatar"
>
  <div class="flex-col mb-2">
    <span class="text-center"
      >{t({
        en: 'Hello, ',
        fr: 'Bonjour,',
        ko: '안녕하세요, ',
        de: 'Hallo, '
      })}{$user ? $user.first_name : ''}!</span
    >
    <span class="text-center text-sm opacity-90">{$user ? $user.email : ''}</span>
  </div>
  <div class="grid grid-cols-1 gap-2">
    <Link
      role="button"
      className="btn btn-sm bg-surface-300 dark:bg-surface-500"
      disabled={processing}
      id="btn-dashboard"
      href={'my/dashboard'}
    >
      {i('pages.dashboard')}
    </Link>
    <button
      disabled={processing}
      id="btn-sign-out"
      class="btn btn-sm bg-surface-300 dark:bg-surface-500 text-rose-600 dark:text-rose-400"
      on:click={() => onLogOut()}
    >
      {#if processing}
        <ProgressBar value={undefined} />
      {:else}
        {i('auth.signout')}
      {/if}
    </button>
  </div>
  <div class="arrow bg-surface-200-700-token" />
</div>

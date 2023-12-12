<script lang="ts">
  import { logout } from '$lib/derived/auth';
  import { fetchGetQuery } from '$lib/fetch-query';
  import { navigateTo, routeIsSelected } from '$lib/routes';
  import { user } from '$stores/auth';
  import { inversedNameOrder, t } from '$lib/intl';
  import { i } from '@inlang/sdk-js';
  import { Avatar, popup, getToastStore, ProgressBar } from '@skeletonlabs/skeleton';
  import type { PopupSettings } from '@skeletonlabs/skeleton';
  import { page } from '$app/stores';
  import clsx from 'clsx';
  import NavIndicator from './NavIndicator.svelte';
  import PopupLink from './PopupLink.svelte';
  $: isSelected = routeIsSelected($page.url.pathname, 'my', 2);

  let processing = false;

  const popupClick: PopupSettings = {
    event: 'click',
    target: 'popup-avatar',
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

<button type="button" class={clsx('relative btn flex flex-col m-0 p-0')} use:popup={popupClick}>
  <Avatar
    role="button"
    initials={initial ? initial : 'Guest'}
    rounded="rounded-md"
    width="w-8"
    background={clsx({
      ['bg-primary-500 dark:bg-primary-600']: isSelected,
      ['bg-surface-700 dark:bg-sky-100']: !isSelected
    })}
    fill="fill-sky-100 dark:fill-surface-700"
  />
  {#if isSelected}
    <NavIndicator />
  {/if}
</button>
<div
  class="card bg-surface-200 dark:bg-surface-700 p-2 min-w-[128px] max-w-[192px] translate-x-[-16px] translate-y-[8px]"
  data-popup="popup-avatar"
>
  <div class="flex-col mb-2">
    <!-- <span class="text-center"
      >{t({
        en: 'Hello, ',
        fr: 'Bonjour,',
        ko: '안녕하세요, ',
        de: 'Hallo, '
      })}{$user ? $user.first_name : ''}!</span
    > -->
    <span
      >{$user
        ? inversedNameOrder()
          ? `${$user.last_name} ${$user.first_name}`
          : `${$user.first_name} ${$user.last_name}`
        : ''}</span
    >
    <span class="text-center text-sm opacity-90">{$user ? $user.email : ''}</span>
  </div>
  <div class="grid grid-cols-1 gap-2">
    <PopupLink href={'my/profile'}>
      {i('pages.profile')}
    </PopupLink>
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

<script lang="ts">
  import { Link } from '$components/util';
  import { i } from '@inlang/sdk-js';
  import { popup } from '@skeletonlabs/skeleton';
  import type { PopupSettings } from '@skeletonlabs/skeleton';
  import Fa6SolidWallet from 'virtual:icons/fa6-solid/wallet';
  import { page } from '$app/stores';
  import { routeIsSelected } from '$lib/routes';
  import NavIndicator from './NavIndicator.svelte';
  import clsx from 'clsx';

  $: isSelected = routeIsSelected($page.url.pathname, 'wallet', 2);

  const popupClick: PopupSettings = {
    event: 'click',
    target: 'popup-wallet',
    placement: 'bottom'
    // closeQuery: '#btn-sign-out'
  };
</script>

<button
  type="button"
  class={clsx('relative btn-icon m-0 p-0 w-8 h-8', {
    ['text-surface-700 dark:text-sky-100']: !isSelected,
    ['text-primary-600 dark:text-primary-500']: isSelected
  })}
  use:popup={popupClick}
>
  <Fa6SolidWallet class="w-8 h-8" />
  {#if isSelected}
    <NavIndicator />
  {/if}
</button>
<!-- <Link
  className="btn-icon p-0 m-0 text-surface-700 dark:text-surface-100"
  role="button"
  href={'wallet/overview'}
>
  <Fa6SolidWallet class="w-8 h-8" />
</Link> -->
<div
  class="card bg-surface-200 dark:bg-surface-700 p-2 min-w-[128px] max-w-[192px] translate-x-[-16px]"
  data-popup="popup-wallet"
>
  <div class="flex-col mb-2">
    <span class="text-center">{i('pages.wallet.self')}</span>
  </div>
  <div class="grid grid-cols-1 gap-2">
    <Link
      role="button"
      className="btn btn-sm bg-surface-300 dark:bg-surface-500"
      id="btn-dashboard"
      href={'wallet/overview'}
    >
      {i('pages.wallet.overview')}
    </Link>
  </div>
  <div class="arrow bg-surface-200-700-token" />
</div>

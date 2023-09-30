<script lang="ts">
  import { Link } from '$components/util';
  import { user } from '$stores/auth';
  import { page } from '$app/stores';
  import { i } from '@inlang/sdk-js';
  import Fa6SolidWallet from 'virtual:icons/fa6-solid/wallet';
  import AvatarPopup from './AvatarPopup.svelte';
</script>

{#if $page.url.pathname.includes('auth')}
  <div class="hidden" />
{:else if $user}
  <Link
    className="btn-icon p-0 m-0 text-surface-700 dark:text-surface-100"
    role="button"
    href={'wallet/overview'}
  >
    <Fa6SolidWallet class="w-8 h-8" />
  </Link>
  <AvatarPopup />
{:else if $user === undefined}
  <div class="btn variant-filled-surface animate-pulse min-h-[42px] min-w-[84px]" />
{:else}
  <Link href={'auth/signin'} className="btn variant-filled font-semibold">{i('auth.signin')}</Link>
{/if}

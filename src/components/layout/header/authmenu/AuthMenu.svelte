<script lang="ts">
  import { Link } from '$components/util';
  import { user } from '$stores/auth';
  import { page } from '$app/stores';
  import { i } from '@inlang/sdk-js';
  import { AvatarPopup, WalletPopup } from './widgets';
</script>

{#if $page.url.pathname.includes('auth')}
  <div class="hidden" />
{:else if $user}
  <WalletPopup />
  <AvatarPopup />
{:else if $user === undefined}
  <div class="btn variant-filled-surface p-1 animate-pulse min-h-[32px] min-w-[84px]" />
{:else}
  <Link href={'auth/signin'} className="btn variant-filled p-1 font-semibold min-w-[84px]"
    >{i('auth.signin')}</Link
  >
{/if}

{#if !$page.url.pathname.includes('auth')}
  <span class="crumb-separator select-none" aria-hidden>|</span>
{/if}

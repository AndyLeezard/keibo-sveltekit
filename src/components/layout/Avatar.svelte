<script>
	import { user } from '$stores/auth';
</script>

{#if $user}
	<button type="button" class="btn variant-filled">
		<span>(icon)</span>
		<span>{JSON.stringify(user)}</span>
	</button>
{:else if $user === undefined}
	<div class="btn variant-filled-surface animate-pulse min-h-[42px] min-w-[84px]" />
{:else}
	<a role="button" class="btn variant-filled font-semibold" href={'/auth/signin'}>Sign in</a>
{/if}

<script>
	import { Link } from '$components/util';
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
	<Link href={"auth/signin"} className="btn variant-filled font-semibold" >Sign in</Link>
{/if}

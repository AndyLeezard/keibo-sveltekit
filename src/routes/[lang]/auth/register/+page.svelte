<script lang="ts">
	import { i } from '@inlang/sdk-js';
	import { focusTrap } from '@skeletonlabs/skeleton';
	import Google from 'virtual:icons/devicon/google';
	import Github from 'virtual:icons/devicon/github';
	import { Link } from '$components/util';
	let display_pw = false;
	let isFocused: boolean = true;
</script>

<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<svelte:head>
	<title>Keibo - register</title>
</svelte:head>
<div class="container h-full mx-auto flex justify-center items-center">
	<form use:focusTrap={isFocused} class="card p-4 w-[400px] text-token space-y-4" action="">
		<label class="label">
			<span>Email</span>
			<input class="input" type="text" placeholder="example@keibo.app" />
		</label>
		<label class="label relative">
			<span>Password</span>
			<input
				class="input pr-[72px]"
				type={display_pw ? 'text' : 'password'}
				placeholder="********"
			/>
			<button
				type="button"
				class="btn pt-0 pb-0 pl-2 pr-2 w-[56px] text-sm variant-filled-surface absolute right-3 top-1/2"
				on:click={(e) => {
					e.preventDefault();
					e.stopPropagation();
					display_pw = !display_pw;
				}}
			>
				{i(display_pw ? 'auth.hide' : 'auth.view')}
			</button>
		</label>
		<label class="label relative">
			<span>Password confirm</span>
			<input
				class="input pr-[72px]"
				type={display_pw ? 'text' : 'password'}
				placeholder="********"
			/>
			<button
				type="button"
				class="btn pt-0 pb-0 pl-2 pr-2 w-[56px] text-sm variant-filled-surface absolute right-3 top-1/2"
				on:click={(e) => {
					e.preventDefault();
					e.stopPropagation();
					display_pw = !display_pw;
				}}
			>
				{i(display_pw ? 'auth.hide' : 'auth.view')}
			</button>
		</label>
		<hr
			class="my-12 h-4px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100"
		/>
		<button
			type="button"
			class="btn bg-slate-400 dark:bg-slate-500 flex w-full justify-center items-center"
		>
			<Google class="w-6 h-6" />
			<span class="text-slate-800 dark:text-slate-200 font-semibold">With Google</span>
		</button>
		<button
			type="button"
			class="btn bg-slate-400 dark:bg-slate-500 flex w-full justify-center items-center"
		>
			<Github class="w-6 h-6" />
			<span class="text-slate-800 dark:text-slate-200 font-semibold">With Github</span>
		</button>
	</form>
</div>

<style lang="postcss">
</style>

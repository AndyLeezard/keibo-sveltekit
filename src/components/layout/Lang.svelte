<script lang="ts">
	import { language } from '@inlang/sdk-js';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings } from '@skeletonlabs/skeleton';

	const modalStore = getModalStore();

	const modal: ModalSettings = {
		type: 'component',
		// Pass the component registry key as a string:
		component: 'mdlang'
	};
	const open = () => {
		modalStore.trigger(modal);
	};
</script>

<button
	class="btn p-0 min-w-[32px] h-6 overflow-hidden rounded-md"
	type="button"
	on:click={() => open()}
>
	<img class="h-full" src={`/${language}.svg`} alt={language} />
</button>

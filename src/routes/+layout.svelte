<script lang="ts">
	import '../app.postcss';
	import { onMount } from 'svelte';
	import {
		AppShell,
		AppBar,
		LightSwitch,
		Modal,
		Toast,
		type ModalComponent
	} from '@skeletonlabs/skeleton';
	import Footer from '$components/layout/Footer.svelte';
	import Avatar from '$components/layout/Avatar.svelte';
	import { user } from '$stores/auth';
	import { checkCookies } from '$lib/ts-utils';
	import { getClientUser } from '$lib/node-fetch';
	import { initializeStores } from '@skeletonlabs/skeleton';
	import Lang from '$components/layout/Lang.svelte';
	import MDLang from '$components/modals/lang.svelte';
	import '@fontsource/fira-sans';
	import '@fontsource/gamja-flower';
	import { Link } from '$components/util';

	initializeStores();

	const modalComponentRegistry: Record<string, ModalComponent> = {
		mdlang: {
			ref: MDLang
			// Add the component properties as key/value pairs
			// props: { background: 'bg-red-500' },
			// Provide a template literal for the default component slot
			// slot: '<p>Skeleton</p>'
		}
	};

	onMount(() => {
		function checkCookieChange() {
			const { access, refresh } = checkCookies(['access', 'refresh']);
			if (access && refresh) {
				getClientUser().then((response) => {
					const { statusCode, networkError, data } = response;
					console.log(data);
					if (data) {
						user.update(() => data);
					} else {
						user.update(() => null);
					}
				});
			} else {
				console.log('no cookie');
				user.update(() => null);
			}
		}
		checkCookieChange();
	});
</script>

<Toast />
<Modal components={modalComponentRegistry} />
<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<Link><strong class="text-xl">Keibo</strong></Link>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<Avatar />
				<LightSwitch />
				<Lang />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
	<svelte:fragment slot="footer">
		<Footer />
	</svelte:fragment>
</AppShell>

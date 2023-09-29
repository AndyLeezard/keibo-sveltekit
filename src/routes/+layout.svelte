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
  import AuthMenu from '$components/layout/AuthMenu.svelte';
  import { user } from '$stores/auth';
  import { initializeStores, getToastStore, storePopup } from '@skeletonlabs/skeleton';
  import Lang from '$components/layout/Lang.svelte';
  import MDLang from '$components/modals/lang.svelte';
  import '@fontsource/fira-sans';
  import '@fontsource/gamja-flower';
  import { Link } from '$components/util';
  import { getClientUser } from '$lib/derived/auth';
  import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
  export let data;
  const { userHasJWT } = data;

  storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
  initializeStores();
  const toastStore = getToastStore();

  const modalComponentRegistry: Record<string, ModalComponent> = {
    mdlang: {
      ref: MDLang
      // Add the component properties as key/value pairs
      // props: { background: 'bg-red-500' },
      // Provide a template literal for the default component slot
      // slot: '<p>Skeleton</p>'
    }
  };

  onMount(async () => {
    if (/bot|googlebot|crawler|spider|robot|crawling/i.test(navigator.userAgent)) {
      // Bot detected. Do not run auth check request.
      return;
    }
    // Human detected. Proceed with auth check request.
    if (!userHasJWT) {
      user.set(null);
      return;
    }
    console.log(`%cChecking if the user is logged in...`, 'color: #ccc');
    const { statusCode, errorMessage, data } = await getClientUser();
    if (statusCode === 401) {
      console.log(
        `%c${errorMessage} \n(No user detected.) \nHttp-only JWT probably does not exist.`,
        'color: #ccc'
      );
      user.set(null);
      return;
    }
    if (errorMessage || !data) {
      toastStore.trigger({
        message: errorMessage
          ? `${errorMessage} while restoring user auth session.`
          : 'Uncaught error',
        // Provide any utility or variant background style:
        background: 'variant-filled-error'
      });
      user.set(null);
      return;
    }
    console.log(`%cRestored session with Http-only JWT for user (${data.email})`, 'color: #4ec9b0');
    user.set(data);
  });
</script>

<Toast />
<Modal components={modalComponentRegistry} />
<!-- App Shell -->
<AppShell>
  <svelte:fragment slot="header">
    <!-- App Bar -->
    <AppBar class="min-h-[64px] justify-center">
      <svelte:fragment slot="lead">
        <Link><strong class="text-xl">Keibo</strong></Link>
      </svelte:fragment>
      <svelte:fragment slot="trail">
        <AuthMenu />
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

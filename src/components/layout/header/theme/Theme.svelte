<script lang="ts">
  import {
    getModeOsPrefers,
    setInitialClassState,
    modeCurrent,
    setModeCurrent,
    setModeUserPrefers,
    popup
  } from '@skeletonlabs/skeleton';
  import type { PopupSettings, SvelteEvent } from '@skeletonlabs/skeleton';
  import Icon from './Icon.svelte';
  import { onMount } from 'svelte';
  import { i } from '@inlang/sdk-js';

  const setTheme = () => {
    $modeCurrent = !$modeCurrent;
    setModeUserPrefers($modeCurrent);
    setModeCurrent($modeCurrent);
    console.log($modeCurrent);
  };

  // A11y Input Handlers
  function onKeyDown(event: SvelteEvent<KeyboardEvent, HTMLDivElement>): void {
    // Enter/Space triggers selection event
    if (['Enter', 'Space'].includes(event.code)) {
      event.preventDefault();
      event.currentTarget.click();
    }
  }

  const popupHover: PopupSettings = {
    event: 'hover',
    target: 'popup-theme',
    placement: 'top'
  };

  // Lifecycle
  onMount(() => {
    // Sync lightswitch with the theme
    if (!('modeCurrent' in localStorage)) {
      setModeCurrent(getModeOsPrefers());
    }
  });
</script>

<svelte:head>{@html `<script>(${setInitialClassState.toString()})();</script>`}</svelte:head>

<button
  type="button"
  role="switch"
  class="btn-icon p-0 w-8 h-8 flex-shrink-0 [&>*]:pointer-events-none"
  on:click={() => setTheme()}
  on:click
  on:keydown={onKeyDown}
  on:keydown
  on:keyup
  on:keypress
  use:popup={popupHover}
  aria-label="Light Switch"
  aria-checked={$modeCurrent}
  title={i('theme.toggle')}
>
  <Icon />
</button>
<div
  class="card p-2 variant-filled-surface translate-x-[-16px] translate-y-[8px]"
  data-popup="popup-theme"
>
  <span class="text-sm whitespace-nowrap">{i('theme.toggle')}</span>
  <div class="arrow variant-filled-surface" />
</div>

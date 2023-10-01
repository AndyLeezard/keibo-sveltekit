<script lang="ts">
  import { modeCurrent } from '@skeletonlabs/skeleton';
  import clsx from 'clsx';
  // import clsx from 'clsx';
  export let size: number = 24;
</script>

<svg
  class="theme_btn"
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="none"
  stroke-width={2}
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path
    pathLength={1}
    class={clsx('moon', $modeCurrent ? 'opacity-0' : '')}
    d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
    stroke-dasharray={$modeCurrent ? '0px 1px' : '1px 1px'}
  />
  <circle
    pathLength={1}
    class={clsx('sun', $modeCurrent ? '' : 'opacity-0')}
    cx={12}
    cy={12}
    r={5}
    stroke-dasharray={$modeCurrent ? '1px 1px' : '0px 1px'}
  />
  <line
    pathLength={1}
    class={clsx('sun', $modeCurrent ? '' : 'opacity-0')}
    x1="12"
    y1={1}
    x2={12}
    y2={3}
    stroke-dasharray={$modeCurrent ? '1px 1px' : '0px 1px'}
  />
  <line
    pathLength={1}
    class={clsx('sun', $modeCurrent ? '' : 'opacity-0')}
    x1={12}
    y1={21}
    x2={12}
    y2={23}
    stroke-dasharray={$modeCurrent ? '1px 1px' : '0px 1px'}
  />
  <line
    pathLength={1}
    class={clsx('sun', $modeCurrent ? '' : 'opacity-0')}
    x1={4.22}
    y1={4.22}
    x2={5.64}
    y2={5.64}
    stroke-dasharray={$modeCurrent ? '1px 1px' : '0px 1px'}
  />
  <line
    pathLength={1}
    class={clsx('sun', $modeCurrent ? '' : 'opacity-0')}
    x1={18.36}
    y1={18.36}
    x2={19.78}
    y2={19.78}
    stroke-dasharray={$modeCurrent ? '1px 1px' : '0px 1px'}
  />
  <line
    pathLength={1}
    class={clsx('sun', $modeCurrent ? '' : 'opacity-0')}
    x1={1}
    y1={12}
    x2={3}
    y2={12}
    stroke-dasharray={$modeCurrent ? '1px 1px' : '0px 1px'}
  />
  <line
    pathLength={1}
    class={clsx('sun', $modeCurrent ? '' : 'opacity-0')}
    x1={21}
    y1={12}
    x2={23}
    y2={12}
    stroke-dasharray={$modeCurrent ? '1px 1px' : '0px 1px'}
  />
  <line
    pathLength={1}
    class={clsx('sun', $modeCurrent ? '' : 'opacity-0')}
    x1={4.22}
    y1={19.78}
    x2={5.64}
    y2={18.36}
    stroke-dasharray={$modeCurrent ? '1px 1px' : '0px 1px'}
  />
  <line
    pathLength={1}
    class={clsx('sun', $modeCurrent ? '' : 'opacity-0')}
    x1={18.36}
    y1={5.64}
    x2={19.78}
    y2={4.22}
    stroke-dasharray={$modeCurrent ? '1px 1px' : '0px 1px'}
  />
</svg>

<style lang="postcss">
  .theme_btn {
    transition: stroke 400ms;
    @apply dark:stroke-sky-100 stroke-surface-700;
  }

  .moon {
    transition: stroke-dasharray 0.5s ease-in, opacity 300ms ease-in;
  }

  .sun {
    transition: stroke-dasharray 0.5s ease-in, opacity 300ms ease-in;
  }
</style>

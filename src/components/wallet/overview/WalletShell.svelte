<script lang="ts">
  import clsx from 'clsx';
  export let wrapperClass: Optional<string> = undefined;
  export let imageClass: Optional<string> = undefined;
  export let columnClass: Optional<string> = undefined;
</script>

<div class={clsx('flex space-x-2', wrapperClass)}>
  <div class={clsx('base-column-class', 'w-32', columnClass)}>
    <div class={clsx('inline-image-container', imageClass)}>
      <slot name="provider-image" />
    </div>
    <slot name="provider" />
  </div>
  <div class={clsx('base-column-class', 'w-32', columnClass)}>
    <div class={clsx('inline-image-container', imageClass)}>
      <slot name="asset-image" />
    </div>
    <slot name="asset" />
  </div>
  <div class={clsx('base-column-class', 'w-32', columnClass)}>
    <slot name="asset-category" />
  </div>
  <div class={clsx('base-column-class', 'w-16', columnClass)}>
    <slot name="role" />
  </div>
  <div class={clsx('base-column-class', 'w-32', columnClass)}>
    <slot name="name" />
  </div>
  <div class={clsx('base-column-class', 'w-32', columnClass)}>
    <slot name="valuation" />
  </div>
  <div class={clsx('base-column-class', 'w-8', columnClass)}>
    <slot name="public" />
  </div>
</div>

<style lang="postcss">
  .base-column-class {
    @apply flex flex-auto items-center p-2 [&:not(:last-child)]:border-r border-solid border-surface-800 dark:border-surface-50;
  }
  .inline-image-container {
    @apply w-8 h-8 mr-2 self-center rounded-md overflow-hidden flex-shrink-0;
  }
</style>

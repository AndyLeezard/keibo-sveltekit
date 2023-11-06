<script lang="ts">
  import clsx from 'clsx';
  export let imageClass: Optional<string> = undefined;
  export let columnClass: Optional<string> = undefined;
</script>

<div class={clsx('base-column-class', 'w-32', columnClass)}>
  <div class={clsx('inline-image-container', imageClass)}>
    <slot name="category-image" />
  </div>
  <slot name="category" />
</div>
<div class={clsx('base-column-class', 'w-32', columnClass)}>
  <slot name="description" />
</div>
<div class={clsx('base-column-class', 'w-32', columnClass)}>
  <slot name="amount" />
</div>
<div class={clsx('base-column-class', 'w-32', columnClass)}>
  <slot name="fee" />
</div>
<div class={clsx('base-column-class', 'w-16', columnClass)}>
  <slot name="date" />
</div>

<style lang="postcss">
  .base-column-class {
    @apply flex h-full flex-auto items-center p-2 text-start;
  }
  .inline-image-container {
    @apply w-8 h-8 mr-2 self-center rounded-md overflow-hidden flex-shrink-0;
  }
</style>

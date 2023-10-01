<script>
  import clsx from 'clsx';
</script>

<span
  class={clsx(
    'elipse',
    'absolute top-full translate-y-1 translate-x-[-4px]',
    'w-[16px] h-[4px]',
    'bg-primary-600 dark:bg-primary-500'
  )}
/>

<style lang="postcss">
  .elipse {
    border-top-right-radius: 32px 3px;
    border-top-left-radius: 32px 3px;
    border-bottom-left-radius: 32px 3px;
    border-bottom-right-radius: 32px 3px;
    @apply animate-pulse;
  }
</style>

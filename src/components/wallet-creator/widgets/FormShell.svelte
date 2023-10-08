<script lang="ts">
  export let instruction: string;
</script>

<div class="max-w-[648px] m-auto flex flex-col variant-soft-surface p-2 rounded-lg gap-4">
  <h1 class="text-center">
    {instruction}
  </h1>
  <slot />
</div>

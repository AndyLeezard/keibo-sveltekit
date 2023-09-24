<!-- Shorthand for the A-tag -->
<script lang="ts">
  import { language } from '@inlang/sdk-js';
  import type { AriaRole } from 'svelte/elements';
  /** without the first slash*/
  export let role: Optional<AriaRole | null> = undefined;
  export let asNewTab: boolean = false;
  /** If not given, it goes straight to Home page */
  export let href: Optional<string> = undefined;
  export let className: Optional<string> = undefined;
</script>

<a
  {role}
  class={className}
  href={`${
    !href
      ? `/${language}`
      : href.startsWith('http')
      ? href
      : href.startsWith('/')
      ? `/${language}${href}`
      : `/${language}/${href}`
  }`}
  target={asNewTab ? '_blank' : '_self'}
  rel={asNewTab ? 'noopener noreferrer' : undefined}
>
  <slot />
</a>

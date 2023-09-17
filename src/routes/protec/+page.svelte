<!-- src/routes/protected-route.svelte -->
<script context="module" lang="ts">
  import { user } from '$stores/auth';
  // import { get } from 'svelte/store';

  export async function load() {
    if (user === null) {
      return {
        redirect: '/login',
      };
    }

    return {};
  }
</script>

<div>
  Protected Content
</div>

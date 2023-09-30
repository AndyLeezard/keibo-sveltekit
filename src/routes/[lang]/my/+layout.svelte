<script lang="ts">
  import { MyPageSidebar } from '$components/layout/sidebar';
</script>

<div class="flex h-full flex-col sm:flex-row">
  <MyPageSidebar />
  <slot />
</div>

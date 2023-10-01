<script>
  import { WalletPageSidebar } from '$components/layout/sidebar';
</script>

<div class="flex h-full flex-col sm:flex-row">
  <WalletPageSidebar />
  <slot />
</div>

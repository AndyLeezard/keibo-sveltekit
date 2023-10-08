<script lang="ts">
  import Icon from '@iconify/svelte';
  import { Link } from '$components/util';
  export let discreet = false;
</script>

<footer
  class="relative flex justify-center items-center left-0 right-0 pt-2 pb-2 pl-1 pr-1 bg-surface-100-800-token"
>
  {#if discreet}
    <span>Keibo ©2023</span>
  {:else}
    <div class="flex items-center gap-12 min-w-[200px] max-w-[1280px]">
      <div class="flex items-center flex-1 gap-4">
        <Link className="text-2xl font-bold">Keibo</Link>
        <ul class="flex items-center gap-4">
          <li>
            <Link asNewTab href="https://www.linkedin.com/in/andy-lee-4b913719a/">
              <Icon icon="devicon-plain:linkedin" class="w-6 h-6" />
            </Link>
          </li>
          <li>
            <Link asNewTab href="https://github.com/AndyLeezard">
              <Icon icon="jam:github" class="w-6 h-6" />
            </Link>
          </li>
          <li>
            <Link asNewTab href="https://twitter.com/andyleedev">
              <Icon icon="simple-icons:x" class="w-6 h-6" />
            </Link>
          </li>
        </ul>
      </div>
      <div class="flex items-center flex-1 gap-4 justify-end">
        <span class="min-w-[102px]">Keibo ©2023</span>
      </div>
    </div>
  {/if}
</footer>

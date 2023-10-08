<script lang="ts">
  import { t } from '$lib/intl';
  import { Sidebar, SidebarItem } from './core';
  import Icon from '@iconify/svelte';
  import { i } from '@inlang/sdk-js';
</script>

<Sidebar>
  <SidebarItem href={'/my/profile'}>
    <Icon icon="fa6-solid:circle-user" class="w-4 h-4" />
    <span>
      {i('pages.profile')}
    </span>
  </SidebarItem>
  <SidebarItem href={'/my/security'}>
    <Icon icon="mdi:security" class="w-4 h-4" />
    <span>
      {t({
        en: 'Security',
        fr: 'Sécurité',
        ko: '보안 설정'
      })}
    </span>
  </SidebarItem>
  <SidebarItem href={'/my/settings'}>
    <Icon icon="gala:settings" class="w-4 h-4" />
    <span>
      {t({
        en: 'Settings',
        fr: 'Paramètres',
        ko: '고급 설정'
      })}
    </span>
  </SidebarItem>
</Sidebar>

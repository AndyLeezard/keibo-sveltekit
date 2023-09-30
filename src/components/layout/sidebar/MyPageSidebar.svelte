<script lang="ts">
  import { t } from '$lib/trad';
  import { Sidebar, SidebarItem } from './core';
  import Fa6SolidCircleUser from 'virtual:icons/fa6-solid/circle-user';
  import MdiSecurity from 'virtual:icons/mdi/security';
  import GalaSettings from 'virtual:icons/gala/settings';
</script>

<Sidebar>
  <SidebarItem href={'/my/dashboard'}>
    <Fa6SolidCircleUser class="w-4 h-4" />
    <span>
      {t({
        en: 'Dashboard',
        ko: '대시보드'
      })}
    </span>
  </SidebarItem>
  <SidebarItem href={'/my/security'}>
    <MdiSecurity class="w-4 h-4" />
    <span>
      {t({
        en: 'Security',
        fr: 'Sécurité',
        ko: '보안 설정'
      })}
    </span>
  </SidebarItem>
  <SidebarItem href={'/my/settings'}>
    <GalaSettings class="w-4 h-4" />
    <span>
      {t({
        en: 'Settings',
        fr: 'Paramètres',
        ko: '고급 설정'
      })}
    </span>
  </SidebarItem>
</Sidebar>

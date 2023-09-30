<script lang="ts">
  import { t } from '$lib/trad';
  import { Sidebar, SidebarItem } from './core';
  import Fa6SolidCircleUser from 'virtual:icons/fa6-solid/circle-user';
</script>

<Sidebar>
  <SidebarItem href={'/accounts/overview'}>
    <Fa6SolidCircleUser class="w-4 h-4" />
    <span>
      {t({
        en: 'Overview',
        de: 'Überblick',
        fr: 'Aperçu',
        ko: '종합'
      })}
    </span>
  </SidebarItem>
</Sidebar>

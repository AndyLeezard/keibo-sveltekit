<script lang="ts">
  import { t } from '$lib/intl';
  import { Sidebar, SidebarItem } from './core';
  import Fa6SolidCircleUser from 'virtual:icons/fa6-solid/circle-user';
  import Fa6Plus from 'virtual:icons/fa6-solid/plus';
</script>

<Sidebar>
  <SidebarItem href={'/wallet/overview'}>
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
  <SidebarItem href={'/wallet/new'}>
    <Fa6Plus size={16} />
    <span>
      {t({
        en: 'New wallet',
        de: 'Neue Brieftasche',
        fr: 'Nouveau portefeuille',
        ko: '지갑 추가'
      })}
    </span>
  </SidebarItem>
</Sidebar>

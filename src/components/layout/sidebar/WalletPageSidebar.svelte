<script lang="ts">
  import { t } from '$lib/intl';
  import { Sidebar, SidebarItem } from './core';
  import Icon from '@iconify/svelte';
</script>

<Sidebar>
  <SidebarItem href={'/wallet/overview'}>
    <Icon icon="fa6-solid:circle-user" class="w-4 h-4" />
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
    <Icon icon="fa6-solid:plus" class="w-4 h-4" />
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

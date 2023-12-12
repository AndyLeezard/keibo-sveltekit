<script lang="ts">
  import { language, languages, switchLanguage } from '@inlang/sdk-js';
  import { getModalStore } from '@skeletonlabs/skeleton';
  import Shell from './shell.svelte';
  import clsx from 'clsx';

  const modalStore = getModalStore();

  const displayLangRecord: Record<string, string> = {
    en: 'English',
    de: 'Deutsch',
    fr: 'Français',
    ko: '한국어'
  };
</script>

<Shell dismiss_button_text="Nah, I'm good.">
  <div class="flex flex-wrap gap-4 justify-center">
    {#each languages as lang}
      <button
        type="button"
        class={clsx(
          'btn variant-filled w-[164px] mr-auto p-1 border-4',
          language === lang ? 'border-green-500' : 'border-transparent'
        )}
        on:click={() => {
          // setCookie("language", lang)
          switchLanguage(lang);
          modalStore.close();
        }}
      >
        <img class="h-6 mr-1 rounded-md" src={`/flags/${lang}.svg`} alt={lang} />
        <span class="font-semibold"
          >{lang in displayLangRecord ? displayLangRecord[lang] : lang}</span
        >
      </button>
    {/each}
  </div>
</Shell>

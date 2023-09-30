<script lang="ts">
  // import { setCookie } from '$lib/cookie';
  import { languages, switchLanguage } from '@inlang/sdk-js';
  import { getModalStore } from '@skeletonlabs/skeleton';

  const modalStore = getModalStore();

  const displayLangRecord: Record<string, string> = {
    en: 'English',
    de: 'Deutsch',
    fr: 'Français',
    ko: '한국어'
  };
</script>

<div class="card p-4 flex flex-col gap-4 bg-tertiary-200 dark:bg-surface-700 max-w-[556px]">
  <div class="flex flex-wrap gap-4 justify-center">
    {#each languages as lang}
      <button
        type="button"
        class="btn variant-filled w-[164px] mr-auto"
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
  <button
    type="button"
    class="btn variant-filled w-[164px] self-center"
    on:click={() => {
      modalStore.close();
    }}
  >
    <kbd class="kbd variant-filled-surface">Esc</kbd>
    <span class="font-semibold">Nah I'm good.</span>
  </button>
</div>

<script lang="ts">
  import { Link } from '$components/util';
  import { t } from '$lib/trad';
  import Fa6Discord from 'virtual:icons/fa6-brands/discord';
  export let origin: string;
</script>

<div class="flex flex-1 flex-col text-center m-auto justify-center">
  <p class="text-base font-semibold text-indigo-600 dark:text-indigo-400">
    {t({
      en: 'Currently unsupported feature',
      fr: 'Fonctionnalité non prise en charge à ce jour',
      ko: '현재 지원되지 않는 기능입니다.'
    })}
  </p>
  <img class="self-center" src={'/util/under_construction.webp'} alt="" width={200} height={200} />
  <h1 class="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
    {t({
      en: 'This page is under construction',
      fr: 'Cette page est en cours de construction',
      ko: '공사중인 페이지입니다.'
    })}
  </h1>
  <p class="mt-6 text-base leading-7 text-gray-600 dark:text-gray-300">
    {t({
      en: "Let's take a moment to thank the hard-working dev on this one.",
      fr: 'Prenons un moment pour remercier le développeur qui travaille dur sur celui-ci.',
      ko: '열일하는 개발자에게 힘을 주세요'
    })}
  </p>
  <div class="mt-10 flex items-center justify-center gap-x-6">
    <Link
      role="button"
      href={origin}
      className="rounded-md cursor-pointer bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      {t({
        en: 'Go back',
        fr: 'Retourner',
        ko: '돌아가기'
      })}
    </Link>
    <Link asNewTab className="inline-flex items-center text-sm font-semibold">
      {t({
        en: 'Contact support',
        fr: 'Contacter le support client',
        ko: '고객지원'
      })}{' '}
      <span aria-hidden="true">&nbsp;&nbsp;&rarr;&nbsp;&nbsp;</span>
      <Fa6Discord class="w-8 h-8 text-[#5865f2]" />
    </Link>
  </div>
</div>

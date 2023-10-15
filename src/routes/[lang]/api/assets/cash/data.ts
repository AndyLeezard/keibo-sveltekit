import type { PDictionary } from '$lib/intl';

type TServerSideWalletCashAssetConstructor = {
  id: string;
  symbol: string;
  display_name: PDictionary;
  icon: TIcon;

  // image?: string;
};

export const common_class: string = 'text-green-700';

export const currency_list: Array<TServerSideWalletCashAssetConstructor> = [
  {
    id: 'usd',
    symbol: 'usd',
    icon: { source: 'pepicons-pop:dollar' },
    display_name: { en: 'US Dollar', fr: 'Dollar américain', ko: '미국 달러' }
  },
  {
    id: 'eur',
    symbol: 'eur',
    icon: { source: 'fa6-solid:euro-sign' },
    display_name: { en: 'Euro', ko: '유럽연합 유로' }
  },
  {
    id: 'chf',
    symbol: 'chf',
    icon: { source: 'fa6-solid:franc-sign' },
    display_name: {
      en: 'Swiss Franc',
      de: 'Schweizer Franken',
      fr: 'Franc suisse',
      ko: '스위스 프랑'
    }
  },
  {
    id: 'gbp',
    symbol: 'gbp',
    icon: { source: 'uil:pound' },
    display_name: {
      en: 'British Pound Sterling',
      de: 'Britisches Pfund Sterling',
      fr: 'Livre sterling britannique',
      ko: '영국 파운드'
    }
  },
  {
    id: 'jpy',
    symbol: 'jpy',
    icon: { source: 'uil:yen' },
    display_name: {
      en: 'Japense Yen',
      de: 'Japanische Yen',
      fr: 'Yen japonais',
      ko: '일본 엔화'
    }
  },
  {
    id: 'rub',
    symbol: 'rub',
    icon: { source: 'ph:currency-rub' },
    display_name: {
      en: 'Russian ruble',
      de: 'Russischer Rubel',
      fr: 'Rouble russe',
      ko: '러시아 루블'
    }
  },
  {
    id: 'krw',
    symbol: 'krw',
    icon: { source: 'ph:currency-krw-bold' },
    display_name: {
      en: 'Korean won',
      de: 'koreanische Won',
      fr: 'Won coréen',
      ko: '대한민국 원화'
    }
  },
  {
    id: 'cny',
    symbol: 'cny',
    icon: { source: 'ic:round-currency-yuan' },
    display_name: {
      en: 'Chinese yuan',
      de: 'Chinesische Yuan',
      fr: 'Yuan chinois',
      ko: '중국 위안화'
    }
  },
  {
    id: 'cad',
    symbol: 'cad',
    icon: { source: 'pepicons-pop:dollar' },
    display_name: {
      en: 'Canadian Dollar',
      de: 'Kanadischer Dollar',
      fr: 'Dollar canadien',
      ko: '캐나다 달러'
    }
  },
  {
    id: 'inr',
    symbol: 'inr',
    icon: { source: 'ph:currency-inr' },
    display_name: {
      en: 'Indian Rupee',
      de: 'Indische Rupie',
      fr: 'roupie indienne',
      ko: '인도 루피'
    }
  }
];

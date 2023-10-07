import type { PDictionary } from '$lib/intl';

type TServerSideWalletProviderConstructor = {
  id: string;
  supported_categories: Array<Exclude<AssetCategory, 'other'>>;
  display_name: PDictionary;
  image: string;
};

export const wallet_providers: Array<TServerSideWalletProviderConstructor> = [
  {
    id: 'bank_of_america',
    image: '/icons/providers/bank_of_america.svg',
    supported_categories: ['cash', 'equity', 'fund'],
    display_name: { en: 'Bank of America', ko: '뱅크 오브 아메리카' }
  },
  {
    id: 'binance',
    image: '/icons/providers/binance.svg',
    supported_categories: ['cash', 'crypto'],
    display_name: { en: 'Binance', ko: '바이낸스' }
  },
  {
    id: 'bnp_paribas',
    image: '/icons/providers/bnp_paribas.svg',
    supported_categories: ['cash', 'equity', 'fund'],
    display_name: { en: 'BNP Paribas' }
  },
  {
    id: 'boursorama',
    image: '/icons/providers/boursorama.svg',
    supported_categories: ['cash', 'equity', 'fund'],
    display_name: { en: 'Boursorama' }
  },
  {
    id: 'citibank',
    image: '/icons/providers/citibank.png',
    supported_categories: ['cash', 'equity', 'fund'],
    display_name: { en: 'Citibank', ko: '씨티은행' }
  },
  {
    id: 'coinbase',
    image: '/icons/providers/coinbase.svg',
    supported_categories: ['cash', 'crypto'],
    display_name: { en: 'Coinbase', ko: '코인베이스' }
  },
  {
    id: 'credit_agricole',
    image: '/icons/providers/credit_agricole.svg',
    supported_categories: ['cash', 'equity', 'fund'],
    display_name: { en: 'Crédit Agricole', ko: '크레디 아그리콜' }
  },
  {
    id: 'jp_morgan_chase',
    image: '/icons/providers/jp_morgan_chase.webp',
    supported_categories: ['cash', 'equity', 'fund'],
    display_name: { en: 'JPMorgan Chase & Co', ko: '체이스 은행' }
  },
  {
    id: 'kakao_bank',
    image: '/icons/providers/kakao_bank.jpg',
    supported_categories: ['cash'],
    display_name: { en: 'Kakao Bank', ko: '카카오뱅크' }
  },
  {
    id: 'orange_bank',
    image: '/icons/providers/orange_bank.png',
    supported_categories: ['cash'],
    display_name: { en: 'Orange Bank' }
  },
  {
    id: 'ledger',
    image: '/icons/providers/ledger.svg',
    supported_categories: ['crypto'],
    display_name: { en: 'Ledger', ko: '레저' }
  },
  {
    id: 'shinhan_bank',
    image: '/icons/providers/shinhan_bank.svg',
    supported_categories: ['cash'],
    display_name: { en: 'Shinhan Bank', ko: '신한은행' }
  },
  {
    id: 'societe_generale',
    image: '/icons/providers/societe_generale.svg',
    supported_categories: ['cash', 'equity', 'fund'],
    display_name: { en: 'Société Générale', ko: '소시에테 제네랄' }
  },
  {
    id: 'wells_fargo',
    image: '/icons/providers/wells_fargo.png',
    supported_categories: ['cash', 'equity', 'fund'],
    display_name: { en: 'Wells Fargo', ko: '웰스 파고' }
  }
];

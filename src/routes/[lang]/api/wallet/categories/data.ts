import type { PDictionary } from '$lib/intl';

type TServerSideWalletCategoryConstructor = {
  id: AssetCategory;
  display_name: PDictionary;
  description?: PDictionary;
  icon: TIcon;
};

export const wallet_categories: Array<TServerSideWalletCategoryConstructor> = [
  {
    id: 'cash',
    icon: {
      source: 'mdi:cash-multiple'
    },
    display_name: {
      en: 'Fiat currency',
      fr: 'Monnaie',
      de: 'Währung',
      ko: '화폐'
    },
    description: {
      en: 'Cash, Back accounts, cash accounts on other financial services',
      fr: "Espèces, comptes de dépôt, comptes sur d'autres services financiers",
      de: 'Bargeld, Rückkonten, Barkonten auf anderen Finanzdienstleistungen',
      ko: '현금, 은행계좌, 기타 금융 서비스 계좌 등'
    }
  },
  {
    id: 'equity',
    icon: { source: 'mdi:graph-line' },
    display_name: {
      en: 'Equity',
      fr: 'Action',
      de: 'Eigenkapital',
      ko: '주식'
    },
    description: {
      en: 'Stocks',
      fr: 'Actions privées ou publiques',
      de: 'Aktien',
      ko: '보통주'
    }
  },
  {
    id: 'crypto',
    icon: { source: 'eos-icons:blockchain' },
    display_name: {
      en: 'Cryptocurreny',
      fr: 'Cryptomonnaie',
      de: 'Kryptowährung',
      ko: '암호화폐 및 토큰'
    },
    description: {
      en: 'Private or platform wallets',
      fr: 'Portefeuilles privé ou de plateforme',
      de: 'Private oder Plattform-Wallets',
      ko: '거래소 및 개인지갑'
    }
  },
  {
    id: 'fund',
    icon: { source: 'mdi:bank' },
    display_name: {
      en: 'Funds',
      fr: 'Fonds',
      de: 'Mittel',
      ko: '펀드'
    },
    description: {
      en: 'ETFs, hedge funds, and private equity funds',
      fr: 'ETF, fonds spéculatifs et fonds de capital-investissement',
      de: 'ETFs, Hedgefonds und Private-Equity-Fonds',
      ko: 'ETF, 헤지펀드 및 사모펀드'
    }
  },
  {
    id: 'other',
    icon: { source: 'mdi:piggy-bank' },
    display_name: {
      en: 'Other',
      fr: 'Autre',
      de: 'Andere',
      ko: '기타'
    }
  }
];

import type { PDictionary } from '$lib/intl';

type TServerSideWalletAssetConstructor = {
  id: string;
  symbol: string;
  display_name: PDictionary;
  image: string;
};

export const crypto_list: Array<TServerSideWalletAssetConstructor> = [
  {
    id: 'bitcoin',
    symbol: 'btc',
    display_name: {
      en: 'Bitcoin',
      ko: '비트코인'
    },
    image: 'btc.svg'
  },
  {
    id: 'ethereum',
    symbol: 'eth',
    display_name: {
      en: 'Ethereum',
      ko: '이더리움'
    },
    image: 'eth.svg'
  },
  {
    id: 'tether',
    symbol: 'usdt',
    display_name: {
      en: 'Tether',
      ko: '테더'
    },
    image: 'usdt.svg'
  },
  {
    id: 'binancecoin',
    symbol: 'bnb',
    display_name: {
      en: 'BNB'
    },
    image: 'bnb.svg'
  },
  {
    id: 'usd-coin',
    symbol: 'usdc',
    display_name: {
      en: 'USD Coin'
    },
    image: 'usdc.svg'
  },
  {
    id: 'ripple',
    symbol: 'xrp',
    display_name: {
      en: 'XRP',
      ko: '리플 (XRP)'
    },
    image: 'xrp.svg'
  },
  {
    id: 'cardano',
    symbol: 'ada',
    display_name: {
      en: 'Cardano',
      ko: '에이다'
    },
    image: 'ada.svg'
  },
  {
    id: 'dogecoin',
    symbol: 'doge',
    display_name: {
      en: 'Dogecoin',
      ko: '도지코인'
    },
    image: 'doge.svg'
  },
  {
    id: 'matic-network',
    symbol: 'matic',
    display_name: {
      en: 'Polygon',
      ko: '폴리곤'
    },
    image: 'polygon.svg'
  },
  {
    id: 'solana',
    symbol: 'sol',
    display_name: {
      en: 'Solana',
      ko: '솔라나'
    },
    image: 'sol.svg'
  },
  {
    id: 'tron',
    symbol: 'trx',
    display_name: {
      en: 'TRON',
      ko: '트론'
    },
    image: 'trx.svg'
  },
  {
    id: 'polkadot',
    symbol: 'dot',
    display_name: {
      en: 'Polkadot',
      ko: '폴카닷'
    },
    image: 'dot.svg'
  },
  {
    id: 'litecoin',
    symbol: 'ltc',
    display_name: {
      en: 'Litecoin',
      ko: '라이트코인'
    },
    image: 'ltc.svg'
  },
  {
    id: 'binance-usd',
    symbol: 'busd',
    display_name: {
      en: 'Binance USD',
      ko: '바이낸스달러'
    },
    image: 'busd.svg'
  },
  {
    id: 'avalanche-2',
    symbol: 'avax',
    display_name: {
      en: 'Avalanche',
      ko: '아발란체'
    },
    image: 'avax.svg'
  },
  {
    id: 'uniswap',
    symbol: 'uni',
    display_name: {
      en: 'Uniswap',
      ko: '유니스왑'
    },
    image: 'uniswap.svg'
  },
  {
    id: 'chainlink',
    symbol: 'link',
    display_name: {
      en: 'Chainlink',
      ko: '체인링크'
    },
    image: 'chainlink.svg'
  },
  {
    id: 'monero',
    symbol: 'xmr',
    display_name: {
      en: 'Monero',
      ko: '모네로'
    },
    image: 'monero.svg'
  },
  {
    id: 'ethereum-classic',
    symbol: 'etc',
    display_name: {
      en: 'Ethereum Classic',
      ko: '이더리움 클래식'
    },
    image: 'etc.svg'
  },
  {
    id: 'stellar',
    symbol: 'xlm',
    display_name: {
      en: 'Stellar',
      ko: '스텔라'
    },
    image: 'xlm.svg'
  },
  {
    id: 'bitcoin-cash',
    symbol: 'bch',
    display_name: {
      en: 'Bitcoin Cash',
      ko: '비트코인 캐시'
    },
    image: 'bch.svg'
  },
  {
    id: 'aave',
    symbol: 'aave',
    display_name: {
      en: 'Aave',
      ko: '에이브'
    },
    image: 'aave.svg'
  }
];

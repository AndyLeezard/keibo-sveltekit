declare global {
  type TWalletConstructorBase = {
    display_name: string;
    description?: string;
    /** Plain html image source */
    image?: string;
    /** Iconify Icon address */
    icon?: TIcon;
  };
  type AssetCategory = 'cash' | 'equity' | 'crypto' | 'fund' | 'other';
  /** Core */
  type FiatCurrency =
    | 'usd'
    | 'eur'
    | 'krw'
    | 'chf'
    | 'gbp'
    | 'jpy'
    | 'rub'
    | 'krw'
    | 'cny'
    | 'cad'
    | 'inr';
  type WalletBase = {
    /**
     * Define the asset (which currency? which cryptocurrency?)
     * @example usd, eur, krw, jpy, bitcoin, ethereum...
     */
    asset: string;
    /**
     * Define the platform (which bank? which crypto/stock platform?) and the name.
     * @example bnp-paribas | binance | coinbase | ledger-wallet | undetermined
     */
    provider: string;

    name: string;
    /** holding quantity */
    balance: number;
  };
  type WalletConstructor = WalletBase & {
    category: AssetCategory;
  };
  type SerializedWallet = {
    /** stringified UUID */
    id: string;
    is_public: boolean;

    /**
     * int between 1 - 4 all included.
     *
     * Represents what role does the user have to the wallet
     *
     * 1: viewer
     * 2: editor
     * 3: manager (will be counted as co-property)
     * 4: owner
     */
    role: number;

    val_usd?: number;
  };

  type TWalletCategoryConstructor = TWalletConstructorBase & {
    id: AssetCategory;
  };
  type TWalletProviderConstructor = TWalletConstructorBase & {
    id: string;
  };
  type TWalletAssetConstructor = TWalletConstructorBase & {
    id: string;
    symbol: string;
    quantity: number;
  };
}
export type module = unknown;

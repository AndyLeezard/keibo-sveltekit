import MdiCashMultiple from 'virtual:icons/mdi/cash-multiple';
import MdiGraphLine from 'virtual:icons/mdi/graph-line';
import MdiBitcoin from 'virtual:icons/mdi/bitcoin';
import MdiBank from 'virtual:icons/mdi/bank';
import MdiPiggyBank from 'virtual:icons/mdi/piggy-bank';

export const PAGE_RANGE = 3;

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export const categoryIconMap: Map<AssetCategory, any> = new Map([
  ['cash', MdiCashMultiple],
  ['equity', MdiGraphLine],
  ['crypto', MdiBitcoin],
  ['fund', MdiBank],
  ['other', MdiPiggyBank]
]);

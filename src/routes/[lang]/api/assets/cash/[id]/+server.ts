import { json, error } from '@sveltejs/kit';
import { currency_list } from '../data';
import { st, type PDictionary } from '$lib/intl';

export async function GET({ params }) {
  const { lang, id } = params;
  const currency = currency_list.find((c) => c.id === id);
  if (!currency || !id || typeof id !== 'string') {
    throw error(400, `Crypto ID ${id} not found`);
  }
  const output: TWalletAssetMetadata = {
    id: currency.id,
    symbol: currency.symbol,
    icon: currency.icon,
    display_name: st(lang as keyof PDictionary, currency.display_name)
  };
  return json(output);
}

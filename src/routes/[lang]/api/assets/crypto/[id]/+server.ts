import { json, error } from '@sveltejs/kit';
import { crypto_list } from '../data';
import { st, type PDictionary } from '$lib/intl';

export async function GET({ params }) {
  const { lang, id } = params;
  const crypto = crypto_list.find((c) => c.id === id);
  if (!crypto || !id || typeof id !== 'string') {
    throw error(400, `Crypto ID ${id} not found`);
  }
  const output: TWalletAssetConstructor = {
    id: crypto.id,
    symbol: crypto.symbol,
    image: `/icons/assets/crypto/${crypto.image}`,
    display_name: st(lang as keyof PDictionary, crypto.display_name),
    quantity: 0
  };
  return json(output);
}

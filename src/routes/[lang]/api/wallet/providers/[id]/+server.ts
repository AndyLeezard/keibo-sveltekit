import { json, error } from '@sveltejs/kit';
import { wallet_providers } from '../data';
import { st, type PDictionary } from '$lib/intl';

export async function GET({ params }) {
  const { lang, id } = params;
  const provider = wallet_providers.find((c) => c.id === id);
  if (!provider || !id || typeof id !== 'string') {
    throw error(400, `Wallet Provider ID ${id} not found`);
  }
  const output: TWalletProviderConstructor = {
    id: provider.id,
    image: provider.image,
    display_name: st(lang as keyof PDictionary, provider.display_name)
  };
  return json(output);
}

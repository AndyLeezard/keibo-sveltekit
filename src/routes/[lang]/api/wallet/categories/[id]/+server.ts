import { json, error } from '@sveltejs/kit';
import { wallet_categories } from '../data';
import { st, type PDictionary } from '$lib/intl';

export async function GET({ params }) {
  const { lang, id } = params;
  const provider = wallet_categories.find((c) => c.id === id);
  if (!provider || !id || typeof id !== 'string') {
    throw error(400, `Wallet Provider ID ${id} not found`);
  }
  const output: TWalletCategoryConstructor = {
    id: provider.id,
    icon: provider.icon,
    display_name: st(lang as keyof PDictionary, provider.display_name),
    description: st(lang as keyof PDictionary, provider.description)
  };
  return json(output);
}

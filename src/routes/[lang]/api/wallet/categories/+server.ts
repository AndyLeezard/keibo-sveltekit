import { st } from '$lib/intl.js';
import type { PDictionary } from '$lib/intl.js';
import { json } from '@sveltejs/kit';
import { wallet_categories } from './data';

export async function GET({ params }) {
  const { lang } = params;
  const output: Array<TWalletCategoryConstructor> = wallet_categories.map((cat) => ({
    id: cat.id,
    icon: cat.icon,
    display_name: st(lang as keyof PDictionary, cat.display_name),
    description: st(lang as keyof PDictionary, cat.description)
  }));
  return json(output);
}

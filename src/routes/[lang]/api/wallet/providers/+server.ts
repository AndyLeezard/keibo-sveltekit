import { st } from '$lib/intl.js';
import type { PDictionary } from '$lib/intl.js';
import { json } from '@sveltejs/kit';
import { wallet_providers } from './data';
import { normalizeStr, toPositiveInt } from '$lib/ts-utils';

export async function GET({ request, params }) {
  const { lang } = params;
  const { searchParams } = new URL(request.url);
  let output = wallet_providers;

  const category = searchParams.get('category');
  if (category && category !== 'other') {
    output = output.filter((c) => (c.supported_categories as Array<string>).includes(category));
  }

  const keyword = searchParams.get('keyword');
  if (keyword) {
    output = output.filter((c) => {
      const display_name = normalizeStr(Object.values(c.display_name).join(' '), 'lowercase');
      return display_name.includes(normalizeStr(keyword, 'lowercase'));
    });
  }
  const size = toPositiveInt(searchParams.get('size'), 5);
  const page = toPositiveInt(searchParams.get('page'), 0);
  const page_ended = !output.slice((page + 1) * size).length;
  const processed: Array<TWalletProviderConstructor> = output
    .slice(page * size, (page + 1) * size)
    .map((provider) => ({
      id: provider.id,
      image: provider.image,
      display_name: st(lang as keyof PDictionary, provider.display_name)
    }));
  const message: AwaitedArrayData<TWalletProviderConstructor> = {
    metadata: {
      page_ended
    },
    data: processed
  };
  return json(message);
}

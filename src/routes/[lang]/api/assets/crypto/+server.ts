import { json } from '@sveltejs/kit';
import { crypto_list } from './data';
import { normalizeStr, toPositiveInt } from '$lib/ts-utils';
import { st, type PDictionary } from '$lib/intl';

export async function GET({ request, params }) {
  const { lang } = params;
  const { searchParams } = new URL(request.url);
  let output = crypto_list;
  const keyword = searchParams.get('keyword');
  if (keyword) {
    const normalized_keyword = normalizeStr(keyword, 'lowercase');
    output = output.filter((c) => {
      const display_name = normalizeStr(Object.values(c.display_name).join(' '), 'lowercase');
      return display_name.includes(normalized_keyword) || c.symbol.includes(normalized_keyword);
    });
  }
  const size = toPositiveInt(searchParams.get('size'), 5);
  const page = toPositiveInt(searchParams.get('page'), 0);
  const page_ended = !output.slice((page + 1) * size).length;
  const processed: Array<TWalletAssetConstructor> = output
    .slice(page * size, (page + 1) * size)
    .map((crypto) => ({
      id: crypto.id,
      symbol: crypto.symbol,
      image: `/icons/assets/crypto/${crypto.image}`,
      display_name: st(lang as keyof PDictionary, crypto.display_name),
      quantity: 0
    }));
  const message: AwaitedArrayData<TWalletAssetConstructor> = {
    metadata: {
      page_ended
    },
    data: processed
  };
  return json(message);
}

import { language } from '@inlang/sdk-js';

export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'fr', 'ko', 'de']
} as const;

export type Locale = (typeof i18n)['locales'][number];
export type PDictionary = PartiallyRequired<
  Partial<Record<Locale, string>>,
  (typeof i18n)['defaultLocale']
>;

/** Takes a dictionary and conditionally return the corresponding output */
export const t = (dictionary: PDictionary | string | undefined): string => {
  if (!dictionary) return '';
  if (typeof dictionary === 'string') return dictionary;
  if (Object.prototype.hasOwnProperty.call(dictionary, language)) {
    return dictionary[language as keyof PDictionary] as string;
  }
  return dictionary[i18n.defaultLocale] as string;
};

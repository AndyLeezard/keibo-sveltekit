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

/** Serverside version of `t` */
export const st = (
  lang: keyof PDictionary,
  dictionary: PDictionary | string | undefined
): string => {
  if (!dictionary) return '';
  if (typeof dictionary === 'string') return dictionary;
  if (Object.prototype.hasOwnProperty.call(dictionary, lang)) {
    return dictionary[lang as keyof PDictionary] as string;
  }
  return dictionary[i18n.defaultLocale] as string;
};

/**
 * Does the language say the last name first (ex: Korean and Japanese)?
 *
 * Default: `false`
 */
export const inversedNameOrder = () => {
  switch (language) {
    case 'ko':
    case 'jp':
      return true;
    default:
      return false;
  }
};

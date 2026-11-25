import { cookies } from 'next/headers';
import { cache } from 'react';
import { DEFAULT_LOCALE, isLocale, LOCALE_COOKIE, type Dictionary, type Locale } from './config';
import en from './locales/en';
import vi from './locales/vi';

// The type makes `tsc` fail when a locale is missing a key.
const DICTIONARIES: Record<Locale, Dictionary> = { vi, en };

export const getLocale = cache(async (): Promise<Locale> => {
  const value = (await cookies()).get(LOCALE_COOKIE)?.value;
  return isLocale(value) ? value : DEFAULT_LOCALE;
});

/** For Server Components. Client Components use `useI18n`. */
export async function getDictionary() {
  return DICTIONARIES[await getLocale()];
}

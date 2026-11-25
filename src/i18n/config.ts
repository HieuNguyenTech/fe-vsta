import type vi from './locales/vi';

export const LOCALES = ['vi', 'en'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'vi';
export const LOCALE_COOKIE = 'locale';

/** Used for number formatting and, with `_`, for Open Graph. */
export const LOCALE_TAGS: Record<Locale, string> = { vi: 'vi-VN', en: 'en-US' };

/** `locales/vi` is the source of truth: every other locale must provide the same keys. */
export type Dictionary = typeof vi;

export function isLocale(value: string | undefined): value is Locale {
  return LOCALES.some((locale) => locale === value);
}

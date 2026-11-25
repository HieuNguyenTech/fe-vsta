import { LOCALE_TAGS, type Locale } from './config';

/** Fills the `{name}` placeholders of a translated string. */
export function interpolate(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => String(values[key] ?? match));
}

export function formatCount(value: number, locale: Locale) {
  return new Intl.NumberFormat(LOCALE_TAGS[locale]).format(value);
}

'use client';

import { createContext, useContext, useMemo } from 'react';
import type { Dictionary, Locale } from './config';

type I18n = { locale: Locale; t: Dictionary };

const I18nContext = createContext<I18n | null>(null);

/** Hands the active dictionary to Client Components, so only one language reaches the browser. */
export function I18nProvider({
  locale,
  dictionary,
  children
}: {
  locale: Locale;
  dictionary: Dictionary;
  children: React.ReactNode;
}) {
  const value = useMemo(() => ({ locale, t: dictionary }), [locale, dictionary]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const i18n = useContext(I18nContext);
  if (!i18n) throw new Error('useI18n must be used inside I18nProvider');
  return i18n;
}

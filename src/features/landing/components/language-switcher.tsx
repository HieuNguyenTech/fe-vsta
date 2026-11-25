'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { LOCALE_COOKIE, LOCALES, type Locale } from '@/i18n/config';
import { useI18n } from '@/i18n/provider';
import { cn } from '@/lib/utils';
import { focusRing } from './primitives';

const NATIVE_NAMES: Record<Locale, string> = { vi: 'Tiếng Việt', en: 'English' };

function saveLocale(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; SameSite=Lax`;
}

export function LanguageSwitcher({
  className,
  itemClassName,
  activeClassName,
  inactiveClassName
}: {
  className?: string;
  itemClassName?: string;
  activeClassName?: string;
  inactiveClassName?: string;
}) {
  const { locale, t } = useI18n();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const select = (next: Locale) => {
    if (next === locale) return;
    saveLocale(next);
    // Server Components render again in the new language; client state is kept.
    startTransition(() => router.refresh());
  };

  return (
    <div
      role='group'
      aria-label={t.common.language}
      aria-busy={pending}
      className={cn('flex rounded-full border p-0.5 text-[13px]/[1.5] font-medium', className)}
    >
      {LOCALES.map((item) => (
        <button
          key={item}
          type='button'
          lang={item}
          title={NATIVE_NAMES[item]}
          aria-pressed={item === locale}
          onClick={() => select(item)}
          className={cn(
            'cursor-pointer rounded-full py-1 uppercase',
            focusRing,
            itemClassName,
            item === locale ? activeClassName : inactiveClassName
          )}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

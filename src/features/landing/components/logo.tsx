'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useI18n } from '@/i18n/provider';
import { cn } from '@/lib/utils';
import { focusRing } from './primitives';

export function Logo({ theme = 'light' }: { theme?: 'light' | 'dark' }) {
  const dark = theme === 'dark';
  const { t } = useI18n();

  return (
    <Link
      href='/'
      aria-label={t.common.logo.homeLabel}
      className={cn('flex min-w-0 items-center gap-3 rounded-[6px]', focusRing)}
    >
      <Image
        src='/vietnamseed-logo.jpg'
        alt='Vietnam Seed Trade Association'
        width={263}
        height={193}
        className='h-auto w-12 shrink-0 object-contain sm:w-[66px]'
      />
      <span
        className={cn(
          'flex min-w-0 flex-col gap-0.5 text-xs/[1.4] font-semibold sm:text-sm/[1.4] lg:font-bold xl:text-base/[1.4]',
          dark ? 'text-vsta-bg-50' : 'text-vsta-primary-800'
        )}
      >
        <span>{t.common.logo.line1}</span>
        <span>{t.common.logo.line2}</span>
        <span
          className={cn(
            'text-xs/[1.4] font-semibold tracking-[2px] uppercase',
            dark ? 'text-vsta-accent-300 max-sm:text-[9px]' : 'text-vsta-fg-600 max-xl:hidden'
          )}
        >
          {t.common.logo.tagline}
        </span>
      </span>
    </Link>
  );
}

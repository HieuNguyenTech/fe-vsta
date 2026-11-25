'use client';

import { Accordion } from '@base-ui/react/accordion';
import { Dialog } from '@base-ui/react/dialog';
import Link from 'next/link';
import { useState } from 'react';
import { Icons } from '@/components/icons';
import { useI18n } from '@/i18n/provider';
import { cn } from '@/lib/utils';
import { getMenu } from '../constants/navigation';
import { beVietnamPro } from '../font';
import { LanguageSwitcher } from './language-switcher';
import { Logo } from './logo';
import { buttonStyles, focusRing } from './primitives';

const barClass =
  'flex h-16 shrink-0 items-center justify-between gap-2 border-b border-vsta-bg-200 bg-vsta-bg-50 px-4';
const menuButtonClass = cn(
  'flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-[6px] bg-vsta-primary-500 text-vsta-bg-50',
  focusRing
);
const rowClass =
  'flex h-[52px] w-full cursor-pointer items-center justify-between gap-2 border-b border-vsta-primary-700 px-4 text-left text-sm/[1.4] font-medium text-vsta-bg-50';

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const { locale, t } = useI18n();

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <header className={cn(barClass, 'sticky top-0 z-40 lg:hidden')}>
        <Logo />
        <div className='flex shrink-0 gap-2'>
          <Link
            href='/tra-cuu-giong'
            aria-label={t.common.search}
            className={cn(
              'flex size-10 items-center justify-center rounded-full bg-vsta-bg-100 text-vsta-fg-700',
              focusRing
            )}
          >
            <Icons.search className='size-5' />
          </Link>
          <Dialog.Trigger aria-label={t.common.mobileNav.open} className={menuButtonClass}>
            <Icons.menu className='size-5' />
          </Dialog.Trigger>
        </div>
      </header>

      <Dialog.Portal>
        <Dialog.Popup
          // Portaled outside the page wrapper, so it states its own language.
          lang={locale}
          className={cn(
            'vsta-scope fixed inset-0 z-50 flex flex-col bg-vsta-primary-800 transition-opacity duration-200 outline-none data-ending-style:opacity-0 data-starting-style:opacity-0',
            beVietnamPro.variable
          )}
        >
          <Dialog.Title className='sr-only'>{t.common.mobileNav.title}</Dialog.Title>
          <div className={barClass}>
            <span onClickCapture={close} className='min-w-0'>
              <Logo />
            </span>
            <Dialog.Close aria-label={t.common.mobileNav.close} className={menuButtonClass}>
              <Icons.menu className='size-5' />
            </Dialog.Close>
          </div>
          <div className='min-h-0 flex-1 overflow-y-auto pb-2'>
            <Accordion.Root>
              {getMenu(t.common.menu).map((group) =>
                group.items ? (
                  <Accordion.Item key={group.href} value={group.href}>
                    <Accordion.Header>
                      <Accordion.Trigger
                        className={cn(
                          rowClass,
                          'group outline-none focus-visible:bg-vsta-primary-900 data-panel-open:bg-vsta-primary-900 data-panel-open:text-vsta-accent-400'
                        )}
                      >
                        {group.mobileLabel ?? group.label}
                        <Icons.chevronDown className='size-4 text-vsta-bg-50 transition-transform group-data-panel-open:rotate-180' />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Panel className='bg-vsta-primary-900 py-1 pr-4 pl-7'>
                      {[
                        { label: t.common.mobileNav.overview, href: group.href },
                        ...group.items
                      ].map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={close}
                          className='flex h-[46px] items-center rounded-[6px] px-3 text-sm/[1.6] text-vsta-bg-100 outline-none focus-visible:bg-vsta-primary-700 active:bg-vsta-primary-700 active:text-vsta-accent-400'
                        >
                          {item.label}
                        </Link>
                      ))}
                    </Accordion.Panel>
                  </Accordion.Item>
                ) : (
                  <Link key={group.href} href={group.href} onClick={close} className={rowClass}>
                    {group.mobileLabel ?? group.label}
                  </Link>
                )
              )}
            </Accordion.Root>
            <div className='flex items-center justify-between gap-2 px-4 py-3'>
              <span className='text-sm/[1.6] text-vsta-bg-200'>{t.common.language}</span>
              <LanguageSwitcher
                className='border-vsta-primary-600'
                itemClassName='px-3'
                activeClassName='bg-vsta-accent-500 text-vsta-fg-950'
                inactiveClassName='text-vsta-bg-100 hover:bg-vsta-primary-700'
              />
            </div>
            <div className='flex flex-wrap gap-3 p-4'>
              <Link
                href='/hoi-vien/dang-ky-gia-nhap'
                onClick={close}
                className={cn(buttonStyles({ variant: 'accent' }), 'flex-1')}
              >
                {t.common.joinMember}
                <Icons.arrowRight className='size-4' />
              </Link>
              <Link href='/login' className={buttonStyles({ variant: 'outlineLight' })}>
                {t.common.signIn}
                <Icons.arrowRight className='size-4' />
              </Link>
            </div>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

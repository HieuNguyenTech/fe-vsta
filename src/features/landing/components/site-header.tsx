'use client';

import { Menu } from '@base-ui/react/menu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef, useState } from 'react';
import { Icons } from '@/components/icons';
import { useI18n } from '@/i18n/provider';
import { cn } from '@/lib/utils';
import { getMenu, isActivePath, type MenuGroup, type MenuPage } from '../constants/navigation';
import { beVietnamPro } from '../font';
import { LanguageSwitcher } from './language-switcher';
import { Logo } from './logo';
import { MobileNav } from './mobile-nav';
import { buttonStyles, containerClass, focusRing } from './primitives';
import { SearchForm } from './search-form';

const menuItemClass =
  'relative flex h-[52px] cursor-pointer items-center gap-1 px-3 text-sm/[1.4] font-medium whitespace-nowrap outline-none transition-colors hover:bg-vsta-primary-900 hover:text-vsta-accent-400 focus-visible:bg-vsta-primary-900 focus-visible:text-vsta-accent-400';
const activeItemClass =
  'text-vsta-accent-400 after:absolute after:inset-x-0 after:bottom-0 after:h-1 after:bg-vsta-accent-500';

function DesktopMenuGroup({
  group,
  items,
  active,
  endAnchor,
  open,
  onOpenChange
}: {
  group: MenuGroup;
  items: MenuPage[];
  active: boolean;
  /** Set on the last dropdown: it ends at the menu edge instead of overflowing it. */
  endAnchor?: React.RefObject<HTMLUListElement | null>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { locale } = useI18n();

  return (
    <Menu.Root modal={false} open={open} onOpenChange={onOpenChange}>
      {/* Groups with children only toggle their submenu; they do not navigate. */}
      <Menu.Trigger
        openOnHover
        delay={80}
        aria-label={group.label}
        className={cn(
          menuItemClass,
          active ? activeItemClass : 'text-vsta-bg-50',
          'data-popup-open:bg-vsta-primary-900 data-popup-open:text-vsta-accent-400'
        )}
      >
        {group.label}
        <Icons.chevronDown className='size-4 text-vsta-bg-50' />
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner anchor={endAnchor} align={endAnchor ? 'end' : 'start'} className='z-50'>
          <Menu.Popup
            // Portaled outside the page wrapper, so it states its own language.
            lang={locale}
            className={cn(
              'vsta-scope w-[290px] overflow-hidden rounded-[8px] border border-vsta-bg-300 bg-vsta-bg-50 shadow-[0_8px_24px_0_rgba(0,22,6,0.122)] transition-opacity duration-200 outline-none data-ending-style:opacity-0 data-starting-style:opacity-0',
              beVietnamPro.variable
            )}
          >
            <div className='h-[3px] bg-vsta-accent-500' />
            <div className='py-2'>
              {items.map((item) => (
                <Menu.LinkItem
                  key={item.href}
                  render={<Link href={item.href} aria-label={item.label} />}
                  href={item.href}
                  closeOnClick
                  className='relative flex h-[46px] items-center px-5 text-sm/[1.6] text-vsta-fg-900 outline-none data-highlighted:bg-vsta-secondary-100 data-highlighted:text-vsta-primary-800 data-highlighted:before:absolute data-highlighted:before:inset-y-0 data-highlighted:before:left-0 data-highlighted:before:w-[3px] data-highlighted:before:bg-vsta-primary-500'
                >
                  {item.label}
                </Menu.LinkItem>
              ))}
            </div>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}

export function SiteHeader() {
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const pathname = usePathname();
  const { t } = useI18n();
  const menu = getMenu(t.common.menu);
  // While a submenu is open, only that item is highlighted.
  const isCurrent = (href: string) => openGroup === null && isActivePath(pathname, href);

  return (
    <>
      <header className='border-b border-vsta-bg-300 bg-vsta-bg-50 max-lg:hidden'>
        <div className={cn(containerClass, 'flex h-[79px] items-center justify-between gap-6')}>
          <Logo />
          <SearchForm className='flex h-11 max-w-[400px] min-w-0 flex-1 items-center gap-2 rounded-full border-[1.5px] border-vsta-primary-400 bg-vsta-bg-100 pr-1 pl-4 focus-within:ring-2 focus-within:ring-vsta-primary-400/40'>
            <Icons.search className='size-4 shrink-0 text-vsta-fg-600' />
            <input
              type='search'
              name='q'
              aria-label={t.common.search}
              placeholder={t.common.header.searchPlaceholder}
              className='min-w-0 flex-1 bg-transparent text-sm text-vsta-fg-950 outline-none placeholder:text-vsta-fg-600'
            />
            <button
              type='submit'
              className={cn(buttonStyles({ variant: 'accent' }), 'h-9 gap-1.5 rounded-full')}
            >
              <Icons.database className='size-4' />
              {t.common.header.searchSubmit}
            </button>
          </SearchForm>
          <div className='flex shrink-0 items-center gap-4'>
            <LanguageSwitcher
              className='border-vsta-bg-400'
              itemClassName='px-2.5'
              activeClassName='bg-vsta-primary-500 text-vsta-bg-50'
              inactiveClassName='text-vsta-fg-800 hover:bg-vsta-bg-200'
            />
            <Link
              href='/login'
              className={cn(
                'flex items-center gap-1.5 rounded-[6px] py-2 text-sm/[1.4] font-medium text-vsta-fg-900 hover:text-vsta-primary-600',
                focusRing
              )}
            >
              <Icons.user className='size-4 text-vsta-fg-800' />
              {t.common.signIn}
            </Link>
            <Link href='/hoi-vien/dang-ky-gia-nhap' className={buttonStyles({ variant: 'pill' })}>
              <Icons.userPlus className='size-4' />
              {t.common.joinMember}
            </Link>
          </div>
        </div>
      </header>

      <nav
        aria-label={t.common.header.mainMenu}
        className='sticky top-0 z-40 bg-vsta-primary-700 max-lg:hidden'
      >
        <div className={containerClass}>
          <ul ref={menuRef} className='flex items-center justify-between'>
            {menu.map((group, index) => (
              <li key={group.href}>
                {group.items ? (
                  <DesktopMenuGroup
                    group={group}
                    items={group.items}
                    active={isCurrent(group.href)}
                    endAnchor={index === menu.length - 2 ? menuRef : undefined}
                    open={openGroup === group.href}
                    onOpenChange={(open) =>
                      setOpenGroup((current) => {
                        if (open) return group.href;
                        return current === group.href ? null : current;
                      })
                    }
                  />
                ) : (
                  <Link
                    href={group.href}
                    aria-current={pathname === group.href ? 'page' : undefined}
                    className={cn(
                      menuItemClass,
                      isCurrent(group.href) ? activeItemClass : 'text-vsta-bg-50'
                    )}
                  >
                    {group.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <MobileNav />
    </>
  );
}

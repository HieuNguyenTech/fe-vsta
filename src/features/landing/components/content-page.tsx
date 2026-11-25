import Link from 'next/link';
import { Icons } from '@/components/icons';
import { getDictionary } from '@/i18n/server';
import { cn } from '@/lib/utils';
import type { MenuGroup, MenuPage } from '../constants/navigation';
import { containerClass, focusRing } from './primitives';

const crumbClass = cn('rounded-[4px] hover:text-vsta-accent-400 hover:underline', focusRing);

/**
 * Frame of every menu page. Without `page` it is the overview of a section.
 * The design has no inner pages yet, so the body is a placeholder to be replaced.
 */
export async function ContentPage({
  section,
  page,
  children
}: {
  section: MenuGroup;
  page?: MenuPage;
  children?: React.ReactNode;
}) {
  const t = await getDictionary();
  const title = page?.label ?? section.mobileLabel ?? section.label;

  return (
    <>
      <div className='bg-vsta-primary-800 py-8 lg:py-12'>
        <div className={cn(containerClass, 'flex flex-col gap-3')}>
          <nav aria-label={t.contentPage.breadcrumb}>
            <ol className='flex flex-wrap items-center gap-1 text-[13px]/[1.5] text-vsta-bg-200'>
              <li>
                <Link href='/' className={crumbClass}>
                  {t.common.menu.home.label}
                </Link>
              </li>
              {page && (
                <li className='flex items-center gap-1'>
                  <Icons.chevronRight className='size-3.5' />
                  <Link href={section.href} className={crumbClass}>
                    {section.mobileLabel ?? section.label}
                  </Link>
                </li>
              )}
              <li aria-current='page' className='flex items-center gap-1 text-vsta-accent-400'>
                <Icons.chevronRight className='size-3.5 text-vsta-bg-200' />
                {title}
              </li>
            </ol>
          </nav>
          <h1 className='text-2xl/[1.25] font-bold text-vsta-bg-50 lg:text-[34px]/[1.25]'>
            {title}
          </h1>
        </div>
      </div>

      <div
        className={cn(
          containerClass,
          'grid items-start gap-6 py-8 lg:py-14',
          section.items && page && 'lg:grid-cols-[290px_minmax(0,1fr)]'
        )}
      >
        {section.items && page && (
          <nav
            aria-label={section.label}
            className='overflow-hidden rounded-[8px] border border-vsta-bg-300 max-lg:order-last'
          >
            <div className='h-[3px] bg-vsta-accent-500' />
            <ul className='py-2'>
              {section.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={item.href === page.href ? 'page' : undefined}
                    className='block border-l-[3px] border-transparent px-5 py-3 text-sm/[1.6] text-vsta-fg-900 outline-none hover:bg-vsta-secondary-100 focus-visible:bg-vsta-secondary-100 aria-[current=page]:border-vsta-primary-500 aria-[current=page]:bg-vsta-secondary-100 aria-[current=page]:text-vsta-primary-800'
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {section.items && !page && (
          <ul className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6'>
            {section.items.map((item) => (
              <li key={item.href} className='flex'>
                <Link
                  href={item.href}
                  className={cn(
                    'flex w-full items-center justify-between gap-3 rounded-[8px] border border-vsta-bg-300 p-5 text-base/[1.4] font-bold text-vsta-fg-950 transition-colors hover:border-vsta-primary-400',
                    focusRing
                  )}
                >
                  {item.label}
                  <Icons.arrowRight className='size-4 shrink-0 text-vsta-primary-700' />
                </Link>
              </li>
            ))}
          </ul>
        )}

        {children ??
          ((page || !section.items) && (
            <div className='flex min-h-[240px] items-center justify-center rounded-[8px] border border-dashed border-vsta-bg-400 bg-vsta-bg-100 p-8 text-center text-[15px]/[1.6] text-vsta-fg-700'>
              {t.contentPage.placeholder}
            </div>
          ))}
      </div>
    </>
  );
}

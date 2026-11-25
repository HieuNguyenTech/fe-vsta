import Link from 'next/link';
import { Icons } from '@/components/icons';
import { formatCount } from '@/i18n/format';
import { getDictionary, getLocale } from '@/i18n/server';
import { cn } from '@/lib/utils';
import { buttonStyles, containerClass, focusRing, Responsive } from './primitives';
import { SearchForm } from './search-form';

const LOOKUP_TYPES = [
  { id: 'recognised', count: 2006, href: '/tra-cuu-giong/cong-nhan-luu-hanh' },
  { id: 'selfDeclared', count: 796, href: '/tra-cuu-giong/tu-cong-bo-luu-hanh' },
  { id: 'protected', count: 412, href: '/tra-cuu-giong/duoc-bao-ho' },
  { id: 'expired', count: 214, href: '/tra-cuu-giong/het-hieu-luc' }
] as const;

const eyebrowClass = 'text-xs/[1.4] font-semibold tracking-[2px] uppercase';
const titleClass = 'text-xl/[1.3] font-bold lg:text-[26px]/[1.3]';

export async function LookupAndAbout() {
  const [locale, t] = await Promise.all([getLocale(), getDictionary()]);
  const facts = Object.values(t.home.about.facts);

  return (
    <section className='py-8 lg:py-14'>
      <div
        className={cn(
          containerClass,
          'grid items-start gap-4 lg:grid-cols-[minmax(0,696fr)_minmax(0,480fr)] lg:gap-6'
        )}
      >
        <div
          id='tra-cuu'
          className='flex scroll-mt-20 flex-col gap-4 rounded-[8px] border border-vsta-bg-300 bg-vsta-bg-50 p-5 lg:gap-5 lg:p-8'
        >
          <p className={cn(eyebrowClass, 'text-vsta-primary-700')}>{t.home.lookup.eyebrow}</p>
          <h2 className={cn(titleClass, 'text-vsta-fg-950')}>{t.home.lookup.title}</h2>
          <SearchForm className='flex flex-col gap-4 sm:flex-row sm:gap-2'>
            <label className='flex h-10 min-w-0 shrink-0 items-center gap-2 rounded-[6px] border border-vsta-bg-300 bg-vsta-bg-100 px-3 focus-within:border-vsta-primary-500 focus-within:bg-vsta-bg-50 sm:flex-1'>
              <Icons.search className='size-4 shrink-0 text-vsta-fg-500' />
              <input
                type='search'
                name='giong'
                aria-label={t.home.lookup.inputLabel}
                placeholder={t.home.lookup.placeholder}
                className='min-w-0 flex-1 bg-transparent text-sm text-vsta-fg-950 outline-none placeholder:text-vsta-fg-600'
              />
            </label>
            <button type='submit' className={buttonStyles()}>
              {t.home.lookup.submit}
              <Icons.arrowRight className='size-4' />
            </button>
          </SearchForm>
          <ul>
            {LOOKUP_TYPES.map((type) => (
              <li key={type.id} className='border-vsta-bg-200 max-lg:border-t lg:border-b'>
                <Link
                  href={type.href}
                  className={cn('group flex items-center gap-3 py-3', focusRing)}
                >
                  <span className='size-2 shrink-0 rounded-full bg-vsta-accent-500' />
                  <span className='flex-1 text-sm/[1.6] text-vsta-fg-900 group-hover:text-vsta-primary-600 lg:text-[15px]/[1.6]'>
                    <Responsive
                      full={t.home.lookup.types[type.id].label}
                      short={t.home.lookup.types[type.id].shortLabel}
                    />
                  </span>
                  <span className='text-[13px]/[1.5] font-medium text-vsta-fg-700'>
                    {formatCount(type.count, locale)}
                  </span>
                  <Icons.chevronRight className='size-4 text-vsta-fg-400 max-lg:hidden' />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div
          id='gioi-thieu'
          className='flex scroll-mt-20 flex-col gap-3 rounded-[8px] bg-vsta-primary-800 p-5 lg:gap-4 lg:self-stretch lg:p-8'
        >
          <p className={cn(eyebrowClass, 'text-vsta-accent-400')}>{t.home.about.eyebrow}</p>
          <h2 className={cn(titleClass, 'text-vsta-bg-50')}>{t.home.about.title}</h2>
          <p className='text-[15px]/[1.6] text-vsta-bg-200 max-lg:hidden'>
            {t.home.about.description}
          </p>
          <p className='text-sm/[1.6] text-vsta-bg-200 lg:hidden'>{facts.join(' · ')}</p>
          <ul className='max-lg:hidden'>
            {facts.map((fact) => (
              <li
                key={fact}
                className='flex items-center gap-3 border-b border-vsta-primary-700 py-3 text-[15px]/[1.6] text-vsta-bg-50'
              >
                <Icons.check className='size-4 shrink-0 text-vsta-accent-400' />
                {fact}
              </li>
            ))}
          </ul>
          <Link
            href='/gioi-thieu'
            className={cn(
              'flex w-fit items-center gap-1 py-1.5 text-sm/[1.4] font-semibold text-vsta-accent-400 hover:underline',
              focusRing
            )}
          >
            {t.home.about.learnMore}
            <Icons.arrowRight className='size-4' />
          </Link>
        </div>
      </div>
    </section>
  );
}

'use client';

import Link from 'next/link';
import { Tabs } from '@base-ui/react/tabs';
import Image from 'next/image';
import { Icons } from '@/components/icons';
import type { Dictionary } from '@/i18n/config';
import { useI18n } from '@/i18n/provider';
import { cn } from '@/lib/utils';
import { NO_PAGE } from '../constants/navigation';
import {
  Badge,
  buttonStyles,
  containerClass,
  Eyebrow,
  focusRing,
  Responsive,
  SectionHeading
} from './primitives';

type NewsText = Dictionary['home']['news'];
type RowId = keyof NewsText['rows'];

type NewsTab = {
  id: keyof NewsText['tabs'];
  image: string;
  mobileImage?: string;
  /** Only the first three rows are shown on mobile. */
  rows: { id: RowId; date: string }[];
};

const TABS: NewsTab[] = [
  {
    id: 'association',
    image: '/landing/hero-3.svg',
    mobileImage: '/landing/news-mobile-1.svg',
    rows: [
      { id: 'autumnReview', date: '17/11/2026' },
      { id: 'saltTolerantRice', date: '14/11/2026' },
      { id: 'circularDraft', date: '12/11/2026' },
      { id: 'apsaDelegation', date: '10/11/2026' }
    ]
  },
  {
    id: 'member',
    image: '/landing/news-hoi-vien.svg',
    rows: [
      { id: 'saltTolerantRice', date: '14/11/2026' },
      { id: 'processingLine', date: '02/11/2026' },
      { id: 'maizeLinkage', date: '25/10/2026' },
      { id: 'vegetableDealers', date: '18/10/2026' }
    ]
  },
  {
    id: 'international',
    image: '/landing/hero-1.svg',
    rows: [
      { id: 'ecosystemExport', date: '10/11/2026' },
      { id: 'regionalCongress', date: '03/11/2026' },
      { id: 'geneEditing', date: '27/10/2026' },
      { id: 'vegetableSeedMarket', date: '19/10/2026' }
    ]
  }
];

const QUICK_NEWS = [
  'riceCatalogue',
  'seedFair',
  'membershipFee',
  'vcuTrial',
  'researchCall'
] as const;

function NewsPanel({ tab }: { tab: NewsTab }) {
  const {
    t: {
      home: { news: t }
    }
  } = useI18n();
  const text = t.tabs[tab.id];

  return (
    <>
      <article className='flex flex-col gap-3 lg:flex-row lg:items-start lg:gap-6'>
        <div className='relative h-[216px] shrink-0 overflow-hidden rounded-[6px] lg:h-[200px] lg:w-[300px]'>
          <Image
            src={tab.mobileImage ?? tab.image}
            alt=''
            fill
            sizes='100vw'
            className='object-cover lg:hidden'
          />
          <Image src={tab.image} alt='' fill sizes='300px' className='object-cover max-lg:hidden' />
          <div className='absolute top-3 left-3'>
            <Badge variant='dark'>
              <Responsive full={text.badge} short={text.shortBadge} />
            </Badge>
          </div>
        </div>
        <div className='flex min-w-0 flex-1 flex-col gap-3 lg:gap-2'>
          <p className='text-[13px]/[1.5] text-vsta-fg-700'>{text.meta}</p>
          <h3 className='text-lg/[1.35] font-bold text-vsta-fg-950'>{text.title}</h3>
          <p className='text-sm/[1.6] text-vsta-fg-700'>
            <Responsive full={text.summary} short={text.shortSummary} />
          </p>
          <a
            href={NO_PAGE}
            className={cn(buttonStyles({ variant: 'link' }), 'w-fit max-lg:hidden')}
          >
            {t.readMore}
            <Icons.arrowRight className='size-4' />
          </a>
        </div>
      </article>
      <ul>
        {tab.rows.map((row, index) => {
          const { title, shortTitle }: { title: string; shortTitle?: string } = t.rows[row.id];

          return (
            <li
              key={row.id}
              className={cn(
                'border-t border-vsta-bg-300 lg:border-vsta-bg-200',
                index > 2 && 'max-lg:hidden'
              )}
            >
              <a
                href={NO_PAGE}
                className={cn('group flex flex-col gap-1 py-3 lg:flex-row lg:gap-4', focusRing)}
              >
                <span className='shrink-0 text-[13px]/[1.5] font-medium text-vsta-primary-700 lg:w-[88px]'>
                  {/* Mobile drops the year. */}
                  <Responsive full={row.date} short={row.date.slice(0, 5)} />
                </span>
                <span className='text-sm/[1.6] text-vsta-fg-900 group-hover:text-vsta-primary-600 lg:text-[15px]/[1.6]'>
                  <Responsive full={title} short={shortTitle ?? title} />
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export function NewsBoard() {
  const { t } = useI18n();

  return (
    <section
      id='tin-tuc'
      className='scroll-mt-16 bg-vsta-bg-200 py-14 lg:border-y lg:border-vsta-bg-300'
    >
      <div className={cn(containerClass, 'flex flex-col gap-6 lg:gap-8')}>
        <SectionHeading
          eyebrow={t.home.news.eyebrow}
          title={t.home.news.title}
          description={t.home.news.description}
          linkLabel={t.common.viewAll}
          linkHref='/tin-tuc'
        />
        <div className='grid gap-6 lg:grid-cols-[minmax(0,822fr)_minmax(0,354fr)]'>
          <Tabs.Root
            defaultValue={TABS[0].id}
            className='flex min-w-0 flex-col self-start rounded-[8px] border-vsta-bg-300 lg:border lg:bg-vsta-bg-50 lg:p-6'
          >
            <Tabs.List className='flex flex-wrap gap-2'>
              {TABS.map((tab) => (
                <Tabs.Tab
                  key={tab.id}
                  value={tab.id}
                  className={cn(
                    'h-8 cursor-pointer rounded-full bg-vsta-bg-100 px-4 text-[13px]/[1.5] font-medium text-vsta-fg-700 transition-colors hover:bg-vsta-secondary-100 data-active:bg-vsta-primary-500 data-active:text-vsta-bg-50',
                    focusRing
                  )}
                >
                  <Responsive
                    full={t.home.news.tabs[tab.id].label}
                    short={t.home.news.tabs[tab.id].shortLabel}
                  />
                </Tabs.Tab>
              ))}
            </Tabs.List>
            {TABS.map((tab) => (
              <Tabs.Panel
                key={tab.id}
                value={tab.id}
                className='mt-4 flex flex-col gap-4 transition-opacity duration-200 outline-none data-starting-style:opacity-0 lg:mt-5 lg:gap-5'
              >
                <NewsPanel tab={tab} />
              </Tabs.Panel>
            ))}
          </Tabs.Root>
          <aside className='rounded-[8px] border border-vsta-bg-300 bg-vsta-bg-50 p-6 max-lg:hidden'>
            <h3 className='pb-3'>
              <Eyebrow>{t.home.news.quickTitle}</Eyebrow>
            </h3>
            <ul>
              {QUICK_NEWS.map((id) => (
                <li key={id} className='border-t border-vsta-bg-200'>
                  <a href={NO_PAGE} className={cn('group flex flex-col gap-1 py-3', focusRing)}>
                    <span className='text-[13px]/[1.5] font-medium text-vsta-primary-700'>
                      {t.home.news.quick[id].time}
                    </span>
                    <span className='text-sm/[1.6] text-vsta-fg-900 group-hover:text-vsta-primary-600'>
                      {t.home.news.quick[id].title}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        </div>
        <Link href='/tin-tuc' className={cn(buttonStyles({ variant: 'link' }), 'w-fit lg:hidden')}>
          {t.home.news.viewAllNews}
          <Icons.arrowRight className='size-4' />
        </Link>
      </div>
    </section>
  );
}

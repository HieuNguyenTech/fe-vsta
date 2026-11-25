import Link from 'next/link';
import { Icons } from '@/components/icons';
import { getDictionary } from '@/i18n/server';
import { cn } from '@/lib/utils';
import { NO_PAGE } from '../constants/navigation';
import { Badge, buttonStyles, containerClass, SectionHeading } from './primitives';

/** Only the first three documents are shown on mobile. */
const DOCUMENTS = [
  { id: 'cropLaw', inForce: true },
  { id: 'decree94', inForce: true },
  { id: 'decree79', inForce: true },
  { id: 'decree130', inForce: true }
] as const;

export async function LookupLegal() {
  const t = await getDictionary();

  return (
    <section id='phap-luat' className='scroll-mt-16 bg-vsta-bg-200 py-14'>
      <div className={cn(containerClass, 'flex flex-col gap-6 lg:gap-8')}>
        <SectionHeading
          eyebrow={t.home.legal.eyebrow}
          title={t.home.legal.title}
          description={t.home.legal.description}
          linkLabel={t.common.viewAll}
          linkHref='/phap-luat'
        />
        <div className='overflow-hidden rounded-[8px] border border-vsta-bg-300 bg-vsta-bg-50'>
          <div className='flex items-center justify-between gap-2 bg-vsta-secondary-50 px-4 py-3 lg:px-6 lg:py-4'>
            <h3 className='text-base/[1.4] font-bold text-vsta-fg-950'>{t.home.legal.current}</h3>
            <Link
              href='/phap-luat/kho-van-ban'
              className={cn(buttonStyles({ variant: 'link' }), 'max-lg:hidden')}
            >
              {t.home.legal.library}
              <Icons.arrowRight className='size-4' />
            </Link>
          </div>
          <ul>
            {DOCUMENTS.map((doc, index) => (
              <li
                key={doc.id}
                className={cn('border-t border-vsta-bg-200', index > 2 && 'max-lg:hidden')}
              >
                {/* Mobile stacks number, title, badge; desktop puts the badge beside the number. */}
                <a
                  href={NO_PAGE}
                  className='grid gap-1.5 px-4 py-3 outline-none hover:bg-vsta-bg-100 focus-visible:bg-vsta-bg-100 lg:grid-cols-[1fr_auto] lg:items-center lg:px-6 lg:py-3.5'
                >
                  <span className='text-[13px]/[1.5] font-medium text-vsta-primary-700'>
                    {t.home.legal.documents[doc.id].number}
                  </span>
                  <span className='text-sm/[1.6] text-vsta-fg-900 lg:col-span-2 lg:text-[15px]/[1.6]'>
                    {t.home.legal.documents[doc.id].title}
                  </span>
                  <span className='lg:col-start-2 lg:row-start-1'>
                    <Badge variant={doc.inForce ? 'valid' : 'expired'}>
                      {doc.inForce ? t.home.legal.inForce : t.home.legal.expired}
                    </Badge>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

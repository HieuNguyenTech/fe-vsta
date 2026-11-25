import Link from 'next/link';
import { Icons } from '@/components/icons';
import { interpolate } from '@/i18n/format';
import { getDictionary } from '@/i18n/server';
import { cn } from '@/lib/utils';
import { NO_PAGE } from '../constants/navigation';
import { buttonStyles, containerClass, focusRing, Responsive, SectionHeading } from './primitives';

const EVENTS = [
  { id: 'riceSeminar', day: '05' },
  { id: 'boardMeeting', day: '16' },
  { id: 'seedFair', day: '08' }
] as const;

const MEMBERS = [
  { initials: 'A', province: 'Đắk Lắk' },
  { initials: 'B', province: 'Sóc Trăng' },
  { initials: 'C', province: 'Hà Nội' },
  { initials: 'D', province: 'Cần Thơ' },
  { initials: 'E', province: 'Kiên Giang' },
  { initials: 'F', province: 'Cần Thơ' }
];

/** Members rotate on every page load so none of them is always listed first. */
function shuffle<T>(items: T[]) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export async function EventsMembers() {
  const t = await getDictionary();
  const members = shuffle(MEMBERS);

  return (
    <section
      id='su-kien'
      className='scroll-mt-16 border-y border-vsta-bg-200 py-14 lg:border-vsta-bg-300'
    >
      <div className={cn(containerClass, 'grid gap-6 lg:grid-cols-2 lg:gap-12')}>
        <div className='flex flex-col gap-6 lg:gap-4'>
          <SectionHeading
            eyebrow={t.home.events.eyebrow}
            title={t.home.events.title}
            linkLabel={t.common.viewAll}
            linkHref='/tin-tuc/lich-su-kien'
          />
          {EVENTS.map(({ id, day }) => {
            const event = t.home.events.items[id];

            return (
              <article
                key={id}
                className='relative flex items-start gap-4 rounded-[8px] border border-vsta-bg-300 bg-vsta-bg-50 p-4 transition-colors hover:border-vsta-primary-400'
              >
                <span className='flex h-16 w-14 shrink-0 flex-col items-center justify-center rounded-[6px] bg-vsta-primary-800'>
                  <span className='text-xs/[1.4] font-semibold tracking-[2px] text-vsta-accent-400'>
                    {event.month}
                  </span>
                  <span className='text-[26px]/[1.3] font-bold text-vsta-bg-50'>{day}</span>
                </span>
                <span className='flex min-w-0 flex-1 flex-col gap-1'>
                  <span className='text-base/[1.4] font-bold text-vsta-fg-950'>
                    <Responsive full={event.title} short={event.shortTitle} />
                  </span>
                  <span className='flex flex-wrap gap-x-3 text-[13px]/[1.5] text-vsta-fg-700'>
                    <span className='flex items-center gap-1'>
                      <Icons.clock className='size-3.5 text-vsta-fg-500' />
                      <Responsive full={event.time} short={event.shortTime} />
                    </span>
                    <span className='flex items-center gap-1'>
                      <Icons.mapPin className='size-3.5 text-vsta-fg-500' />
                      <Responsive full={event.place} short={event.shortPlace} />
                    </span>
                  </span>
                  <span className='text-sm/[1.6] text-vsta-fg-700'>
                    <Responsive full={event.description} short={event.shortDescription} />
                  </span>
                  {/* The link stretches over the whole card. */}
                  <a
                    href={NO_PAGE}
                    className={cn(
                      'w-fit rounded-[4px] text-sm/[1.4] font-semibold text-vsta-primary-700 after:absolute after:inset-0',
                      focusRing
                    )}
                  >
                    {t.home.events.register} →
                  </a>
                </span>
              </article>
            );
          })}
        </div>

        <div id='hoi-vien' className='flex scroll-mt-20 flex-col gap-6'>
          <SectionHeading
            eyebrow={t.home.members.eyebrow}
            title={t.home.members.title}
            description={t.home.members.description}
            showDescriptionOnMobile
            linkLabel={t.home.members.list}
            linkHref='/hoi-vien/danh-ba-hoi-vien'
          />
          <ul className='grid grid-cols-2 gap-3 sm:grid-cols-3 lg:gap-4'>
            {members.map((member) => (
              <li key={member.initials} className='flex'>
                <a
                  href={NO_PAGE}
                  className={cn(
                    'flex w-full flex-col items-center gap-2 rounded-[12px] border border-vsta-bg-300 bg-vsta-bg-50 px-4 py-6 text-center transition-colors hover:border-vsta-primary-400',
                    focusRing
                  )}
                >
                  <span className='flex size-14 items-center justify-center rounded-full bg-vsta-secondary-100 text-lg/[1.35] font-bold text-vsta-primary-800'>
                    {member.initials}
                  </span>
                  <span className='text-base/[1.4] font-bold text-vsta-fg-950'>
                    {interpolate(t.home.members.sampleName, { initials: member.initials })}
                  </span>
                  <span className='text-[13px]/[1.5] text-vsta-fg-700'>{member.province}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className='flex flex-col gap-1 rounded-[12px] border border-vsta-bg-300 bg-vsta-bg-50 p-4 lg:flex-row lg:items-center lg:justify-between lg:gap-2 lg:px-6'>
            <p className='text-[15px]/[1.6] text-vsta-fg-800'>
              <strong className='font-bold'>218</strong>{' '}
              <Responsive full={t.home.members.summary} short={t.home.members.shortSummary} />
            </p>
            <p className='text-[13px]/[1.5] text-vsta-fg-700'>{t.home.members.updated}</p>
          </div>
          <Link href='/hoi-vien/danh-ba-hoi-vien' className={cn(buttonStyles(), 'lg:hidden')}>
            {t.home.members.list}
            <Icons.arrowRight className='size-4' />
          </Link>
        </div>
      </div>
    </section>
  );
}

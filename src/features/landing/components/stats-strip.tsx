import { Icons } from '@/components/icons';
import { formatCount } from '@/i18n/format';
import { getDictionary, getLocale } from '@/i18n/server';
import { cn } from '@/lib/utils';
import { containerClass, Eyebrow, Responsive } from './primitives';

const STATS = [
  { id: 'varieties', icon: Icons.sprout, value: 3428 },
  { id: 'documents', icon: Icons.scale, value: 1264 },
  { id: 'members', icon: Icons.building, value: 218 },
  { id: 'projects', icon: Icons.flask, value: 86 }
] as const;

export async function StatsStrip() {
  const [locale, t] = await Promise.all([getLocale(), getDictionary()]);

  return (
    <section id='thong-ke' className='scroll-mt-16 border-b border-vsta-bg-200 py-8 lg:py-10'>
      <div className={cn(containerClass, 'flex flex-col gap-4 lg:gap-6')}>
        <div className='flex items-center justify-between gap-4'>
          <h2>
            <Eyebrow>
              <Responsive full={t.home.stats.heading} short={t.home.stats.shortHeading} />
            </Eyebrow>
          </h2>
          <p className='text-[13px]/[1.5] text-vsta-fg-700 max-lg:hidden'>{t.home.stats.source}</p>
        </div>
        <ul className='grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-6'>
          {STATS.map((stat) => (
            <li
              key={stat.id}
              className='flex flex-col items-start gap-3 rounded-[8px] border border-vsta-bg-300 bg-vsta-bg-50 p-5'
            >
              <span className='flex size-9 items-center justify-center rounded-[6px] bg-vsta-primary-100 text-vsta-primary-700'>
                <stat.icon className='size-5' />
              </span>
              <span className='text-[32px]/none font-bold text-vsta-primary-800'>
                {formatCount(stat.value, locale)}
              </span>
              <span className='min-h-[45px] text-base/[1.4] font-bold text-vsta-fg-950'>
                <Responsive
                  full={t.home.stats.items[stat.id].label}
                  short={t.home.stats.items[stat.id].shortLabel}
                />
              </span>
              <span className='text-[13px]/[1.5] text-vsta-fg-700'>
                <Responsive
                  full={t.home.stats.items[stat.id].note}
                  short={t.home.stats.items[stat.id].shortNote}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

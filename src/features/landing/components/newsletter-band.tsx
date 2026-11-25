import { Icons } from '@/components/icons';
import { getDictionary } from '@/i18n/server';
import { cn } from '@/lib/utils';
import { NO_PAGE } from '../constants/navigation';
import { NewsletterForm } from './newsletter-form';
import { containerClass, Eyebrow, focusRing } from './primitives';

export async function NewsletterBand() {
  const { newsletter: t } = (await getDictionary()).home;
  const channels = [
    { label: 'Facebook', icon: Icons.brandFacebook },
    { label: 'YouTube', icon: Icons.brandYoutube },
    { label: 'LinkedIn', icon: Icons.brandLinkedin },
    { label: t.messaging, icon: Icons.chat }
  ];

  return (
    <section id='ban-tin' className='scroll-mt-16 py-10 lg:py-14'>
      <div className={containerClass}>
        <div className='flex flex-col gap-6 rounded-[12px] border border-vsta-secondary-200 bg-vsta-secondary-50 px-5 py-7 lg:flex-row lg:items-center lg:gap-16 lg:px-16 lg:py-14'>
          <div className='flex min-w-0 flex-1 flex-col gap-4'>
            <Eyebrow className='gap-3' barClassName='w-8'>
              {t.eyebrow}
            </Eyebrow>
            <h2 className='text-xl/[1.3] font-bold text-vsta-fg-950 lg:text-[26px]/[1.3]'>
              {t.title}
            </h2>
            <p className='text-[15px]/[1.6] text-vsta-fg-700 lg:text-base/[1.6]'>{t.description}</p>
          </div>
          <div className='flex flex-col gap-4 lg:w-[520px] lg:max-w-[50%]'>
            <NewsletterForm />
            <p className='text-[13px]/[1.5] text-vsta-fg-700'>{t.note}</p>
            <div className='flex flex-wrap items-center gap-3'>
              <span className='text-xs/[1.4] font-semibold tracking-[2px] text-vsta-fg-700 uppercase'>
                {t.otherChannels}
              </span>
              {channels.map((channel) => (
                <a
                  key={channel.label}
                  href={NO_PAGE}
                  aria-label={channel.label}
                  className={cn(
                    'flex size-11 items-center justify-center rounded-full border border-vsta-primary-300 bg-vsta-bg-50 text-vsta-primary-700 transition-colors hover:bg-vsta-secondary-100',
                    focusRing
                  )}
                >
                  <channel.icon className='size-5' />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

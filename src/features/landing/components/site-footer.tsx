import Link from 'next/link';
import { Icons } from '@/components/icons';
import { getDictionary } from '@/i18n/server';
import { cn } from '@/lib/utils';
import { NO_PAGE } from '../constants/navigation';
import { ContactDetails } from './contact-details';
import { Logo } from './logo';
import { containerClass, focusRing } from './primitives';

const COLUMNS = [
  {
    id: 'association',
    links: [
      { id: 'intro', href: '/gioi-thieu/ve-vsta' },
      { id: 'history', href: '/gioi-thieu/lich-su-hinh-thanh' },
      { id: 'leadership', href: '/gioi-thieu/co-cau-to-chuc-lanh-dao' },
      { id: 'charter', href: '/gioi-thieu/dieu-le-va-quy-che' },
      { id: 'contact', href: '/lien-he' }
    ]
  },
  {
    id: 'data',
    links: [
      { id: 'lookup', href: '/tra-cuu-giong' },
      { id: 'legal', href: '/phap-luat/kho-van-ban' },
      { id: 'science', href: '/khoa-hoc-cong-nghe' },
      { id: 'media', href: '/tu-lieu/thu-vien-anh' },
      { id: 'book', href: '/tu-lieu/sach-75-nam' }
    ]
  },
  {
    id: 'members',
    links: [
      { id: 'directory', href: '/hoi-vien/danh-ba-hoi-vien' },
      { id: 'branches', href: '/hoi-vien/mang-luoi-chi-hoi' },
      { id: 'benefits', href: '/hoi-vien/quyen-loi-hoi-vien' },
      { id: 'join', href: '/hoi-vien/dang-ky-gia-nhap' },
      { id: 'news', href: '/tin-tuc/tin-hoi-vien' }
    ]
  }
] as const;

const linkClass = cn('rounded-[4px] hover:text-vsta-accent-400 hover:underline', focusRing);

export async function SiteFooter() {
  const { footer: t } = (await getDictionary()).common;
  const socials = [
    { label: 'Facebook', icon: Icons.brandFacebook, href: NO_PAGE },
    { label: 'YouTube', icon: Icons.brandYoutube, href: NO_PAGE },
    { label: 'Email', icon: Icons.mail, href: 'mailto:vietnamseed@yahoo.com.vn' },
    // Number as printed in the design: (84.4) 7345549.
    { label: t.phoneLabel, icon: Icons.phone, href: 'tel:+8447345549' }
  ];

  return (
    <footer className='bg-vsta-primary-900 text-sm/[1.6]'>
      <div className='h-1 bg-vsta-accent-500' />
      <div className='h-1 bg-vsta-primary-500' />
      <div className={cn(containerClass, 'flex flex-col gap-8 pt-10 pb-6 lg:gap-10 lg:pt-14')}>
        <div className='flex flex-col gap-8 lg:flex-row lg:gap-12'>
          <div className='flex flex-col gap-4 lg:w-[376px] lg:shrink-0'>
            <Logo theme='dark' />
            <p className='text-base/[1.4] font-bold text-vsta-accent-200'>{t.slogan}</p>
            <p className='text-vsta-bg-200'>{t.about}</p>
            <div className='flex gap-2'>
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className={cn(
                    'flex size-9 items-center justify-center rounded-full border border-vsta-primary-700 text-vsta-bg-100 transition-colors hover:bg-vsta-primary-700',
                    focusRing
                  )}
                >
                  <social.icon className='size-4' />
                </a>
              ))}
            </div>
          </div>
          <div className='flex flex-1 flex-col gap-6 lg:flex-row lg:justify-between lg:gap-8 lg:self-start xl:pl-20'>
            {COLUMNS.map((column) => (
              <nav
                key={column.id}
                aria-label={t.columns[column.id].title}
                className='flex flex-col gap-3'
              >
                <h2 className='text-xs/[1.4] font-semibold tracking-[2px] text-vsta-accent-400 uppercase'>
                  {t.columns[column.id].title}
                </h2>
                <ul className='flex flex-col gap-3 text-vsta-bg-200'>
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className={linkClass}>
                        {(t.columns[column.id].links as Record<string, string>)[link.id]}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <ContactDetails
          className='border-t border-vsta-primary-700 pt-6 text-vsta-bg-100'
          iconClassName='text-vsta-accent-400'
        />

        <div className='flex flex-col gap-2 border-t border-vsta-primary-700 pt-4 text-[13px]/[1.5] text-vsta-bg-400 lg:flex-row lg:justify-between'>
          <p>{t.copyright}</p>
          <p>
            <a href={NO_PAGE} className={linkClass}>
              {t.terms}
            </a>
            {' · '}
            <a href={NO_PAGE} className={linkClass}>
              {t.privacy}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

import Link from 'next/link';
import Image from 'next/image';
import { Icons } from '@/components/icons';
import { getDictionary } from '@/i18n/server';
import { cn } from '@/lib/utils';
import { Badge, buttonStyles, containerClass, focusRing, SectionHeading } from './primitives';

const PROJECTS = [
  { id: 'saltRice', active: true },
  { id: 'maizeMarkers', active: false },
  { id: 'vegetableF1', active: false }
] as const;

const ARCHIVE_THUMBS = ['/landing/hero-3.svg', '/landing/archive-2.svg', '/landing/archive-3.svg'];

type KnowledgeCardProps = {
  count: React.ReactNode;
  countClassName: string;
  icon: React.ReactNode;
  iconClassName: string;
  title: string;
  description: string;
  children: React.ReactNode;
  feature: { cover: React.ReactNode; eyebrow: string; title: string; href: string };
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
};

function KnowledgeCard(props: KnowledgeCardProps) {
  return (
    <article className='flex flex-col gap-4 rounded-[12px] border border-vsta-bg-300 bg-vsta-bg-50 p-5 lg:gap-5 lg:p-8'>
      <div className='flex items-start justify-between gap-2'>
        <p
          className={cn(
            'flex min-h-9 items-center gap-2 rounded-full px-4 py-2 text-sm/[1.4] font-semibold',
            props.countClassName
          )}
        >
          {props.count}
        </p>
        <span
          className={cn(
            'flex size-[52px] shrink-0 items-center justify-center rounded-[12px]',
            props.iconClassName
          )}
        >
          {props.icon}
        </span>
      </div>
      <h3 className='text-[26px]/[1.3] font-bold text-vsta-fg-950'>{props.title}</h3>
      <p className='text-base/[1.6] text-vsta-fg-700'>{props.description}</p>
      {/* Grows so both cards keep their feature row and actions aligned. */}
      <div className='flex-1'>{props.children}</div>
      <Link
        href={props.feature.href}
        className={cn(
          'flex items-center gap-4 rounded-[8px] border border-vsta-bg-300 bg-vsta-bg-100 p-4 transition-colors hover:border-vsta-primary-400',
          focusRing
        )}
      >
        {props.feature.cover}
        <span className='flex min-w-0 flex-1 flex-col gap-1'>
          <span className='text-xs/[1.4] font-semibold tracking-[2px] text-vsta-primary-700 uppercase'>
            {props.feature.eyebrow}
          </span>
          <span className='text-lg/[1.35] font-bold text-vsta-fg-950'>{props.feature.title}</span>
        </span>
        <Icons.arrowRight className='size-5 shrink-0 text-vsta-fg-600' />
      </Link>
      <div className='flex flex-wrap items-center gap-x-6 gap-y-2'>
        <Link href={props.primary.href} className={buttonStyles({ size: 'lg' })}>
          {props.primary.label}
          <Icons.arrowRight className='size-4' />
        </Link>
        <Link href={props.secondary.href} className={buttonStyles({ variant: 'link' })}>
          {props.secondary.label}
          <Icons.arrowRight className='size-4' />
        </Link>
      </div>
    </article>
  );
}

export async function ScienceLibrary() {
  const { knowledge: t } = (await getDictionary()).home;

  return (
    <section id='khoa-hoc' className='scroll-mt-16 bg-vsta-bg-200 py-14'>
      <div className={cn(containerClass, 'flex flex-col gap-6 lg:gap-8')}>
        <SectionHeading eyebrow={t.eyebrow} title={t.title} description={t.description} />
        <div className='grid gap-6 lg:grid-cols-2'>
          <KnowledgeCard
            count={
              <>
                <Icons.flask className='size-4 shrink-0' />
                {t.science.count}
              </>
            }
            countClassName='bg-vsta-primary-100 text-vsta-primary-800'
            icon={<Icons.flask className='size-6' />}
            iconClassName='bg-vsta-primary-500 text-vsta-bg-50'
            title={t.science.title}
            description={t.science.description}
            feature={{
              cover: (
                <Image
                  src='/landing/feature-science.svg'
                  alt=''
                  width={56}
                  height={72}
                  className='h-[72px] w-14 shrink-0 rounded-[4px] object-cover'
                />
              ),
              eyebrow: t.science.featureEyebrow,
              title: t.science.featureTitle,
              href: '/khoa-hoc-cong-nghe/danh-muc-de-tai'
            }}
            primary={{ label: t.science.primary, href: '/khoa-hoc-cong-nghe/danh-muc-de-tai' }}
            secondary={{ label: t.science.secondary, href: '/khoa-hoc-cong-nghe/bai-viet' }}
          >
            <ul>
              {PROJECTS.map((project) => (
                <li
                  key={project.id}
                  className='flex items-center justify-between gap-3 border-b border-vsta-bg-300 py-3'
                >
                  <span className='text-sm/[1.6] text-vsta-fg-900'>
                    {t.science.projects[project.id]}
                  </span>
                  <Badge variant={project.active ? 'valid' : 'expired'}>
                    {project.active ? t.science.ongoing : t.science.completed}
                  </Badge>
                </li>
              ))}
            </ul>
          </KnowledgeCard>

          <KnowledgeCard
            count={
              <>
                <Icons.media className='size-4 shrink-0' />
                {t.library.count}
              </>
            }
            countClassName='bg-vsta-accent-100 text-vsta-accent-900'
            icon={<Icons.archive className='size-6' />}
            iconClassName='bg-vsta-accent-500 text-vsta-fg-950'
            title={t.library.title}
            description={t.library.description}
            feature={{
              cover: (
                <span className='flex h-[72px] w-14 shrink-0 flex-col justify-end gap-1 rounded-[4px] bg-vsta-primary-800 p-2'>
                  <span className='h-0.5 w-5 bg-vsta-accent-500' />
                  <span className='text-sm/[1.4] font-semibold text-vsta-accent-400'>75</span>
                </span>
              ),
              eyebrow: t.library.featureEyebrow,
              title: t.library.featureTitle,
              href: '/tu-lieu/sach-75-nam'
            }}
            primary={{ label: t.library.primary, href: '/tu-lieu/thu-vien-anh' }}
            secondary={{ label: t.library.secondary, href: '/tu-lieu/video-phong-su' }}
          >
            <div className='grid grid-cols-3 gap-3'>
              {ARCHIVE_THUMBS.map((src) => (
                <div
                  key={src}
                  className='relative h-[116px] overflow-hidden rounded-[8px] border border-vsta-bg-300'
                >
                  <Image
                    src={src}
                    alt=''
                    fill
                    sizes='(min-width: 1024px) 170px, 33vw'
                    className='object-cover'
                  />
                </div>
              ))}
            </div>
          </KnowledgeCard>
        </div>
      </div>
    </section>
  );
}

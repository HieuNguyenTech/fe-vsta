import Link from 'next/link';
import { cva } from 'class-variance-authority';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';

export const containerClass = 'mx-auto w-full max-w-[1232px] px-4';

export const focusRing =
  'outline-none focus-visible:ring-2 focus-visible:ring-vsta-primary-400 focus-visible:ring-offset-2';

export const buttonStyles = cva(
  cn(
    'inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-[6px] px-4 text-sm/[1.4] font-semibold whitespace-nowrap transition-colors',
    focusRing
  ),
  {
    variants: {
      variant: {
        primary: 'bg-vsta-primary-500 text-vsta-bg-50 hover:bg-vsta-primary-600',
        accent: 'bg-vsta-accent-500 text-vsta-fg-950 hover:bg-vsta-accent-400',
        outlineLight: 'border border-white/40 text-vsta-bg-50 hover:bg-white/10',
        link: 'px-0 text-vsta-primary-700 hover:underline',
        pill: 'h-9 rounded-full bg-vsta-primary-500 text-vsta-bg-50 hover:bg-vsta-primary-600'
      },
      size: { default: '', lg: 'h-12' }
    },
    defaultVariants: { variant: 'primary', size: 'default' }
  }
);

const badgeStyles = cva(
  'inline-flex h-[30px] w-fit shrink-0 items-center rounded-full border px-2 text-[13px]/[1.5] font-medium',
  {
    variants: {
      variant: {
        valid: 'border-vsta-primary-400 bg-vsta-primary-100 text-vsta-primary-900',
        expired: 'border-vsta-bg-500 bg-vsta-bg-300 text-vsta-fg-900',
        dark: 'border-vsta-accent-600 bg-vsta-accent-500 text-vsta-fg-950'
      }
    }
  }
);

export function Badge({
  variant,
  children
}: {
  variant: 'valid' | 'expired' | 'dark';
  children: React.ReactNode;
}) {
  return <span className={badgeStyles({ variant })}>{children}</span>;
}

export function Eyebrow({
  children,
  className,
  barClassName
}: {
  children: React.ReactNode;
  className?: string;
  barClassName?: string;
}) {
  return (
    <span className={cn('flex items-center gap-2', className)}>
      <span aria-hidden className={cn('h-0.5 w-6 shrink-0 bg-vsta-accent-500', barClassName)} />
      <span className='text-xs/[1.4] font-semibold tracking-[2px] text-vsta-primary-700 uppercase'>
        {children}
      </span>
    </span>
  );
}

/** The link, and by default the description, are desktop only. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  showDescriptionOnMobile = false,
  linkLabel,
  linkHref
}: {
  eyebrow: string;
  title: string;
  description?: string;
  showDescriptionOnMobile?: boolean;
  linkLabel?: string;
  linkHref?: string;
}) {
  return (
    <div className='flex items-end justify-between gap-6'>
      <div className='flex flex-col gap-2'>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className='text-xl/[1.3] font-bold text-vsta-fg-950 lg:text-[26px]/[1.3]'>{title}</h2>
        {description && (
          <p
            className={cn(
              'text-[15px]/[1.6] text-vsta-fg-700',
              !showDescriptionOnMobile && 'max-lg:hidden'
            )}
          >
            {description}
          </p>
        )}
      </div>
      {linkLabel && linkHref && (
        <Link
          href={linkHref}
          className={cn(
            'flex shrink-0 items-center gap-1 py-1.5 text-sm/[1.4] font-semibold text-vsta-primary-700 hover:underline max-lg:hidden',
            focusRing
          )}
        >
          {linkLabel}
          <Icons.arrowRight className='size-4' />
        </Link>
      )}
    </div>
  );
}

/** Renders the long desktop copy from `lg` up and the shortened copy below it. */
export function Responsive({ full, short }: { full: string; short: string }) {
  if (full === short) return full;
  return (
    <>
      <span className='lg:hidden'>{short}</span>
      <span className='max-lg:hidden'>{full}</span>
    </>
  );
}

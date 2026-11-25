import { Icons } from '@/components/icons';
import { getDictionary } from '@/i18n/server';
import { cn } from '@/lib/utils';
import { focusRing } from './primitives';

/** Shared by the footer and the contact page; colours come from the surrounding element. */
export async function ContactDetails({
  className,
  iconClassName
}: {
  className?: string;
  iconClassName?: string;
}) {
  const { contact: t } = (await getDictionary()).common;
  const iconClass = cn('mt-0.5 size-4 shrink-0', iconClassName);
  const linkClass = cn('rounded-[4px] hover:underline', focusRing);

  return (
    <address className={cn('flex flex-col gap-3 not-italic', className)}>
      <p className='flex items-start gap-2'>
        <Icons.mapPin className={iconClass} />
        {t.address}
      </p>
      <p className='flex items-start gap-2'>
        <Icons.phone className={iconClass} />
        {t.phone}
      </p>
      <p className='flex items-start gap-2'>
        <Icons.mail className={iconClass} />
        <span className='min-w-0 break-words'>
          <a href='mailto:vietnamseed@yahoo.com.vn' className={linkClass}>
            vietnamseed@yahoo.com.vn
          </a>
          {' · '}
          <a href='https://www.vietnamseed.com.vn' className={linkClass}>
            www.vietnamseed.com.vn
          </a>
        </span>
      </p>
    </address>
  );
}

'use client';

import { toast } from 'sonner';
import { Icons } from '@/components/icons';
import { useI18n } from '@/i18n/provider';
import { useAppForm } from '@/lib/form';
import { cn } from '@/lib/utils';
import { createNewsletterSchema, type NewsletterValues } from '../schemas/newsletter';
import { focusRing } from './primitives';

export function NewsletterForm() {
  const { t } = useI18n();
  const form = useAppForm({
    defaultValues: { email: '' } as NewsletterValues,
    validators: { onSubmit: createNewsletterSchema(t.home.newsletter.invalidEmail) },
    // There is no subscription endpoint yet: do not report a success that did not happen.
    onSubmit: () => {
      toast.info(t.home.newsletter.pending, { position: 'bottom-center' });
    }
  });

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <form.Field
        name='email'
        children={(field) => {
          const invalid = field.state.meta.isTouched && !field.state.meta.isValid;
          const errorId = `${field.name}-error`;

          return (
            <div className='flex flex-col gap-2'>
              <div className='flex flex-col gap-3 sm:flex-row'>
                <label
                  className={cn(
                    'flex h-[52px] min-w-0 shrink-0 items-center gap-3 rounded-[8px] border bg-vsta-bg-50 px-4 focus-within:border-vsta-primary-500 sm:flex-1',
                    invalid ? 'border-vsta-danger-600' : 'border-vsta-bg-400'
                  )}
                >
                  <Icons.mail className='size-5 shrink-0 text-vsta-fg-600' />
                  <input
                    id={field.name}
                    name={field.name}
                    type='email'
                    autoComplete='email'
                    aria-label={t.home.newsletter.emailLabel}
                    aria-invalid={invalid}
                    aria-describedby={invalid ? errorId : undefined}
                    placeholder={t.home.newsletter.emailLabel}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className='min-w-0 flex-1 bg-transparent text-base text-vsta-fg-950 outline-none placeholder:text-vsta-fg-600'
                  />
                </label>
                <button
                  type='submit'
                  className={cn(
                    'h-[52px] shrink-0 cursor-pointer rounded-[8px] bg-vsta-primary-500 px-7 text-sm/[1.4] font-semibold text-vsta-bg-50 transition-colors hover:bg-vsta-primary-600',
                    focusRing
                  )}
                >
                  {t.home.newsletter.submit}
                </button>
              </div>
              {invalid && (
                <p id={errorId} role='alert' className='text-[13px]/[1.5] text-vsta-danger-600'>
                  {field.state.meta.errors[0]?.message}
                </p>
              )}
            </div>
          );
        }}
      />
    </form>
  );
}

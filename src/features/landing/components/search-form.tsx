'use client';

import { toast } from 'sonner';
import { useI18n } from '@/i18n/provider';

/** Search has no results page yet, so submitting only tells the visitor. */
export function SearchForm({ children, ...props }: React.ComponentProps<'form'>) {
  const { t } = useI18n();

  return (
    <form
      role='search'
      {...props}
      onSubmit={(e) => {
        e.preventDefault();
        toast.info(t.common.searchPending);
      }}
    >
      {children}
    </form>
  );
}

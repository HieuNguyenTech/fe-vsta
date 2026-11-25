import { keepPreviousData, queryOptions } from '@tanstack/react-query';
import { getContacts } from './service';
import type { ContactFilters } from './types';

export const contactQueries = {
  all: () => ['contacts'] as const,
  list: (filters: ContactFilters) =>
    queryOptions({
      queryKey: [...contactQueries.all(), 'list', filters] as const,
      queryFn: () => getContacts(filters),
      placeholderData: keepPreviousData
    })
};

import { apiClient, type PaginatedResponse } from '@/lib/api-client';
import type { Contact, ContactFilters } from './types';

export function getContacts({ page, limit }: ContactFilters) {
  return apiClient<PaginatedResponse<Contact>>(`/contacts?page=${page}&limit=${limit}`);
}

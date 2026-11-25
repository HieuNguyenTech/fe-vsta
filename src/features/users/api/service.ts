import { apiClient, type PaginatedResponse } from '@/lib/api-client';
import type { CreateUserPayload, User, UserChanges, UserFilters } from './types';

export function getUsers({ page, limit }: UserFilters) {
  return apiClient<PaginatedResponse<User>>(`/backend/users?page=${page}&limit=${limit}`);
}

export async function createUser(payload: CreateUserPayload) {
  return apiClient('/backend/users', { method: 'POST', body: JSON.stringify(payload) });
}

export async function updateUser(id: string, { details, roleIds }: UserChanges) {
  if (details) {
    await apiClient(`/backend/users/${id}`, { method: 'PATCH', body: JSON.stringify(details) });
  }
  if (roleIds) {
    await apiClient(`/backend/users/${id}/roles`, {
      method: 'PUT',
      body: JSON.stringify({ roleIds })
    });
  }
}

export async function deleteUser(id: string) {
  return apiClient(`/backend/users/${id}`, { method: 'DELETE' });
}

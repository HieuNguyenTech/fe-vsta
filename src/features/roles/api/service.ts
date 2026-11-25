import { apiClient, type ApiResponse } from '@/lib/api-client';
import type { CreateRolePayload, Role, UpdateRolePayload } from './types';

export async function getRoles() {
  return (await apiClient<ApiResponse<Role[]>>('/backend/roles')).data;
}

/** Every permission the backend knows about. */
export async function getPermissions() {
  return (await apiClient<ApiResponse<string[]>>('/backend/permissions')).data;
}

export async function createRole(payload: CreateRolePayload) {
  return apiClient('/backend/roles', { method: 'POST', body: JSON.stringify(payload) });
}

export async function updateRole(id: string, payload: UpdateRolePayload) {
  return apiClient(`/backend/roles/${id}`, { method: 'PATCH', body: JSON.stringify(payload) });
}

export async function deleteRole(id: string) {
  return apiClient(`/backend/roles/${id}`, { method: 'DELETE' });
}

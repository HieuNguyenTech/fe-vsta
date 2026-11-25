import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { createRole, deleteRole, getPermissions, getRoles, updateRole } from './service';
import type { CreateRolePayload, UpdateRolePayload } from './types';

export const roleQueries = {
  all: () => ['roles'] as const,
  list: () =>
    queryOptions({ queryKey: [...roleQueries.all(), 'list'] as const, queryFn: getRoles }),
  permissions: () => queryOptions({ queryKey: ['permissions'] as const, queryFn: getPermissions })
};

export const roleMutations = {
  create: () => mutationOptions({ mutationFn: (data: CreateRolePayload) => createRole(data) }),
  update: () =>
    mutationOptions({
      mutationFn: ({ id, values }: { id: string; values: UpdateRolePayload }) =>
        updateRole(id, values)
    }),
  delete: () => mutationOptions({ mutationFn: (id: string) => deleteRole(id) })
};

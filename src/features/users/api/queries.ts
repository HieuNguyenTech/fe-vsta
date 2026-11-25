import { keepPreviousData, mutationOptions, queryOptions } from '@tanstack/react-query';
import { createUser, deleteUser, getUsers, updateUser } from './service';
import type { CreateUserPayload, User, UserChanges, UserFilters } from './types';

export type { User };

// Reads: query key + fetcher in one place. These run in the browser only.
// Invalidate everything for this entity with userQueries.all().
export const userQueries = {
  all: () => ['users'] as const,
  list: (filters: UserFilters) =>
    queryOptions({
      queryKey: [...userQueries.all(), 'list', filters] as const,
      queryFn: () => getUsers(filters),
      placeholderData: keepPreviousData
    })
};

// Writes: only the mutationFn. Components add onSuccess/onError/onSettled,
// including cache invalidation, so everything that happens after a mutation is in one place.
export const userMutations = {
  create: () => mutationOptions({ mutationFn: (data: CreateUserPayload) => createUser(data) }),
  update: () =>
    mutationOptions({
      mutationFn: ({ id, changes }: { id: string; changes: UserChanges }) => updateUser(id, changes)
    }),
  delete: () => mutationOptions({ mutationFn: (id: string) => deleteUser(id) })
};

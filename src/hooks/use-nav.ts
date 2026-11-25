'use client';

import { useMemo } from 'react';
import { useAuth } from '@/features/auth/components/auth-provider';
import type { NavItem, NavGroup } from '@/types';

type Can = ReturnType<typeof useAuth>['can'];

// Only `access.permission` is supported.
function filterItems(items: NavItem[], can: Can): NavItem[] {
  return items
    .filter((item) => !item.access?.permission || can(item.access.permission))
    .map((item) => (item.items ? { ...item, items: filterItems(item.items, can) } : item));
}

export function useFilteredNavItems(items: NavItem[]) {
  const { can } = useAuth();
  return useMemo(() => filterItems(items, can), [items, can]);
}

export function useFilteredNavGroups(groups: NavGroup[]) {
  const { can } = useAuth();
  return useMemo(
    () =>
      groups
        .map((group) => ({ ...group, items: filterItems(group.items, can) }))
        .filter((group) => group.items.length > 0),
    [groups, can]
  );
}

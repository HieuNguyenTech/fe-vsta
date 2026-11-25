import { hasPermissions } from '@/features/auth/permissions';
import type { CurrentUser } from '@/features/auth/types';
import type { Role } from './api/types';

/** Same rule as the backend: nobody hands out or changes more access than they have. */
export function canGrant(actor: CurrentUser, role: Role) {
  if (actor.isSuperAdmin) return true;
  const isSuperAdminRole = role.isSystem && role.slug === 'super_admin';
  return !isSuperAdminRole && hasPermissions(actor, ...role.permissions);
}

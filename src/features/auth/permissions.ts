import type { CurrentUser } from './types';

/** Mirrors the permission names declared by the backend. */
export const PERMISSIONS = {
  userRead: 'user:read',
  userManage: 'user:manage',
  roleRead: 'role:read',
  roleManage: 'role:manage',
  contactRead: 'contact:read',
  contactManage: 'contact:manage'
} as const;

// UI convenience only: the backend enforces every permission on its own.
export function hasPermissions(user: CurrentUser, ...required: string[]) {
  return user.isSuperAdmin || required.every((permission) => user.permissions.includes(permission));
}

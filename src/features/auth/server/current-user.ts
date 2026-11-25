// Server only.
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import { hasPermissions } from '../permissions';
import type { CurrentUser } from '../types';
import { backendFetch } from './backend';
import { ACCESS_COOKIE } from './cookies';

/** The signed-in user, or null. Fetched once per request. */
export const getCurrentUser = cache(async (): Promise<CurrentUser | null> => {
  const accessToken = (await cookies()).get(ACCESS_COOKIE)?.value;
  if (!accessToken) return null;

  const forwardedFor = (await headers()).get('x-forwarded-for');
  const res = await backendFetch('/auth/me', { accessToken, forwardedFor });
  if (res.status === 401) return null;
  if (!res.ok) throw new Error(`Cannot load the current user (${res.status})`);

  const { data } = (await res.json()) as { data: CurrentUser };
  return data;
});

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');
  return user;
}

/** For pages: pass the result to `<PageContainer access={...}>`. */
export async function canAccess(...permissions: string[]) {
  return hasPermissions(await requireUser(), ...permissions);
}

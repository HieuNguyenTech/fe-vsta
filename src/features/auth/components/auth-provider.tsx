'use client';

import { createContext, useContext, useMemo } from 'react';
import { hasPermissions } from '../permissions';
import type { CurrentUser } from '../types';

type Auth = {
  user: CurrentUser;
  can: (...permissions: string[]) => boolean;
};

const AuthContext = createContext<Auth | null>(null);

export function AuthProvider({ user, children }: { user: CurrentUser; children: React.ReactNode }) {
  const auth = useMemo<Auth>(
    () => ({ user, can: (...permissions) => hasPermissions(user, ...permissions) }),
    [user]
  );

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const auth = useContext(AuthContext);
  if (!auth) throw new Error('useAuth must be used inside AuthProvider');
  return auth;
}

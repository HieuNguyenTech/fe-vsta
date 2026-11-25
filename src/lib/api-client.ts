const BASE_URL = '/api';

export type ApiResponse<T> = { data: T };

export type PaginatedResponse<T> = {
  data: T[];
  meta: { total: number; page: number; limit: number; totalPages: number };
};

export class ApiError extends Error {
  constructor(
    readonly status: number,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/** Browser-side calls to this app's own `/api` routes. */
export async function apiClient<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: options?.body ? { 'Content-Type': 'application/json' } : undefined,
    ...options
  });

  if (!res.ok) {
    // The session ended: go back to the login page. A failed login is not that case.
    if (res.status === 401 && endpoint !== '/auth/login') window.location.assign('/login');

    const body = (await res.json().catch(() => null)) as { message?: string | string[] } | null;
    const message = [body?.message ?? []].flat().join(', ');
    throw new ApiError(res.status, message || `Request failed (${res.status})`);
  }

  return res.json() as Promise<T>;
}

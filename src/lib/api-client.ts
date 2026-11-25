const BASE_URL = (process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:8000').replace(
  /\/$/,
  ''
);

export type ApiResponse<T> = { data: T };

export type PaginatedResponse<T> = {
  data: T[];
  meta: { total: number; page: number; limit: number; totalPages: number };
};

/** Common response envelope returned by the CMS backend. */
export type ApiResult<T> = ApiResponse<T>;

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
  const path = endpoint.startsWith('/backend/') ? endpoint.slice('/backend'.length) : endpoint;
  const accessToken =
    typeof document !== 'undefined'
      ? document.cookie.match(/(?:^|; )cms_access=([^;]*)/)?.[1]
      : undefined;
  const headers = new Headers(options?.headers);
  if (options?.body) headers.set('Content-Type', 'application/json');
  if (accessToken) headers.set('Authorization', `Bearer ${decodeURIComponent(accessToken)}`);

  const res = await fetch(`${BASE_URL}${path}`, {
    headers,
    ...options
  });

  if (!res.ok) {
    // The session ended: go back to the login page. A failed login is not that case.
    if (res.status === 401 && endpoint !== '/auth/login') window.location.assign('/login');

    const body = (await res.json().catch(() => null)) as {
      message?: string | string[];
      error?: { message?: string | string[] };
    } | null;
    const message = [body?.error?.message ?? body?.message ?? []].flat().join(', ');
    throw new ApiError(res.status, message || `Request failed (${res.status})`);
  }

  return res.json() as Promise<T>;
}

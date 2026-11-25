// Server only.
import { backendFetch } from './backend';
import type { Tokens } from './cookies';

export type RefreshResult =
  | { status: 'ok'; tokens: Tokens }
  /** The session is over: sign the user out. */
  | { status: 'expired' }
  /** Backend down or busy: keep the cookies and try again later. */
  | { status: 'unavailable' };

/** How long late requests that still carry the old token get the same answer. */
const REUSE_MS = 30_000;

// A refresh token works only once, so requests arriving together must share one call.
// This map is per process: several frontend instances need sticky sessions or a shared store.
const pending = new Map<string, Promise<RefreshResult>>();

async function requestRefresh(
  refreshToken: string,
  forwardedFor: string | null
): Promise<RefreshResult> {
  try {
    const res = await backendFetch('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
      forwardedFor
    });
    if (res.ok) {
      const { data } = (await res.json()) as { data: Tokens };
      return { status: 'ok', tokens: data };
    }
    return { status: res.status === 400 || res.status === 401 ? 'expired' : 'unavailable' };
  } catch {
    return { status: 'unavailable' };
  }
}

export function refreshSession(refreshToken: string, forwardedFor: string | null) {
  let result = pending.get(refreshToken);
  if (!result) {
    result = requestRefresh(refreshToken, forwardedFor);
    pending.set(refreshToken, result);
    void result.then(({ status }) => {
      if (status === 'unavailable') pending.delete(refreshToken);
      else setTimeout(() => pending.delete(refreshToken), REUSE_MS);
    });
  }
  return result;
}

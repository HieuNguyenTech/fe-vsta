// Server only: talks to the CMS backend. Never import this from a client component.
const BACKEND_URL = (process.env.BACKEND_URL ?? 'http://localhost:8000').replace(/\/$/, '');

type BackendRequest = {
  method?: string;
  body?: string;
  accessToken?: string;
  /** Incoming `x-forwarded-for`, so the backend can rate limit per visitor. */
  forwardedFor?: string | null;
};

export function backendFetch(path: string, request: BackendRequest = {}) {
  const { method = 'GET', body, accessToken, forwardedFor } = request;
  const headers = new Headers();
  // Fastify rejects a JSON content type with an empty body, so only send it with one.
  if (body) headers.set('content-type', 'application/json');
  if (accessToken) headers.set('authorization', `Bearer ${accessToken}`);
  if (forwardedFor) headers.set('x-forwarded-for', forwardedFor);

  return fetch(`${BACKEND_URL}${path}`, {
    method,
    headers,
    body: body || undefined,
    cache: 'no-store',
    signal: AbortSignal.timeout(15_000)
  });
}

export function unavailableResponse() {
  return Response.json(
    { statusCode: 502, message: 'Cannot reach the server. Try again.' },
    { status: 502 }
  );
}

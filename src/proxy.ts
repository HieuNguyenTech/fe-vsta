import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ACCESS_COOKIE, REFRESH_COOKIE, tokenCookies } from '@/features/auth/server/cookies';
import { refreshSession } from '@/features/auth/server/refresh';

/**
 * The one place where expired access tokens are renewed, before pages and API calls run.
 * Whether a token is actually valid is checked by the backend.
 */
export async function proxy(request: NextRequest) {
  const refreshToken = request.cookies.get(REFRESH_COOKIE)?.value;

  if (!request.cookies.has(ACCESS_COOKIE) && refreshToken) {
    const result = await refreshSession(refreshToken, request.headers.get('x-forwarded-for'));

    if (result.status === 'ok') {
      const cookies = tokenCookies(result.tokens);
      // Updating the request lets this same render see the new token.
      cookies.forEach(({ name, value }) => request.cookies.set(name, value));
      const response = nextOrLogin(request);
      cookies.forEach((cookie) => response.cookies.set(cookie));
      return response;
    }

    if (result.status === 'expired') {
      request.cookies.delete(REFRESH_COOKIE);
      const response = nextOrLogin(request);
      response.cookies.delete(REFRESH_COOKIE);
      return response;
    }
  }

  return nextOrLogin(request);
}

/** Sends visitors without any token away from the dashboard. */
function nextOrLogin(request: NextRequest) {
  const signedOut = !request.cookies.has(ACCESS_COOKIE) && !request.cookies.has(REFRESH_COOKIE);
  if (signedOut && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next({ request: { headers: request.headers } });
}

// `/api/auth/*` is left out: those routes set the cookies themselves.
export const config = {
  matcher: ['/login', '/dashboard/:path*', '/api/backend/:path*']
};

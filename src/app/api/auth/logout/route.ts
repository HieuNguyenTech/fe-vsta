import { NextRequest, NextResponse } from 'next/server';
import { backendFetch } from '@/features/auth/server/backend';
import { ACCESS_COOKIE, REFRESH_COOKIE } from '@/features/auth/server/cookies';
import { refreshSession } from '@/features/auth/server/refresh';

export async function POST(request: NextRequest) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  let accessToken = request.cookies.get(ACCESS_COOKIE)?.value;
  const refreshToken = request.cookies.get(REFRESH_COOKIE)?.value;

  // Ending the session on the backend needs a valid access token.
  if (!accessToken && refreshToken) {
    const result = await refreshSession(refreshToken, forwardedFor);
    if (result.status === 'ok') accessToken = result.tokens.accessToken;
  }
  if (accessToken) {
    // Sign out locally even if the backend cannot be reached.
    await backendFetch('/auth/logout', { method: 'POST', accessToken, forwardedFor }).catch(
      () => null
    );
  }

  const response = NextResponse.json({ data: null });
  response.cookies.delete(ACCESS_COOKIE);
  response.cookies.delete(REFRESH_COOKIE);
  return response;
}

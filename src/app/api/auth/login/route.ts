import { NextRequest, NextResponse } from 'next/server';
import { backendFetch, unavailableResponse } from '@/features/auth/server/backend';
import { tokenCookies, type Tokens } from '@/features/auth/server/cookies';

export async function POST(request: NextRequest) {
  try {
    const res = await backendFetch('/auth/login', {
      method: 'POST',
      body: await request.text(),
      forwardedFor: request.headers.get('x-forwarded-for')
    });
    const body = await res.json();
    if (!res.ok) return NextResponse.json(body, { status: res.status });

    // The tokens stay in cookies and are never part of the response body.
    const response = NextResponse.json({ data: null });
    tokenCookies((body as { data: Tokens }).data).forEach((cookie) => response.cookies.set(cookie));
    return response;
  } catch {
    return unavailableResponse();
  }
}

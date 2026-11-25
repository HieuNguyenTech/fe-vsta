import { NextRequest, NextResponse } from 'next/server';
import { backendFetch, unavailableResponse } from '@/features/auth/server/backend';
import { ACCESS_COOKIE } from '@/features/auth/server/cookies';

/** Only these backend resources are reachable from the browser. Add new modules here. */
const ALLOWED = new Set(['users', 'roles', 'permissions']);

async function forward(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const { path } = await context.params;
  if (!ALLOWED.has(path[0]) || path.some((segment) => segment === '.' || segment === '..')) {
    return NextResponse.json({ statusCode: 404, message: 'Not found' }, { status: 404 });
  }

  const accessToken = request.cookies.get(ACCESS_COOKIE)?.value;
  if (!accessToken) {
    return NextResponse.json(
      { statusCode: 401, message: 'Authentication required' },
      { status: 401 }
    );
  }

  const target = `/${path.map(encodeURIComponent).join('/')}${request.nextUrl.search}`;
  try {
    const res = await backendFetch(target, {
      method: request.method,
      body: request.method === 'GET' ? undefined : await request.text(),
      accessToken,
      forwardedFor: request.headers.get('x-forwarded-for')
    });
    return new NextResponse(await res.text(), {
      status: res.status,
      headers: { 'content-type': res.headers.get('content-type') ?? 'application/json' }
    });
  } catch {
    return unavailableResponse();
  }
}

export { forward as GET, forward as POST, forward as PUT, forward as PATCH, forward as DELETE };

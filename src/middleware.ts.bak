import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SITE_PASSWORD = process.env.SITE_PASSWORD || 'demo123';
const AUTH_COOKIE_NAME = 'site_auth';

export function middleware(request: NextRequest) {
  // Skip middleware for API routes and static files
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/api') ||
    request.nextUrl.pathname.includes('.') ||
    request.nextUrl.pathname === '/password'
  ) {
    return NextResponse.next();
  }

  // Check for auth cookie
  const authCookie = request.cookies.get(AUTH_COOKIE_NAME);

  if (authCookie?.value === 'authenticated') {
    return NextResponse.next();
  }

  // Redirect to password page
  const url = request.nextUrl.clone();
  url.pathname = '/password';
  url.searchParams.set('redirect', request.nextUrl.pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

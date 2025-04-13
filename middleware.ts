import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  // If user is not logged in, redirect to signin
  if (!token && request.nextUrl.pathname.startsWith('/members')) {
    const signInUrl = new URL('/auth/signin', request.url);
    signInUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  // If user doesn't have an active subscription, redirect to tools page
  if (token && !token.hasActiveSubscription && request.nextUrl.pathname.startsWith('/members')) {
    const toolsUrl = new URL('/tools', request.url);
    toolsUrl.searchParams.set('error', 'membership_required');
    return NextResponse.redirect(toolsUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/members/:path*']
}; 
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This middleware ensures that responses are properly handled
export function middleware(request: NextRequest) {
  // Return early for static assets and API routes that need direct handling
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/api/') ||
    request.nextUrl.pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Set appropriate headers to help with async response handling
  const headers = new Headers(request.headers);
  headers.set('x-middleware-cache', 'no-cache');

  return NextResponse.next({
    request: {
      headers,
    },
  });
}

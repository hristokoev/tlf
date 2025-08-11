import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // If accessing root path, redirect to default language
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/cs', request.url))
  }

  // Continue with normal routing for all other paths
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all paths except API routes, static files, and admin
    '/((?!api|_next/static|_next/image|favicon.ico|admin).*)',
  ],
}

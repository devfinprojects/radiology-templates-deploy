import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Session cookie name
const SESSION_COOKIE = 'radiology-session'

// Public paths that don't require authentication
const PUBLIC_PATHS = ['/login', '/api/auth/login', '/api/auth/logout', '/api/auth/check']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const sessionCookie = request.cookies.get(SESSION_COOKIE)?.value
  
  // Check if the path is public
  const isPublicPath = PUBLIC_PATHS.some(path => pathname === path || pathname.startsWith(path + '/'))
  
  // If trying to access protected route without session, redirect to login
  if (!sessionCookie && !isPublicPath) {
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }
  
  // If trying to access login page with session, redirect to home
  if (sessionCookie && pathname === '/login') {
    const homeUrl = new URL('/', request.url)
    return NextResponse.redirect(homeUrl)
  }
  
  return NextResponse.next()
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}

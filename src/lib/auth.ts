import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { SESSION_COOKIE, SESSION_DURATION, DEFAULT_CREDENTIALS } from './constants'

// Session token generator using crypto API (more secure than Math.random)
export function generateSessionToken(): string {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('')
}

// Verify credentials with environment variable support
export function verifyCredentials(username: string, password: string): boolean {
  // In production, use environment variables or a secure auth provider
  if (process.env.AUTH_USERNAME && process.env.AUTH_PASSWORD) {
    return (
      username === process.env.AUTH_USERNAME &&
      password === process.env.AUTH_PASSWORD
    )
  }
  return (
    username === DEFAULT_CREDENTIALS.username &&
    password === DEFAULT_CREDENTIALS.password
  )
}

// Set session cookie with security options
export async function setSessionCookie(token: string) {
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION / 1000,
    path: '/',
  })
}

// Get session cookie
export async function getSessionCookie(): Promise<string | undefined> {
  const cookieStore = await cookies()
  return cookieStore.get(SESSION_COOKIE)?.value
}

// Clear session cookie
export async function clearSessionCookie() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
}

// Check if user is authenticated
export async function isAuthenticated(): Promise<boolean> {
  const token = await getSessionCookie()
  return !!token
}

// Middleware helper to check auth
export async function checkAuth(
  request: NextRequest
): Promise<NextResponse | null> {
  const sessionCookie = request.cookies.get(SESSION_COOKIE)?.value
  const isLoginPage = request.nextUrl.pathname === '/login'

  if (!sessionCookie && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (sessionCookie && isLoginPage) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return null
}

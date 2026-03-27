import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

// Default credentials
export const DEFAULT_CREDENTIALS = {
  username: 'admin',
  password: 'password'
}

// Session cookie name
export const SESSION_COOKIE = 'radiology-session'

// Session duration (24 hours)
export const SESSION_DURATION = 24 * 60 * 60 * 1000

// Simple session token generator
export function generateSessionToken(): string {
  return Buffer.from(
    Math.random().toString(36).substring(2) + 
    Date.now().toString(36) + 
    Math.random().toString(36).substring(2)
  ).toString('base64')
}

// Verify credentials
export function verifyCredentials(username: string, password: string): boolean {
  return username === DEFAULT_CREDENTIALS.username && password === DEFAULT_CREDENTIALS.password
}

// Set session cookie
export async function setSessionCookie(token: string) {
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION / 1000,
    path: '/'
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
export async function checkAuth(request: NextRequest): Promise<NextResponse | null> {
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

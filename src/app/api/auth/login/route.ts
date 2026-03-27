import { NextRequest, NextResponse } from 'next/server'
import { verifyCredentials, generateSessionToken, setSessionCookie } from '@/lib/auth'
export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()
    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      )
    }
    // Verify credentials
    if (!verifyCredentials(username, password)) {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      )
    }
    // Generate session token
    const sessionToken = generateSessionToken()
    // Set session cookie
    await setSessionCookie(sessionToken)
    return NextResponse.json(
      { success: true, message: 'Login successful' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'An error occurred during login' },
      { status: 500 }
    )
  }
}

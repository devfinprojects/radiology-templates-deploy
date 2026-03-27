import { NextRequest, NextResponse } from 'next/server'
import { clearSessionCookie } from '@/lib/auth'
export async function POST(request: NextRequest) {
  try {
    await clearSessionCookie()
    
    const response = NextResponse.json(
      { success: true, message: 'Logged out successfully' },
      { status: 200 }
    )
    
    // Also clear the cookie in the response
    response.cookies.set('radiology-session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/'
    })
    
    return response
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'An error occurred during logout' },
      { status: 500 }
    )
  }
}
// Also support GET for simpler logout
export async function GET(request: NextRequest) {
  try {
    await clearSessionCookie()
    
    const response = NextResponse.redirect(new URL('/login', request.url))
    
    // Clear the cookie in the response
    response.cookies.set('radiology-session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/'
    })
    
    return response
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

// Login API route
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()
    const { email, password } = body

    // TODO: Add database logic later
    // For now, return mock response
    
    return NextResponse.json({
      success: true,
      message: 'Login successful',
      user: {
        id: '1',
        name: 'Test User',
        email: email,
        role: 'seeker'
      }
    })
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}
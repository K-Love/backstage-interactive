import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Log the submission for testing
    console.log('Form submission received:', data)
    
    // Simulate a slight delay (optional, for testing loading state)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    return NextResponse.json({ 
      message: 'Success',
      data: data 
    }, { status: 200 })
  } catch (error) {
    console.error('Contact form submission error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
// app/api/contact/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Store the contact form submission in the database
    await prisma.contactSubmission.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        company: data.company,
        title: data.title,
        email: data.email,
        source: data.source,
        category: data.category,
        message: data.message,
      },
    })
    
    return NextResponse.json({ message: 'Success' }, { status: 200 })
  } catch (error) {
    console.error('Contact form submission error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
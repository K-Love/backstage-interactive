import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { ContactFormSchema } from '@/lib/validation/contact'

// Create reusable transporter using SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.eu',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD
  },
  debug: true,
  logger: true
})

export async function POST(request: Request) {
  // Add more detailed logging
  console.log('Starting email process...')
  console.log('Environment Variables Check:', {
    EMAIL_USER: process.env.EMAIL_USER ? 'Set' : 'Not Set',
    EMAIL_APP_PASSWORD: process.env.EMAIL_APP_PASSWORD ? 'Set' : 'Not Set',
    EMAIL_USER_VALUE: process.env.EMAIL_USER // Log the actual email (be careful with this in production)
  })

  try {
    // Test SMTP connection first
    console.log('Verifying SMTP connection...')
    await transporter.verify()
    console.log('SMTP connection verified successfully')

    const body = await request.json()
    console.log('Received form data:', body)
    
    // Validate the input
    const result = ContactFormSchema.safeParse(body)
    if (!result.success) {
      console.error('Validation error:', result.error)
      return NextResponse.json(
        { error: 'Invalid form data', details: result.error.flatten() },
        { status: 400 }
      )
    }

    const { firstName, lastName, company, title, email, source, category, thoughts } = result.data

    // Log environment variables (remove sensitive info in production)
    console.log('Environment check:', {
      hasEmailUser: !!process.env.EMAIL_USER,
      hasEmailAppPassword: !!process.env.EMAIL_APP_PASSWORD,
      emailUser: process.env.EMAIL_USER
    })

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself
      subject: `New Contact Form Submission - ${category}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
        ${title ? `<p><strong>Title:</strong> ${title}</p>` : ''}
        <p><strong>Source:</strong> ${source}</p>
        <p><strong>Category:</strong> ${category}</p>
        <p><strong>Message:</strong></p>
        <p>${thoughts}</p>
      `
    }

    console.log('Attempting to send email...')
    try {
      const info = await transporter.sendMail(mailOptions)
      console.log('Email sent successfully:', info)
    } catch (emailError: any) {
      console.error('Email sending failed:', emailError)
      throw new Error(`Email sending failed: ${emailError?.message || 'Unknown error'}`)
    }

    return NextResponse.json(
      { message: 'Form submitted successfully' },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Detailed form submission error:', error)
    return NextResponse.json(
      { error: 'Failed to submit form', details: error?.message || 'Unknown error' },
      { status: 500 }
    )
  }
}
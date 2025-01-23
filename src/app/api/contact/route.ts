import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { ContactFormSchema } from '@/lib/validation/contact'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate the input
    const result = ContactFormSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid form data', details: result.error.flatten() },
        { status: 400 }
      )
    }

    const { firstName, lastName, company, title, email, source, category, thoughts } = result.data

    // Send notification email to business
    await resend.emails.send({
      from: 'Contact Form <contact@yourdomain.com>',
      to: 'info@backstageinteractive.com',
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
      `,
    })

    // Send confirmation email to user
    await resend.emails.send({
      from: 'Backstage Interactive <no-reply@yourdomain.com>',
      to: email,
      subject: 'We've Received Your Message',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1e40af; margin-bottom: 24px;">Thank You for Contacting Us</h1>
          
          <p>Dear ${firstName},</p>
          
          <p>Thank you for reaching out to Backstage Interactive. We've received your message regarding ${category.toLowerCase()} and will get back to you as soon as possible.</p>
          
          <h2 style="color: #1e40af; margin-top: 32px;">Your Message Details</h2>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 16px 0;">
            <p><strong>Category:</strong> ${category}</p>
            <p><strong>Message:</strong></p>
            <p style="margin-left: 16px;">${thoughts}</p>
          </div>
          
          <p style="margin-top: 32px;">Our team typically responds within 1-2 business days. If you have any urgent matters, please don't hesitate to call us directly.</p>
          
          <p style="margin-top: 32px;">Best regards,<br>The Backstage Interactive Team</p>
          
          <div style="margin-top: 48px; padding-top: 24px; border-top: 1px solid #e5e7eb; font-size: 14px; color: #6b7280;">
            <p>This is an automated response to your contact form submission. Please do not reply to this email.</p>
          </div>
        </div>
      `,
    })

    return NextResponse.json(
      { message: 'Form submitted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Form submission error:', error)
    return NextResponse.json(
      { error: 'Failed to submit form' },
      { status: 500 }
    )
  }
}
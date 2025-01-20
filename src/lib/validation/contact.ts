// src/lib/validation/contact.ts
import { z } from 'zod'

export const ContactFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  company: z.string().optional(),
  title: z.string().optional(),
  email: z.string().email('Invalid email address'),
  source: z.string().min(1, 'Please select how you heard about us'),
  category: z.string().min(1, 'Please select an inquiry category'),
  thoughts: z.string().min(1, 'Please share your thoughts')
})

export type ContactFormData = z.infer<typeof ContactFormSchema>

// src/app/api/contact/route.ts
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

    // Send email using Resend
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

// Updated ContactForm.tsx (only showing the modified parts)
'use client'

import { useState } from 'react'
import { ContactFormData } from '@/lib/validation/contact'

export default function ContactForm() {
  // ... (previous state and other code remains the same)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }
      
      setStatus('success')
      setFormData({
        firstName: '',
        lastName: '',
        company: '',
        title: '',
        email: '',
        source: '',
        category: '',
        thoughts: ''
      })
    } catch (error) {
      console.error('Form submission error:', error)
      setStatus('error')
    }
  }

  // ... (rest of the component remains the same)
}
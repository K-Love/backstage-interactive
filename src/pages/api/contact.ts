import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const {
      firstName,
      lastName,
      company,
      title,
      email,
      source,
      category,
      thoughts
    } = req.body

    // Validate required fields
    if (!firstName || !lastName || !email || !thoughts) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    console.log('Creating email transporter with config:', {
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
      }
    })

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    })

    // Verify transporter
    try {
      await transporter.verify()
      console.log('SMTP connection verified successfully')
    } catch (verifyError) {
      console.error('SMTP verification failed:', verifyError)
      return res.status(500).json({ message: 'Email service configuration error' })
    }

    // Email content
    const mailOptions = {
      from: `"Backstage Interactive Contact" <${process.env.SMTP_USER}>`,
      to: 'kevin@backstageinteractive.com',
      replyTo: email,
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
        ${title ? `<p><strong>Title:</strong> ${title}</p>` : ''}
        <p><strong>Source:</strong> ${source}</p>
        <p><strong>Category:</strong> ${category}</p>
        <p><strong>Message:</strong></p>
        <p>${thoughts.replace(/\n/g, '<br>')}</p>
      `,
      text: `
New Contact Form Submission

Name: ${firstName} ${lastName}
Email: ${email}
${company ? `Company: ${company}\n` : ''}${title ? `Title: ${title}\n` : ''}
Source: ${source}
Category: ${category}

Message:
${thoughts}
      `.trim(),
    }

    console.log('Attempting to send email...')

    // Send email
    const info = await transporter.sendMail(mailOptions)
    console.log('Email sent successfully:', info.messageId)

    res.status(200).json({ message: 'Email sent successfully' })
  } catch (error: any) {
    console.error('Email error:', error)
    res.status(500).json({ 
      message: 'Failed to send email',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    })
  }
} 
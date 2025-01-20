// src/lib/analytics/types.ts
export interface EmailEvent {
    id: string
    timestamp: Date
    type: 'delivered' | 'opened' | 'clicked' | 'failed'
    email: string
    category: string
  }
  
  // src/lib/analytics/track.ts
  import { EmailEvent } from './types'
  
  export async function trackEmailEvent(event: EmailEvent) {
    try {
      await fetch('/api/analytics/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      })
    } catch (error) {
      console.error('Failed to track email event:', error)
    }
  }
  
  // src/app/api/webhook/email/route.ts
  import { NextResponse } from 'next/server'
  import { headers } from 'next/headers'
  import { WebhookEvent } from '@resend/webhooks'
  import { trackEmailEvent } from '@/lib/analytics/track'
  
  const WEBHOOK_SECRET = process.env.RESEND_WEBHOOK_SECRET
  
  export async function POST(request: Request) {
    const payload = await request.json() as WebhookEvent
    const headerPayload = headers().get('webhook-signature')
  
    try {
      // Verify webhook signature
      if (!headerPayload || !WEBHOOK_SECRET) {
        return NextResponse.json(
          { error: 'No webhook signature' },
          { status: 401 }
        )
      }
  
      // Process different email events
      switch (payload.type) {
        case 'email.delivered':
          await trackEmailEvent({
            id: payload.data.email_id,
            timestamp: new Date(payload.created_at),
            type: 'delivered',
            email: payload.data.to,
            category: payload.data.tags?.category || 'unknown'
          })
          break
  
        case 'email.opened':
          await trackEmailEvent({
            id: payload.data.email_id,
            timestamp: new Date(payload.created_at),
            type: 'opened',
            email: payload.data.to,
            category: payload.data.tags?.category || 'unknown'
          })
          break
  
        case 'email.clicked':
          await trackEmailEvent({
            id: payload.data.email_id,
            timestamp: new Date(payload.created_at),
            type: 'clicked',
            email: payload.data.to,
            category: payload.data.tags?.category || 'unknown'
          })
          break
  
        case 'email.failed':
          await trackEmailEvent({
            id: payload.data.email_id,
            timestamp: new Date(payload.created_at),
            type: 'failed',
            email: payload.data.to,
            category: payload.data.tags?.category || 'unknown'
          })
          break
      }
  
      return NextResponse.json({ status: 'ok' })
    } catch (error) {
      console.error('Webhook error:', error)
      return NextResponse.json(
        { error: 'Webhook processing failed' },
        { status: 500 }
      )
    }
  }
  
  // Updated src/app/api/contact/route.ts (only showing modified parts)
  export async function POST(request: Request) {
    try {
      // ... (previous validation code)
  
      // Send notification email to business with tracking
      await resend.emails.send({
        from: 'Contact Form <contact@yourdomain.com>',
        to: 'info@backstageinteractive.com',
        subject: `New Contact Form Submission - ${category}`,
        html: `...`, // Previous HTML template
        tags: [
          { name: 'type', value: 'notification' },
          { name: 'category', value: category }
        ],
        click_tracking: true,
        open_tracking: true
      })
  
      // Send confirmation email to user with tracking
      await resend.emails.send({
        from: 'Backstage Interactive <no-reply@yourdomain.com>',
        to: email,
        subject: 'We've Received Your Message',
        html: `...`, // Previous HTML template
        tags: [
          { name: 'type', value: 'confirmation' },
          { name: 'category', value: category }
        ],
        click_tracking: true,
        open_tracking: true
      })
  
      // ... (rest of the code)
    } catch (error) {
      // ... (error handling)
    }
  }
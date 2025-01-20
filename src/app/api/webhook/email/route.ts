// Updated src/app/api/webhook/email/route.ts
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { WebhookEvent } from '@resend/webhooks'
import { trackEmailEvent } from '@/lib/analytics/track'
import { connectDB } from '@/lib/db/connect'

export async function POST(request: Request) {
  await connectDB()
  
  const payload = await request.json() as WebhookEvent
  const headerPayload = headers().get('webhook-signature')
  const userAgent = headers().get('user-agent')
  
  try {
    // ... (previous verification code)

    const eventData = {
      id: payload.data.email_id,
      timestamp: new Date(payload.created_at),
      type: payload.type.replace('email.', '') as 'delivered' | 'opened' | 'clicked' | 'failed',
      email: payload.data.to,
      category: payload.data.tags?.category || 'unknown',
      formType: payload.data.tags?.type || 'unknown',
      deviceInfo: {
        userAgent,
        platform: getPlatformFromUA(userAgent),
        device: getDeviceFromUA(userAgent)
      },
      metadata: {
        ipAddress: request.headers.get('x-forwarded-for'),
        location: await getLocationFromIP(request.headers.get('x-forwarded-for'))
      },
      clickData: payload.type === 'email.clicked' ? {
        url: payload.data.links?.[0]?.url,
        timestamp: new Date(payload.created_at)
      } : undefined
    }

    await trackEmailEvent(eventData)

    return NextResponse.json({ status: 'ok' })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}
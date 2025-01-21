import { connectDB } from '../db/connect'
import { EmailEvent } from '../db/models/EmailEvent'
import type { EmailEventType } from './types'

export async function trackEmailEvent(eventData: EmailEventType) {
  try {
    await connectDB()

    const event = new EmailEvent({
      emailId: eventData.id,
      timestamp: eventData.timestamp,
      type: eventData.type,
      email: eventData.email,
      category: eventData.category,
      formType: eventData.formType,
      deviceInfo: eventData.deviceInfo,
      metadata: eventData.metadata,
      clickData: eventData.clickData
    })

    await event.save()

    if (eventData.type === 'failed') {
      await triggerFailureAlert(eventData)
    }

    return event
  } catch (error) {
    console.error('Failed to track email event:', error)
    throw error
  }
}

async function triggerFailureAlert(eventData: EmailEventType) {
  console.error('Email failure:', eventData)
  // Alert implementation coming in next feature
}
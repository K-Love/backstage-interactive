// src/lib/analytics/types.ts
export interface EmailEventType {
    id: string
    timestamp: Date
    type: 'delivered' | 'opened' | 'clicked' | 'failed'
    email: string
    category: string
    formType: 'notification' | 'confirmation'
    deviceInfo?: {
      userAgent?: string
      platform?: string
      device?: string
    }
    metadata?: {
      ipAddress?: string
      location?: {
        country?: string
        city?: string
      }
    }
    clickData?: {
      url?: string
      timestamp?: Date
    }
  }
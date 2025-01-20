// src/lib/analytics/types.ts
export interface EmailEvent {
    id: string
    timestamp: Date
    type: 'delivered' | 'opened' | 'clicked' | 'failed'
    email: string
    category: string
  }
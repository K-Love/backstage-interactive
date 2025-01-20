// src/lib/db/models/EmailEvent.ts
import mongoose from 'mongoose'

const emailEventSchema = new mongoose.Schema({
  emailId: { type: String, required: true, index: true },
  timestamp: { type: Date, required: true },
  type: {
    type: String,
    enum: ['delivered', 'opened', 'clicked', 'failed'],
    required: true
  },
  email: { type: String, required: true },
  category: { type: String, required: true },
  formType: { type: String, required: true }, // 'notification' or 'confirmation'
  deviceInfo: {
    userAgent: String,
    platform: String,
    device: String
  },
  metadata: {
    ipAddress: String,
    location: {
      country: String,
      city: String
    }
  },
  clickData: {
    url: String,
    timestamp: Date
  }
}, {
  timestamps: true
})

// Create indexes for common queries
emailEventSchema.index({ timestamp: -1 })
emailEventSchema.index({ email: 1, type: 1 })
emailEventSchema.index({ category: 1, type: 1 })

export const EmailEvent = mongoose.models.EmailEvent || 
  mongoose.model('EmailEvent', emailEventSchema)
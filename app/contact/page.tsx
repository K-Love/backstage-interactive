'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const contactFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  company: z.string().optional(),
  title: z.string().optional(),
  email: z.string().email('Invalid email address'),
  source: z.enum(['Search', 'YouTube', 'X', 'Facebook', 'Instagram', 'Referral', 'Other']),
  category: z.enum(['Web Development', 'AI', 'SEO', 'Social Media', 'Consulting', 'Other']),
  message: z.string().min(1, 'Message is required').max(1000, 'Message is too long'),
})

type ContactFormData = z.infer<typeof contactFormSchema>

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Submission failed')
      }

      setSubmitStatus('success')
      reset()
    } catch (error) {
      console.error('Contact form error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus('idle'), 5000)
    }
  }

  return (
    <div className="container max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
        Give Me a Holler
      </h1>

      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-900/50 border border-green-500 rounded-lg text-green-200">
          Message sent successfully! We'll get back to you soon.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-900/50 border border-red-500 rounded-lg text-red-200">
          Something went wrong. Please try again.
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-200">
              First Name <span className="text-purple-500">*</span>
            </label>
            <input
              {...register('firstName')}
              className={`w-full px-3 py-2 bg-gray-900 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors ${
                errors.firstName ? 'border-red-500' : 'border-gray-700'
              }`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-200">
              Last Name <span className="text-purple-500">*</span>
            </label>
            <input
              {...register('lastName')}
              className={`w-full px-3 py-2 bg-gray-900 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors ${
                errors.lastName ? 'border-red-500' : 'border-gray-700'
              }`}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-200">
              Company
            </label>
            <input
              {...register('company')}
              className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-200">
              Title
            </label>
            <input
              {...register('title')}
              className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-200">
            Email <span className="text-purple-500">*</span>
          </label>
          <input
            type="email"
            {...register('email')}
            className={`w-full px-3 py-2 bg-gray-900 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors ${
              errors.email ? 'border-red-500' : 'border-gray-700'
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-200">
            How did you hear about BI? <span className="text-purple-500">*</span>
          </label>
          <select
            {...register('source')}
            className={`w-full px-3 py-2 bg-gray-900 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors ${
              errors.source ? 'border-red-500' : 'border-gray-700'
            }`}
          >
            <option value="">Please Select</option>
            <option value="Search">Search</option>
            <option value="YouTube">YouTube</option>
            <option value="X">X</option>
            <option value="Facebook">Facebook</option>
            <option value="Instagram">Instagram</option>
            <option value="Referral">Referral</option>
            <option value="Other">Other</option>
          </select>
          {errors.source && (
            <p className="text-red-500 text-sm mt-1">{errors.source.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-200">
            Which category best describes your inquiry? <span className="text-purple-500">*</span>
          </label>
          <select
            {...register('category')}
            className={`w-full px-3 py-2 bg-gray-900 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors ${
              errors.category ? 'border-red-500' : 'border-gray-700'
            }`}
          >
            <option value="">Please Select</option>
            <option value="Web Development">Web Development</option>
            <option value="AI">AI</option>
            <option value="SEO">SEO</option>
            <option value="Social Media">Social Media</option>
            <option value="Consulting">Consulting</option>
            <option value="Other">Other</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-200">
            Your Message <span className="text-purple-500">*</span>
          </label>
          <textarea
            {...register('message')}
            rows={4}
            className={`w-full px-3 py-2 bg-gray-900 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors ${
              errors.message ? 'border-red-500' : 'border-gray-700'
            }`}
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors disabled:opacity-50"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  )
}
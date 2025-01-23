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
  message: z.string().min(1, 'Message is required'),
})

type ContactFormData = z.infer<typeof contactFormSchema>

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

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
      // Replace with your actual API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitSuccess(true)
        reset()
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
      
      {submitSuccess ? (
        <div className="bg-green-50 p-4 rounded-md mb-6">
          <p className="text-green-800">Thank you for your message! We'll be in touch soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                {...register('firstName')}
                className="w-full p-2 border rounded-md"
                type="text"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                {...register('lastName')}
                className="w-full p-2 border rounded-md"
                type="text"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Company</label>
              <input
                {...register('company')}
                className="w-full p-2 border rounded-md"
                type="text"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                {...register('title')}
                className="w-full p-2 border rounded-md"
                type="text"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              {...register('email')}
              className="w-full p-2 border rounded-md"
              type="email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              How did you hear about BI? <span className="text-red-500">*</span>
            </label>
            <select
              {...register('source')}
              className="w-full p-2 border rounded-md"
              defaultValue=""
            >
              <option value="" disabled>Please Select</option>
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
            <label className="block text-sm font-medium mb-1">
              Which category best describes your inquiry? <span className="text-red-500">*</span>
            </label>
            <select
              {...register('category')}
              className="w-full p-2 border rounded-md"
              defaultValue=""
            >
              <option value="" disabled>Please Select</option>
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
            <label className="block text-sm font-medium mb-1">
              Your Thoughts <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register('message')}
              className="w-full p-2 border rounded-md h-32"
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Sending...' : 'Send'}
          </button>
        </form>
      )}
    </div>
  )
}
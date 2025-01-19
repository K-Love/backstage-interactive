'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

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

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

  // In the onSubmit function, add console.log for testing:
const onSubmit = async (data: ContactFormData) => {
  setIsSubmitting(true)
  try {
    console.log('Submitting form data:', data)
    
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const result = await response.json()
    console.log('Server response:', result)

    if (!response.ok) {
      throw new Error(result.message || 'Submission failed')
    }

    toast.success('Message sent successfully! We\'ll get back to you soon.')
    reset()
  } catch (error) {
    console.error('Contact form error:', error)
    toast.error('Something went wrong. Please try again.')
  } finally {
    setIsSubmitting(false)
  }
}

  return (
    <div className="container max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
        Give Me a Holler
      </h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-200">
              First Name <span className="text-purple-500">*</span>
            </label>
            <Input
              {...register('firstName')}
              className={`bg-gray-900 border-gray-700 ${errors.firstName ? 'border-red-500' : ''}`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-200">
              Last Name <span className="text-purple-500">*</span>
            </label>
            <Input
              {...register('lastName')}
              className={`bg-gray-900 border-gray-700 ${errors.lastName ? 'border-red-500' : ''}`}
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
            <Input
              {...register('company')}
              className="bg-gray-900 border-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-200">
              Title
            </label>
            <Input
              {...register('title')}
              className="bg-gray-900 border-gray-700"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-200">
            Email <span className="text-purple-500">*</span>
          </label>
          <Input
            {...register('email')}
            type="email"
            className={`bg-gray-900 border-gray-700 ${errors.email ? 'border-red-500' : ''}`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-200">
            How did you hear about BI? <span className="text-purple-500">*</span>
          </label>
          <Select
            {...register('source')}
            className={`bg-gray-900 border-gray-700 ${errors.source ? 'border-red-500' : ''}`}
          >
            <option value="">Please Select</option>
            <option value="Search">Search</option>
            <option value="YouTube">YouTube</option>
            <option value="X">X</option>
            <option value="Facebook">Facebook</option>
            <option value="Instagram">Instagram</option>
            <option value="Referral">Referral</option>
            <option value="Other">Other</option>
          </Select>
          {errors.source && (
            <p className="text-red-500 text-sm mt-1">{errors.source.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-200">
            Which category best describes your inquiry? <span className="text-purple-500">*</span>
          </label>
          <Select
            {...register('category')}
            className={`bg-gray-900 border-gray-700 ${errors.category ? 'border-red-500' : ''}`}
          >
            <option value="">Please Select</option>
            <option value="Web Development">Web Development</option>
            <option value="AI">AI</option>
            <option value="SEO">SEO</option>
            <option value="Social Media">Social Media</option>
            <option value="Consulting">Consulting</option>
            <option value="Other">Other</option>
          </Select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-200">
            Your Thoughts <span className="text-purple-500">*</span>
          </label>
          <Textarea
            {...register('message')}
            className={`bg-gray-900 border-gray-700 h-32 ${errors.message ? 'border-red-500' : ''}`}
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-purple-600 hover:bg-purple-700 transition-colors"
        >
          {isSubmitting ? 'Sending...' : 'Send'}
        </Button>
      </form>
    </div>
  )
}
import { z } from 'zod'

export const ContactFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  company: z.string().optional(),
  title: z.string().optional(),
  email: z.string().email('Invalid email address'),
  source: z.string().min(1, 'Source is required'),
  category: z.string().min(1, 'Category is required'),
  thoughts: z.string().min(1, 'Message is required'),
})
import { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us | Backstage Interactive',
  description: 'Get in touch with Backstage Interactive. We'd love to hear from you.',
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Contact Us
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Have questions? We'd love to hear from you.
          </p>
        </div>
        <div className="mt-12">
          <ContactForm />
        </div>
      </div>
    </main>
  )
}
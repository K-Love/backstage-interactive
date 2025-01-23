import { Metadata } from 'next'
import ContactForm from 'src/components/sections/contact/ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us | Backstage Interactive',
  description: 'Get in Touch',
}

export default function ContactPage() {
    return (
      <main className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Contact
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Get in Touch
            </p>
          </div>
          <div className="mt-12">
            <ContactForm />
          </div>
        </div>
      </main>
    )
}
'use client'

import type { NextPage } from 'next'
import Head from 'next/head'
import ContactForm from '@/components/sections/contact/ContactForm'
import Layout from '@/components/layout/Layout'

const ContactPage: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Contact | Backstage Interactive</title>
        <meta 
          name="description" 
          content="Get in touch with Backstage Interactive for your web development and digital marketing needs." 
        />
      </Head>
      
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-magenta bg-clip-text text-transparent leading-tight md:leading-tight py-1">
              Let's Create Something Amazing
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Have a project in mind? I'd love to hear about it. Let's discuss how we can work together to bring your vision to life.
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10">
              <ContactForm />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default ContactPage
import { NextPage } from 'next'
import Head from 'next/head'
import ContactForm from '@/components/sections/contact/ContactForm'

const ContactPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Contact | Backstage Interactive</title>
        <meta 
          name="description" 
          content="Get in touch with Backstage Interactive for your web development and digital marketing needs." 
        />
      </Head>
      
      <div className="pt-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Contact Us</h1>
          <ContactForm />
        </div>
      </div>
    </>
  )
}

export default ContactPage
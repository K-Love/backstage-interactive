// src/app/contact/page.tsx
import React from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { colors } from '@/design-tokens';

export default function Contact() {
  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: colors.neutralBg }}>
      <Head>
        <title>Contact | Backstage Interactive</title>
        <meta name="description" content="Get in touch with Backstage Interactive for web development, design, and digital marketing inquiries." />
        <meta name="keywords" content="contact, web development, design, digital marketing" />
        <meta property="og:title" content="Contact | Backstage Interactive" />
        <meta property="og:description" content="Get in touch with Backstage Interactive for web development, design, and digital marketing inquiries." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Contact | Backstage Interactive" />
        <meta name="twitter:description" content="Get in touch with Backstage Interactive for web development, design, and digital marketing inquiries." />
      </Head>
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 px-4 text-center" style={{ backgroundColor: colors.primary, color: 'white' }}>
          <div className="container mx-auto">
            <h1 className="text-5xl font-bold mb-4">Let's Connect</h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">Have a question or ready to start a project? Reach out to us, and we'll get back to you as soon as possible.</p>
            {/* SVG Illustration Idea: A digital mailbox with incoming messages */}
            <div className="mt-8 h-64 flex items-center justify-center">
              <div className="text-accent2" style={{ color: colors.accent2 }}>
                {/* Placeholder for SVG or Three.js */}
                <span className="text-8xl">✉️</span>
              </div>
            </div>
          </div>
        </section>
        {/* Contact Form */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-2xl">
            <form className="space-y-6">
              <Input label="Name" placeholder="Enter your name" required />
              <Input label="Company" placeholder="Enter your company name" />
              <Input label="Title" placeholder="Enter your title" />
              <Input label="Email" type="email" placeholder="Enter your email" required />
              <div>
                <label className="block mb-2 text-sm font-medium" style={{ color: colors.neutralText }}>How did you hear about BI? <span className="text-red-500">*</span></label>
                <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" style={{ borderColor: colors.primaryLight, color: colors.neutralText }} required>
                  <option value="">[Placeholder: Please Select]</option>
                  <option value="search">Search</option>
                  <option value="youtube">YouTube</option>
                  <option value="x">X</option>
                  <option value="facebook">Facebook</option>
                  <option value="instagram">Instagram</option>
                  <option value="referral">Referral</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium" style={{ color: colors.neutralText }}>Which Category Best Describes Your Inquiry <span className="text-red-500">*</span></label>
                <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" style={{ borderColor: colors.primaryLight, color: colors.neutralText }} required>
                  <option value="">[Placeholder: Please Select]</option>
                  <option value="web-dev">Web Development</option>
                  <option value="ai">AI</option>
                  <option value="seo">SEO</option>
                  <option value="social-media">Social Media</option>
                  <option value="consulting">Consulting</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium" style={{ color: colors.neutralText }}>Your Thoughts</label>
                <textarea className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" rows={4} style={{ borderColor: colors.primaryLight, color: colors.neutralText }} placeholder="Share your thoughts or questions"></textarea>
              </div>
              <div className="text-center">
                <Button variant="primary" size="medium">Send</Button>
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
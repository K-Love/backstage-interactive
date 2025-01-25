'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    title: '',
    email: '',
    source: '',
    category: '',
    thoughts: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    
    try {
      // Replace YOUR_FORM_ID with the actual form ID from Formspree
      const response = await fetch('https://formspree.io/f/xnnjnzzo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to send message')
      }
      
      setStatus('success')
      setFormData({
        firstName: '',
        lastName: '',
        company: '',
        title: '',
        email: '',
        source: '',
        category: '',
        thoughts: ''
      })
    } catch (error) {
      console.error('Form submission error:', error)
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 py-2 px-3 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Last Name *
          </label>
          <input
            type="text"
            id="lastName"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 py-2 px-3 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700">
            Company
          </label>
          <input
            type="text"
            id="company"
            className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 py-2 px-3 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 py-2 px-3 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email *
        </label>
        <input
          type="email"
          id="email"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 py-2 px-3 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="source" className="block text-sm font-medium text-gray-700">
          How did you hear about BI? *
        </label>
        <select
          id="source"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 py-2 px-3 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={formData.source}
          onChange={(e) => setFormData({ ...formData, source: e.target.value })}
        >
          <option value="">Please Select</option>
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
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Which category best describes your inquiry? *
        </label>
        <select
          id="category"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 py-2 px-3 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        >
          <option value="">Please Select</option>
          <option value="web-development">Web Development</option>
          <option value="ai">AI</option>
          <option value="seo">SEO</option>
          <option value="social-media">Social Media</option>
          <option value="consulting">Consulting</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="thoughts" className="block text-sm font-medium text-gray-700">
          Your Thoughts *
        </label>
        <textarea
          id="thoughts"
          required
          rows={4}
          className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 py-2 px-3 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={formData.thoughts}
          onChange={(e) => setFormData({ ...formData, thoughts: e.target.value })}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {status === 'loading' ? 'Sending...' : 'Send'}
      </button>

      {status === 'success' && (
        <p className="text-green-600 text-sm">Message sent successfully!</p>
      )}
      {status === 'error' && (
        <p className="text-red-600 text-sm">Failed to send message. Please try again.</p>
      )}
    </form>
  )
}
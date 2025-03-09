'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const inputClasses = "mt-1 block w-full rounded-lg border-0 px-4 py-3 bg-gray-50 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary/60 transition-shadow duration-200"
const labelClasses = "block text-sm font-medium text-gray-900 mb-1"
const selectClasses = "mt-1 block w-full rounded-lg border-0 px-4 py-3 bg-gray-50 text-gray-900 ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-primary/60 transition-shadow duration-200"

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
      const response = await fetch('/api/contact', {
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
    <motion.form 
      onSubmit={handleSubmit} 
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label htmlFor="firstName" className={labelClasses}>
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            required
            className={inputClasses}
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label htmlFor="lastName" className={labelClasses}>
            Last Name *
          </label>
          <input
            type="text"
            id="lastName"
            required
            className={inputClasses}
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label htmlFor="company" className={labelClasses}>
            Company
          </label>
          <input
            type="text"
            id="company"
            className={inputClasses}
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <label htmlFor="title" className={labelClasses}>
            Title
          </label>
          <input
            type="text"
            id="title"
            className={inputClasses}
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <label htmlFor="email" className={labelClasses}>
          Email *
        </label>
        <input
          type="email"
          id="email"
          required
          className={inputClasses}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <label htmlFor="source" className={labelClasses}>
          How did you hear about BI? *
        </label>
        <select
          id="source"
          required
          className={selectClasses}
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
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <label htmlFor="category" className={labelClasses}>
          Which category best describes your inquiry? *
        </label>
        <select
          id="category"
          required
          className={selectClasses}
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
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <label htmlFor="thoughts" className={labelClasses}>
          Your Thoughts *
        </label>
        <textarea
          id="thoughts"
          required
          rows={4}
          className={inputClasses}
          value={formData.thoughts}
          onChange={(e) => setFormData({ ...formData, thoughts: e.target.value })}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="pt-4"
      >
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full rounded-lg bg-gradient-to-r from-primary to-magenta px-6 py-4 text-base font-semibold text-white shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 disabled:opacity-50 transition-all duration-200"
        >
          {status === 'loading' ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </span>
          ) : 'Send Message'}
        </button>
      </motion.div>

      {status === 'success' && (
        <motion.p 
          className="text-green-600 text-sm bg-green-50 p-4 rounded-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Message sent successfully! I'll get back to you soon.
        </motion.p>
      )}
      {status === 'error' && (
        <motion.p 
          className="text-red-600 text-sm bg-red-50 p-4 rounded-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Failed to send message. Please try again or email me directly.
        </motion.p>
      )}
    </motion.form>
  )
}
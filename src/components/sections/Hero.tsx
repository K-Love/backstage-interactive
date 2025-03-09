// src/components/sections/Hero.tsx
import { motion } from 'framer-motion'
import { useState } from 'react'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [url, setUrl] = useState('')
  const [isValidUrl, setIsValidUrl] = useState(true)

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (url) {
      // Add URL validation here if needed
      window.location.href = `/tools/digital-score?url=${encodeURIComponent(url)}`
    } else {
      setIsValidUrl(false)
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-magenta/5" />
      
      {/* Animated circuit pattern background */}
      <div className="absolute inset-x-0 top-20 bottom-0">
        <div className="absolute inset-0 bg-hero-pattern opacity-80" />
        <div className="absolute inset-0 bg-hero-pattern opacity-80 scale-75" style={{ transform: 'rotate(30deg)' }} />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-8"
          >
            <span className="text-primary">Building Digital</span>
            <br />
            <span className="text-magenta">Experiences</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-charcoal max-w-3xl mx-auto mb-12"
          >
            Empowering businesses through innovative web development,
            artificial intelligence solutions, and strategic digital marketing.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a 
              href="/contact" 
              className="px-8 py-4 bg-magenta hover:bg-magenta/90 text-white rounded-lg font-semibold transition-colors"
            >
              Start Your Project
            </a>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-4 border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-lg font-semibold transition-colors"
            >
              Score Your Digital Presence
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Digital Presence Scorer Modal */}
      {isModalOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-8 max-w-lg w-full shadow-xl"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold text-primary mb-2">Digital Presence Scorer</h3>
            <p className="text-charcoal mb-6">
              Get an instant analysis of your digital presence. Our AI-powered tool will evaluate your:
            </p>
            <ul className="list-none space-y-2 mb-6">
              {[
                'Website Performance & SEO',
                'Mobile Responsiveness',
                'Social Media Integration',
                'Security & Technical Health',
                'Brand Consistency'
              ].map((item, index) => (
                <li key={index} className="flex items-center text-charcoal">
                  <ArrowRightIcon className="w-4 h-4 text-magenta mr-2" />
                  {item}
                </li>
              ))}
            </ul>
            <form onSubmit={handleUrlSubmit} className="space-y-4">
              <div>
                <input
                  type="url"
                  placeholder="Enter your website URL"
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value)
                    setIsValidUrl(true)
                  }}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-primary transition-colors ${
                    isValidUrl ? 'border-gray-200' : 'border-red-500'
                  }`}
                />
                {!isValidUrl && (
                  <p className="text-red-500 text-sm mt-1">Please enter a valid URL</p>
                )}
              </div>
              <button 
                type="submit"
                className="w-full px-6 py-3 bg-magenta text-white rounded-lg font-semibold hover:bg-magenta/90 transition-colors"
              >
                Get Your Score
              </button>
              <button 
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-full px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors"
              >
                Maybe Later
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}

export default Hero
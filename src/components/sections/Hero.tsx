// src/components/sections/Hero.tsx
import { motion } from 'framer-motion'
import { useState } from 'react'

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-magenta/5" />
      
      {/* Animated circuit pattern background */}
      <div className="absolute inset-x-0 top-20 bottom-0">
        <div className="absolute inset-0 bg-hero-pattern opacity-70" />
        <div className="absolute inset-0 bg-hero-pattern opacity-70 scale-75" style={{ transform: 'rotate(30deg)' }} />
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
              Get Free Strategy Session
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Strategy Session Modal */}
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
            <h3 className="text-2xl font-bold text-primary mb-4">Free Strategy Session</h3>
            <p className="text-charcoal mb-6">
              Book a complimentary 30-minute strategy session with our experts. We'll analyze your digital presence 
              and provide actionable insights for growth.
            </p>
            <div className="flex flex-col gap-4">
              <a 
                href="/contact?session=strategy"
                className="w-full px-6 py-3 bg-magenta text-white rounded-lg font-semibold text-center hover:bg-magenta/90 transition-colors"
              >
                Schedule Your Session
              </a>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-full px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors"
              >
                Maybe Later
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}

export default Hero
// src/components/sections/Hero.tsx
import { motion } from 'framer-motion'
import Link from 'next/link'

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-purple/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-primary mb-8">
            Building Digital
            <span className="text-magenta"> Experiences</span>
          </h1>
          <p className="text-xl md:text-2xl text-charcoal max-w-3xl mx-auto mb-12">
            Backstage Interactive builds digital experiences, delivers consumer and
            client projects, and consults businesses on strategy and execution.
          </p>
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-amber hover:bg-amber/90 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Get Started
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
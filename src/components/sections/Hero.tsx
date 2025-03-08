// src/components/sections/Hero.tsx
import { motion } from 'framer-motion'

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple/10" />
      
      {/* Final pattern adjustment */}
      <div className="absolute inset-0 bg-hero-pattern bg-[length:100px_100px] opacity-40" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
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
          <p className="text-xl md:text-2xl text-charcoal max-w-3xl mx-auto">
            Backstage Interactive builds digital experiences, delivers consumer and
            client projects, and consults businesses on strategy and execution.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
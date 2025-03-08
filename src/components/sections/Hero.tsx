// src/components/sections/Hero.tsx
import { motion } from 'framer-motion'

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple/30" />
      
      {/* Simplified pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iMC4yIj48cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4Ii8+PHJlY3QgeD0iOCIgeT0iOCIgd2lkdGg9IjgiIGhlaWdodD0iOCIvPjwvc3ZnPg==')] bg-[length:40px_40px] opacity-40" />
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
import { motion } from 'framer-motion'

const StudioHero = () => {
  return (
    <div className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-primary to-purple text-white">
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-bold mb-6"
        >
          The Studio
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl max-w-3xl mx-auto"
        >
          Where innovation takes center stage. Explore our experimental projects
          and digital ventures that push the boundaries of web technology.
        </motion.p>
      </div>
    </div>
  )
}

export default StudioHero
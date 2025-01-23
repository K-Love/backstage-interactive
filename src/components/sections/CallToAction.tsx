import { motion } from 'framer-motion'

const CallToAction = () => {
  return (
    <section className="bg-gradient-to-br from-primary/5 to-purple/5 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Ready to Transform Your Digital Presence?
          </h2>
          <p className="text-xl text-charcoal max-w-3xl mx-auto mb-12">
            Let's collaborate to create exceptional digital experiences that drive results 
            and exceed expectations.
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-magenta hover:bg-magenta/90 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
          >
            Start Your Project
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default CallToAction
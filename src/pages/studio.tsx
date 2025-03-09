import { motion } from 'framer-motion'
import Head from 'next/head'

const Studio = () => {
  return (
    <>
      <Head>
        <title>Studio - Coming Soon | Backstage Interactive</title>
        <meta 
          name="description" 
          content="Exciting projects are in development. The studio is crafting innovative digital experiences that will be unveiled soon." 
        />
      </Head>

      <main className="min-h-screen bg-white">
        <section className="relative min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-magenta/5" />
            <div className="absolute inset-0 bg-hero-pattern opacity-95" />
            <div className="absolute inset-0 bg-hero-pattern opacity-95 scale-75" style={{ transform: 'rotate(30deg)' }} />
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-7xl font-bold"
              >
                <span className="text-primary">Studio</span>
                <br />
                <span className="text-magenta">Coming Soon</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto"
              >
                The Studio is where I craft innovative digital experiences 
                that push the boundaries of what's possible on the web. These 
                experimental projects are currently in development and will be 
                unveiled soon.
              </motion.p>

              {/* Animated Elements */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex justify-center gap-8 pt-8"
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-4 h-4 rounded-full bg-magenta"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3
                    }}
                  />
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="pt-12"
              >
                <a
                  href="/contact"
                  className="inline-flex items-center px-8 py-4 bg-magenta hover:bg-magenta/90 text-white rounded-lg font-semibold transition-colors"
                >
                  Stay Updated on the Launch
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  )
}

export default Studio
import { motion } from 'framer-motion'

const VisionIllustration = () => {
  return (
    <motion.svg
      width="100%"
      height="100%"
      viewBox="0 0 600 800"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial="initial"
      animate="animate"
    >
      {/* Background Grid Pattern - Expanded */}
      <motion.path
        d="M50 50h500v700H50V50z"
        stroke="#2E3192"
        strokeWidth="0.5"
        strokeDasharray="4 4"
        opacity="0.1"
        variants={{
          initial: { opacity: 0 },
          animate: { opacity: 0.1, transition: { duration: 1 } }
        }}
      />
      
      {/* Adjusted y-coordinates for all elements to spread across new height */}
      <motion.circle
        cx="150" cy="250" r="20"
        fill="#8E44AD"
        variants={{
          initial: { scale: 0, opacity: 0 },
          animate: {
            scale: [1, 1.1, 1],
            opacity: [0.9, 0.7, 0.9],
            transition: { duration: 2, repeat: Infinity }
          }
        }}
      />
      <motion.circle
        cx="300" cy="400" r="25"
        fill="#EC008C"
        variants={{
          initial: { scale: 0, opacity: 0 },
          animate: {
            scale: [1, 1.1, 1],
            opacity: [0.8, 0.6, 0.8],
            transition: { duration: 2, repeat: Infinity, delay: 0.5 }
          }
        }}
      />
      <motion.circle
        cx="450" cy="550" r="15"
        fill="#F5A623"
        variants={{
          initial: { scale: 0, opacity: 0 },
          animate: {
            scale: [1, 1.1, 1],
            opacity: [0.9, 0.7, 0.9],
            transition: { duration: 2, repeat: Infinity, delay: 1 }
          }
        }}
      />

      {/* Adjusted connection lines */}
      <motion.path
        d="M150 250L300 400M300 400L450 550"
        stroke="#16A085"
        strokeWidth="2"
        strokeDasharray="4 4"
        variants={{
          initial: { pathLength: 0, opacity: 0 },
          animate: {
            pathLength: 1,
            opacity: 1,
            transition: { duration: 1.5, ease: "easeInOut" }
          }
        }}
      />

      {/* Code Brackets - Now at top and bottom */}
      <motion.path
        d="M100 100l30 30-30 30M500 100l-30 30 30 30"
        stroke="#2E3192"
        strokeWidth="3"
        fill="none"
        variants={{
          initial: { pathLength: 0 },
          animate: { pathLength: 1, transition: { duration: 1.5 } }
        }}
      />
      <motion.path
        d="M100 650l30 30-30 30M500 650l-30 30 30 30"
        stroke="#2E3192"
        strokeWidth="3"
        fill="none"
        variants={{
          initial: { pathLength: 0 },
          animate: { pathLength: 1, transition: { duration: 1.5 } }
        }}
      />

      {/* Data Visualization Bars - Spread out */}
      <motion.rect
        x="250" y="300" width="100" height="8" rx="4"
        fill="#FFD200"
        variants={{
          initial: { scaleX: 0, opacity: 0 },
          animate: { scaleX: 1, opacity: 0.9, transition: { duration: 0.8 } }
        }}
      />
      <motion.rect
        x="250" y="450" width="80" height="8" rx="4"
        fill="#EC008C"
        variants={{
          initial: { scaleX: 0, opacity: 0 },
          animate: { scaleX: 1, opacity: 0.8, transition: { duration: 0.8, delay: 0.2 } }
        }}
      />
      <motion.rect
        x="250" y="600" width="60" height="8" rx="4"
        fill="#16A085"
        variants={{
          initial: { scaleX: 0, opacity: 0 },
          animate: { scaleX: 1, opacity: 0.7, transition: { duration: 0.8, delay: 0.4 } }
        }}
      />

      {/* Floating Shapes - Spread across height */}
      <motion.path
        d="M400 200c20 0 40 20 40 40s-20 40-40 40-40-20-40-40 20-40 40-40z"
        fill="#2E3192"
        variants={{
          initial: { y: 0, opacity: 0 },
          animate: {
            y: [0, -10, 0],
            opacity: 0.1,
            transition: { duration: 3, repeat: Infinity }
          }
        }}
      />
      <motion.path
        d="M150 500c15 0 30 15 30 30s-15 30-30 30-30-15-30-30 15-30 30-30z"
        fill="#8E44AD"
        variants={{
          initial: { y: 0, opacity: 0 },
          animate: {
            y: [0, -10, 0],
            opacity: 0.1,
            transition: { duration: 3, repeat: Infinity, delay: 1.5 }
          }
        }}
      />

      {/* Wave Animation - Now spans full height */}
      <motion.path
        d="M50 400s50-50 100-50 100 50 100 50 50-50 100-50 100 50 100 50"
        stroke="#EC008C"
        strokeWidth="2"
        fill="none"
        variants={{
          initial: { opacity: 0 },
          animate: {
            opacity: [0.3, 0.1, 0.3],
            transition: { duration: 3, repeat: Infinity }
          }
        }}
      />
    </motion.svg>
  )
}

const Vision = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-primary mb-6"
            >
              Where Innovation Meets Imagination
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-600"
            >
              Welcome to the intersection of tech and creativity. Backstage Interactive
              brings cutting-edge web development, AI integration, and Web3 innovations
              together to craft digital experiences that simply work better.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-lg text-gray-600"
            >
              The setup is unique: one part agency, one part studio lab. The agency side
              crafts custom solutions for forward-thinking businesses, while the studio
              serves as a playground for building and growing innovative digital properties.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-lg text-gray-600"
            >
              Think modern web frameworks meets AI sophistication, with a dash of blockchain
              innovation. The result? Digital solutions that don't just keep up with the
              curve—but help define it.
            </motion.p>
          </div>
          <div className="relative w-full min-h-[500px] lg:min-h-[600px] xl:min-h-[700px]">
            <div className="absolute inset-0">
              <VisionIllustration />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Vision
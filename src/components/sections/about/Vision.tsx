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
      {/* Tech Grid Background */}
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

      {/* AI Neural Network */}
      <motion.path
        d="M100 200c50-50 100 0 150 50 50 50 100 50 150 0M100 400c50 50 100 0 150-50 50-50 100-50 150 0M100 600c50 50 100 0 150-50 50-50 100-50 150 0"
        stroke="#EC008C"
        strokeWidth="2"
        fill="none"
        variants={{
          initial: { opacity: 0 },
          animate: {
            opacity: 0.3,
            transition: { duration: 1.5, repeat: Infinity }
          }
        }}
      />

      {/* Web3 Blockchain Links */}
      <motion.g transform="translate(200 500)">
        {[0, 1, 2].map((i) => (
          <motion.rect
            key={i}
            x={i * 80}
            y="0"
            width="60"
            height="60"
            rx="8"
            fill="#2E3192"
            variants={{
              initial: { scale: 0 },
              animate: {
                scale: 1,
                transition: { delay: i * 0.2, duration: 0.5 }
              }
            }}
          />
        ))}
        <motion.path
          d="M230 30L270 30M270 30L310 30"
          stroke="#16A085"
          strokeWidth="3"
          variants={{
            initial: { pathLength: 0 },
            animate: {
              pathLength: 1,
              transition: { duration: 1, delay: 0.6 }
            }
          }}
        />
      </motion.g>

      {/* Digital Marketing Analytics */}
      <motion.g transform="translate(100 200)">
        <motion.path
          d="M0 200h400v200H0z"
          stroke="#FFD200"
          fill="none"
          variants={{
            initial: { opacity: 0 },
            animate: { opacity: 0.1 }
          }}
        />
        <motion.path
          d="M0 250l50-30 50 60 50-20 50 40 50-10 50 50"
          stroke="#EC008C"
          strokeWidth="2"
          fill="none"
          variants={{
            initial: { pathLength: 0 },
            animate: {
              pathLength: 1,
              transition: { duration: 1.5 }
            }
          }}
        />
        <motion.circle
          cx="300"
          cy="150"
          r="40"
          fill="#16A085"
          variants={{
            initial: { scale: 0 },
            animate: {
              scale: [1, 1.1, 1],
              transition: { duration: 2, repeat: Infinity }
            }
          }}
        />
      </motion.g>

      {/* Floating Tech Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.circle
          key={i}
          cx={Math.random() * 600}
          cy={Math.random() * 800}
          r={Math.random() * 3 + 1}
          fill="#2E3192"
          variants={{
            initial: { opacity: 0 },
            animate: {
              opacity: [0, 0.3, 0],
              transition: {
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }
            }
          }}
        />
      ))}

      {/* Central Globe Visualization */}
      <motion.g transform="translate(200 300)">
        <motion.circle
          cx="100"
          cy="100"
          r="80"
          stroke="#2E3192"
          strokeWidth="2"
          fill="none"
          variants={{
            initial: { scale: 0 },
            animate: { scale: 1, transition: { duration: 1 } }
          }}
        />
        <motion.path
          d="M100 20a80 80 0 0 1 0 160M20 100a80 80 0 0 1 160 0"
          stroke="#16A085"
          strokeWidth="1.5"
          variants={{
            initial: { rotate: 0 },
            animate: {
              rotate: 360,
              transition: { duration: 20, repeat: Infinity }
            }
          }}
        />
      </motion.g>
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
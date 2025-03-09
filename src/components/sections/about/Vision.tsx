import { motion } from 'framer-motion'

const VisionIllustration = () => {
  return (
    <motion.svg
      width="100%"
      height="100%"
      viewBox="0 0 600 600"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial="initial"
      animate="animate"
    >
      {/* Modern Code Window */}
      <motion.g transform="translate(50 50)">
        <motion.rect
          x="0"
          y="0"
          width="500"
          height="150"
          rx="10"
          fill="#1E1E1E"
          variants={{
            initial: { opacity: 0, y: -20 },
            animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
          }}
        />
        {/* Window Controls */}
        <motion.g transform="translate(20 20)">
          <motion.circle cx="12" cy="12" r="6" fill="#FF5F56" />
          <motion.circle cx="36" cy="12" r="6" fill="#FFBD2E" />
          <motion.circle cx="60" cy="12" r="6" fill="#27C93F" />
        </motion.g>
        {/* Code Lines */}
        {[...Array(4)].map((_, i) => (
          <motion.g key={i} transform={`translate(20 ${60 + i * 20})`}>
            <motion.rect
              width={Math.random() * 200 + 100}
              height="3"
              rx="1.5"
              fill="#2E3192"
              opacity="0.6"
              variants={{
                initial: { scaleX: 0 },
                animate: {
                  scaleX: 1,
                  transition: { delay: i * 0.1, duration: 0.5 }
                }
              }}
            />
            {/* Syntax Highlights */}
            <motion.circle
              cx={i * 40}
              cy="0"
              r="2"
              fill="#EC008C"
              variants={{
                initial: { opacity: 0 },
                animate: { opacity: 1, transition: { delay: i * 0.2 } }
              }}
            />
          </motion.g>
        ))}
      </motion.g>

      {/* Advanced Neural Network */}
      <motion.g transform="translate(100 250)">
        {/* Neural Network Grid */}
        <motion.g>
          {[...Array(9)].map((_, i) => (
            <motion.circle
              key={i}
              cx={(i % 3) * 80 + 50}
              cy={Math.floor(i / 3) * 60 + 50}
              r="6"
              fill="#EC008C"
              variants={{
                initial: { scale: 0, opacity: 0 },
                animate: {
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                  transition: { 
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.1
                  }
                }
              }}
            />
          ))}
          {/* Neural Connections */}
          <motion.path
            d="M50 50 L130 110 L210 50 M50 110 L130 170 L210 110 M50 170 L130 110 L210 170"
            stroke="#EC008C"
            strokeWidth="1.5"
            strokeDasharray="4"
            variants={{
              initial: { pathLength: 0, opacity: 0 },
              animate: {
                pathLength: [0, 1],
                opacity: [0.2, 0.8],
                transition: { duration: 3, repeat: Infinity }
              }
            }}
          />
        </motion.g>
      </motion.g>

      {/* Modern Analytics Dashboard */}
      <motion.g transform="translate(300 250)">
        {/* Dashboard Frame */}
        <motion.rect
          x="0"
          y="0"
          width="250"
          height="180"
          rx="8"
          fill="#F8F9FA"
          stroke="#2E3192"
          strokeWidth="2"
          variants={{
            initial: { opacity: 0, scale: 0.9 },
            animate: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
          }}
        />
        {/* Analytics Charts */}
        <motion.g transform="translate(20 20)">
          {/* Bar Chart */}
          {[...Array(5)].map((_, i) => (
            <motion.rect
              key={i}
              x={i * 20}
              y={100 - Math.random() * 60}
              width="12"
              height={Math.random() * 60 + 20}
              fill="#16A085"
              opacity="0.8"
              variants={{
                initial: { scaleY: 0 },
                animate: {
                  scaleY: 1,
                  transition: { delay: i * 0.1, duration: 0.5 }
                }
              }}
            />
          ))}
          {/* Line Chart */}
          <motion.path
            d="M120 80 L150 40 L180 60 L210 20"
            stroke="#EC008C"
            strokeWidth="3"
            fill="none"
            variants={{
              initial: { pathLength: 0 },
              animate: {
                pathLength: 1,
                transition: { duration: 1.5, delay: 0.5 }
              }
            }}
          />
          {/* Data Points */}
          {[120, 150, 180, 210].map((x, i) => (
            <motion.circle
              key={i}
              cx={x}
              cy={[80, 40, 60, 20][i]}
              r="4"
              fill="#EC008C"
              variants={{
                initial: { scale: 0 },
                animate: {
                  scale: [1, 1.5, 1],
                  transition: { delay: 1 + i * 0.2, repeat: Infinity, duration: 2 }
                }
              }}
            />
          ))}
        </motion.g>
      </motion.g>

      {/* Floating Tech Icons */}
      <motion.g transform="translate(50 450)">
        {['<>', '{ }', '()'].map((text, i) => (
          <motion.text
            key={i}
            x={i * 80}
            y="0"
            fill="#2E3192"
            fontSize="16"
            fontFamily="monospace"
            variants={{
              initial: { opacity: 0, y: 20 },
              animate: {
                opacity: [0.3, 1, 0.3],
                y: 0,
                transition: { delay: i * 0.2, duration: 2, repeat: Infinity }
              }
            }}
          >
            {text}
          </motion.text>
        ))}
      </motion.g>

      {/* Interactive Background Elements */}
      {[...Array(15)].map((_, i) => (
        <motion.circle
          key={i}
          cx={Math.random() * 500 + 50}
          cy={Math.random() * 500 + 50}
          r={Math.random() * 2 + 1}
          fill={i % 2 === 0 ? "#2E3192" : "#EC008C"}
          variants={{
            initial: { opacity: 0 },
            animate: {
              opacity: [0, 0.5, 0],
              scale: [1, 1.5, 1],
              transition: {
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }
            }
          }}
        />
      ))}
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
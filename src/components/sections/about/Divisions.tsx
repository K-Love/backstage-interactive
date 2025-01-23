import Section from '@/components/ui/Section'
import { motion } from 'framer-motion'
import Link from 'next/link'

const Divisions = () => {
  return (
    <Section>
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Two Distinct Divisions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Link href="/agency" className="group">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="mb-6 relative h-48">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                {/* Modern Office Building */}
                <rect x="60" y="20" width="80" height="160" fill="#f3f4f6" />
                <rect x="65" y="25" width="70" height="150" fill="#e5e7eb" />
                
                {/* Windows */}
                {[0, 1, 2, 3, 4, 5, 6, 7].map((row) => (
                  <g key={row}>
                    <rect x="70" y={35 + row * 18} width="25" height="12" fill="#6366f1" opacity="0.9" />
                    <rect x="105" y={35 + row * 18} width="25" height="12" fill="#6366f1" opacity="0.9" />
                  </g>
                ))}
                
                {/* Entrance */}
                <rect x="85" y="160" width="30" height="20" fill="#4f46e5" />
                <rect x="95" y="165" width="10" height="15" fill="#818cf8" />
                
                {/* Analytics Graph */}
                <motion.path
                  d="M150 120 L160 100 L170 110 L180 80 L190 70"
                  stroke="#4f46e5"
                  strokeWidth="3"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                
                {/* Digital Marketing Icons */}
                <motion.g
                  animate={{
                    y: [-5, 5, -5],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <circle cx="30" cy="50" r="15" fill="#4f46e5" opacity="0.8" />
                  <text x="30" y="55" textAnchor="middle" fill="white" fontSize="12">@</text>
                </motion.g>
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-primary group-hover:text-amber transition-colors">
              Agency Division
            </h3>
            <p className="text-gray-600">
              Our agency division specializes in enterprise-level solutions,
              offering comprehensive digital strategy, custom development, and
              ongoing optimization for established businesses ready to scale.
            </p>
          </motion.div>
        </Link>

        <Link href="/studio" className="group">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-8 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="mb-6 relative h-48">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                {/* Designer's Workspace */}
                {/* Desk */}
                <rect x="20" y="120" width="160" height="10" fill="#4f46e5" />
                <rect x="30" y="130" width="140" height="5" fill="#818cf8" />
                
                {/* Laptop */}
                <motion.g
                  animate={{
                    y: [-2, 2, -2],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <path d="M60 80 L140 80 L150 115 L50 115 Z" fill="#374151" />
                  <rect x="65" y="85" width="70" height="25" fill="#6366f1" />
                  <rect x="70" y="90" width="60" height="15" fill="#818cf8" />
                </motion.g>
                
                {/* Coffee Cup */}
                <motion.g
                  animate={{
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <path d="M150 95 Q160 95 160 105 L155 115 L145 115 L140 105 Q140 95 150 95" fill="#e5e7eb" />
                  <path d="M165 105 Q160 105 160 105 L155 115 L145 115 L140 105" fill="none" stroke="#d1d5db" />
                </motion.g>
                
                {/* Plant */}
                <motion.g
                  animate={{
                    rotate: [0, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <rect x="30" y="90" width="20" height="30" fill="#4f46e5" rx="2" />
                  <path d="M40 60 Q30 75 40 90 M40 60 Q50 75 40 90" stroke="#6366f1" fill="none" strokeWidth="2" />
                  <circle cx="40" cy="55" r="5" fill="#818cf8" />
                </motion.g>
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-primary group-hover:text-amber transition-colors">
              Studio Division
            </h3>
            <p className="text-gray-600">
              Perfect for small businesses and startups, our studio division
              provides streamlined web solutions and essential digital services
              that maximize impact while respecting budget constraints.
            </p>
          </motion.div>
        </Link>
      </div>
    </Section>
  )
}

export default Divisions
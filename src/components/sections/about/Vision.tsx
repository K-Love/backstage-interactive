import Section from '@/components/ui/Section'
import { motion } from 'framer-motion'

const Vision = () => {
  return (
    <Section className="bg-gradient-to-br from-primary/5 to-purple/5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Where Innovation Meets Imagination
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            Welcome to Backstage Interactive, where creativity and technology converge
            to bring digital dreams to life. Founded and operated by Kevin Love,
            our mission is to empower businesses through innovative web solutions
            and strategic digital marketing.
          </p>
          <p className="text-lg text-gray-600">
            Every project is a unique story waiting to be told, and we're here to
            help tell yours through cutting-edge technology and creative excellence.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative h-[400px] rounded-lg overflow-hidden"
        >
          <svg
            viewBox="0 0 400 400"
            className="absolute inset-0 w-full h-full"
            style={{ filter: 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.1))' }}
          >
            {/* Background circles */}
            <circle cx="200" cy="200" r="180" fill="#f3f4f6" />
            <circle cx="200" cy="200" r="160" fill="#e5e7eb" />
            
            {/* Laptop base */}
            <path
              d="M100 220 L300 220 L320 280 L80 280 Z"
              fill="#374151"
              className="transform-origin-center"
            />
            
            {/* Laptop screen */}
            <rect
              x="120"
              y="120"
              width="160"
              height="100"
              fill="#1f2937"
              rx="8"
            />
            
            {/* Code lines animation */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
            >
              <rect x="140" y="140" width="80" height="4" fill="#6366f1" rx="2" />
              <rect x="140" y="152" width="100" height="4" fill="#8b5cf6" rx="2" />
              <rect x="140" y="164" width="60" height="4" fill="#ec4899" rx="2" />
            </motion.g>
            
            {/* Floating elements */}
            <motion.g
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Browser window */}
              <rect x="260" y="140" width="60" height="40" fill="#4f46e5" rx="4" />
              <rect x="265" y="145" width="50" height="30" fill="#818cf8" rx="2" />
            </motion.g>
            
            <motion.g
              animate={{
                y: [0, 10, 0],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            >
              {/* Mobile device */}
              <rect x="80" y="160" width="30" height="50" fill="#4f46e5" rx="4" />
              <rect x="85" y="165" width="20" height="40" fill="#818cf8" rx="2" />
            </motion.g>
          </svg>
        </motion.div>
      </div>
    </Section>
  )
}

export default Vision
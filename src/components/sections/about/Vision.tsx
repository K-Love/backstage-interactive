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
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-purple opacity-20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl font-bold text-white">BI</span>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}

export default Vision
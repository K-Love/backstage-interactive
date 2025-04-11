import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'

export const AgencyHero = () => {
  return (
    <Container className="pt-32 pb-16">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1 
          className="text-5xl md:text-6xl font-bold text-primary mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Transforming Ideas into Digital Reality
        </motion.h1>
        <motion.p 
          className="text-xl text-charcoal/80 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          We craft digital experiences that inspire, engage, and deliver results
        </motion.p>
      </div>
    </Container>
  )
}
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'

export const AgencyHero = () => {
  return (
    <Container className="relative pt-32 pb-16">
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-50/30 to-indigo-50/30 [background-image:url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMTAwMCA4MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGgxMDAwdjgwMEgweiIgZmlsbD0idXJsKCNhKSIvPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iYSIgeDE9IjAiIHkxPSIwIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIHN0b3AtY29sb3I9IiNGRkZGRkYiIHN0b3Atb3BhY2l0eT0iMC4wNSIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0ZGRkZGRiIgc3RvcC1vcGFjaXR5PSIwLjA1Ii8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHBhdGggZD0iTTI1IDI1aDk1MHY3NTBIMjV6IiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMiIvPjwvc3ZnPg==')]"/>
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
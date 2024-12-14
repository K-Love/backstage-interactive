import Section from '../ui/Section'
import { motion } from 'framer-motion'
import { 
  CodeBracketIcon, 
  PaintBrushIcon, 
  MegaphoneIcon, 
  LightBulbIcon 
} from '@heroicons/react/24/outline'

const services = [
  {
    title: 'Web Development',
    description: 'Custom websites and applications built with modern technologies and best practices.',
    icon: CodeBracketIcon,
  },
  {
    title: 'Design',
    description: 'Beautiful, functional designs that enhance user experience and drive engagement.',
    icon: PaintBrushIcon,
  },
  {
    title: 'Digital Marketing',
    description: 'Strategic marketing solutions to grow your online presence and reach your target audience.',
    icon: MegaphoneIcon,
  },
  {
    title: 'Consulting',
    description: 'Expert guidance to help you make informed decisions about your digital strategy.',
    icon: LightBulbIcon,
  },
]

const Services = () => {
  return (
    <Section>
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-4"
        >
          Our Services
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-600 max-w-2xl mx-auto"
        >
          We offer comprehensive digital solutions to help your business thrive in the modern world.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <service.icon className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-600">{service.description}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

export default Services
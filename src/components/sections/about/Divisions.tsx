import Section from '@/components/ui/Section'
import { motion } from 'framer-motion'
import { BuildingOfficeIcon, BeakerIcon } from '@heroicons/react/24/outline'

const divisions = [
  {
    title: 'The Agency',
    subtitle: 'Crafting Digital Experiences',
    description: 'At the heart of Backstage Interactive is the Agency, dedicated to providing top-notch web development and digital marketing services. Whether building a stunning website, enhancing online presence, or driving targeted traffic to a business, strategies are tailored to meet specific needs.',
    icon: BuildingOfficeIcon,
  },
  {
    title: 'The Studio',
    subtitle: 'Innovating from Within',
    description: 'Our Studio focuses on building and operating its own web projects. This division allows for the exploration of new ideas, experimentation with cutting-edge technologies, and the development of innovative solutions that push the boundaries of what\'s possible.',
    icon: BeakerIcon,
  },
]

const Divisions = () => {
  return (
    <Section dark>
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-4 text-white"
        >
          Two Distinct Divisions
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {divisions.map((division, index) => (
          <motion.div
            key={division.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="bg-white rounded-lg p-8"
          >
            <division.icon className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-2xl font-bold mb-2 text-primary">{division.title}</h3>
            <h4 className="text-xl text-purple mb-4">{division.subtitle}</h4>
            <p className="text-gray-600">{division.description}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

export default Divisions
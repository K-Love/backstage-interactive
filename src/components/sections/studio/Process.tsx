import Section from '@/components/ui/Section'
import { motion } from 'framer-motion'
import { 
  LightBulbIcon, 
  BeakerIcon, 
  RocketLaunchIcon 
} from '@heroicons/react/24/outline'

const steps = [
  {
    title: 'Ideation',
    description: 'Starting with a problem or opportunity, we brainstorm innovative solutions.',
    icon: LightBulbIcon
  },
  {
    title: 'Experimentation',
    description: 'Prototyping and testing new technologies to find the best approach.',
    icon: BeakerIcon
  },
  {
    title: 'Launch',
    description: 'Successful experiments become full-fledged products that solve real problems.',
    icon: RocketLaunchIcon
  }
]

const Process = () => {
  return (
    <Section dark>
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4 text-white">Our Process</h2>
        <p className="text-xl text-gray-200 max-w-2xl mx-auto">
          How we turn ideas into reality through experimentation and iteration.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="text-center"
          >
            <div className="inline-block p-4 bg-white rounded-full mb-6">
              <step.icon className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">{step.title}</h3>
            <p className="text-gray-300">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

export default Process
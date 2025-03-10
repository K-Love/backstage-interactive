import Section from '../ui/Section'
import Image from 'next/image'
import { motion } from 'framer-motion'

const projects = [
  {
    title: 'Chris Willburn Coaching',
    description: 'Personal development and coaching platform',
    image: '/images/projects/chris-willburn.jpg',
    url: 'https://www.chriswillburncoaching.com'
  },
  {
    title: 'Sharrey Dore',
    description: 'Professional portfolio and services showcase',
    image: '/images/projects/sharrey-dore.jpg',
    url: 'https://www.sharreydore.com'
  }
]

const FeaturedWork = () => {
  return (
    <Section dark>
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-4 text-white"
        >
          Featured Work
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-200 max-w-2xl mx-auto"
        >
          Some of our recent projects that showcase our expertise and creativity.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.a
            key={project.title}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="group relative overflow-hidden rounded-lg"
          >
            <div className="aspect-w-16 aspect-h-9 relative">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="text-center p-4">
                  <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-200">{project.description}</p>
                </div>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </Section>
  )
}

export default FeaturedWork
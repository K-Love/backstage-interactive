import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'

interface ProjectCardProps {
  title: string
  description: string
  image: string
  url: string
  tags: string[]
  status: 'live' | 'development' | 'concept'
}

const ProjectCard = ({ title, description, image, url, tags, status }: ProjectCardProps) => {
  const statusColors = {
    live: 'bg-green-500',
    development: 'bg-yellow-500',
    concept: 'bg-purple-500'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <div className="relative aspect-video">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-sm text-white ${statusColors[status]}`}>
            {status}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
        >
          View Project
          <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-2" />
        </a>
      </div>
    </motion.div>
  )
}

export default ProjectCard
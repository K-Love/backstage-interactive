import Section from '@/components/ui/Section'
import ProjectCard from '@/components/ui/ProjectCard'

const projects = [
  {
    title: 'Digital Garden',
    description: 'A modern knowledge management system built with Next.js and MDX.',
    image: '/images/projects/digital-garden.jpg',
    url: 'https://garden.backstageinteractive.com',
    tags: ['Next.js', 'MDX', 'TailwindCSS', 'Knowledge Base'],
    status: 'development' as const
  },
  {
    title: 'AI Writing Assistant',
    description: 'An AI-powered writing tool that helps create better content.',
    image: '/images/projects/ai-writer.jpg',
    url: 'https://writer.backstageinteractive.com',
    tags: ['OpenAI', 'React', 'Node.js', 'AI'],
    status: 'concept' as const
  },
  {
    title: 'Web3 Dashboard',
    description: 'A dashboard for managing cryptocurrency and NFT portfolios.',
    image: '/images/projects/web3-dashboard.jpg',
    url: 'https://web3.backstageinteractive.com',
    tags: ['Web3', 'Ethereum', 'React', 'DeFi'],
    status: 'live' as const
  }
]

const Projects = () => {
  return (
    <Section>
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">Our Projects</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Exploring new technologies and pushing the boundaries of what's possible on the web.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </Section>
  )
}

export default Projects
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import Image from 'next/image';

interface ProjectCardProps {
  title: string;
  image: string;
  url: string;
}

const ProjectCard = ({ title, image, url }: ProjectCardProps) => (
  <motion.a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="group block relative overflow-hidden rounded-2xl"
    whileHover={{ y: -5 }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
  >
    <div className="aspect-video relative overflow-hidden">
      <Image
        src={image}
        alt={title}
        layout="fill"
        objectFit="cover"
        className="transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <span className="text-white font-bold text-xl">View Project</span>
      </div>
    </div>
    <h3 className="text-xl font-bold mt-4 text-primary">{title}</h3>
  </motion.a>
);

const projects: ProjectCardProps[] = [
  {
    title: "Chris Willburn Coaching",
    image: "/images/projects/cwc-screenshot.png",
    url: "https://www.chriswillburncoaching.com"
  },
  {
    title: "Sharrey Dore",
    image: "/images/projects/sharrey-dore.png",
    url: "https://www.sharreydore.com"
  }
];

export const Portfolio = () => (
  <Container className="py-24 bg-gray-50">
    <motion.h2 
      className="text-3xl md:text-4xl font-bold text-center mb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      Featured Work
    </motion.h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {projects.map((project) => (
        <ProjectCard key={project.title} {...project} />
      ))}
    </div>
  </Container>
);
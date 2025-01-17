// src/components/sections/agency/Services.tsx
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { FaPalette, FaCode, FaBullhorn, FaLightbulb } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { FC } from 'react';

interface ServiceCardProps {
  title: string;
  subtitle: string;
  description: string;
  icon: FC;
  color: string;
}

const ServiceCard: FC<ServiceCardProps> = ({ title, subtitle, description, icon: Icon, color }) => {
  if (!Icon) return null;

  return (
    <motion.div 
      className="relative overflow-hidden rounded-2xl p-8 bg-white shadow-lg hover:shadow-xl transition-all"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${color}`} />
      <div className="flex items-start gap-4 mb-4">
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${color} p-3 text-white`}>
          <Icon />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-primary">{title}</h3>
          <p className="text-charcoal/60 italic">{subtitle}</p>
        </div>
      </div>
      <p className="text-charcoal/80 leading-relaxed pl-16">{description}</p>
    </motion.div>
  );
};

const services: Array<ServiceCardProps> = [
  {
    title: "Design",
    subtitle: "Crafting Visuals",
    description: "Design is where imagination meets strategy... transforming concepts into compelling visuals that capture a brand's essence.",
    icon: FaPalette,
    color: "from-primary to-purple"
  },
  {
    title: "Development",
    subtitle: "Building Solutions",
    description: "Development turns visionary ideas into reality... building robust, scalable solutions tailored to specific needs.",
    icon: FaCode,
    color: "from-magenta to-primary"
  },
  {
    title: "Sharing",
    subtitle: "Spreading the Word",
    description: "Digital marketing strategies designed to maximize reach and engagement through targeted campaigns and data-driven insights.",
    icon: FaBullhorn, // Changed from FaMegaphone to FaBullhorn
    color: "from-teal to-primary"
  },
  {
    title: "Consulting",
    subtitle: "Guiding Success",
    description: "Strategic guidance to navigate the complexities of the digital landscape, offering tailored solutions to drive growth.",
    icon: FaLightbulb,
    color: "from-amber to-yellow"
  }
];

export const Services: FC = () => (
  <Container className="py-24">
    <motion.h2 
      className="text-3xl md:text-4xl font-bold text-center mb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      Our Services
    </motion.h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {services.map((service) => (
        <ServiceCard key={service.title} {...service} />
      ))}
    </div>
  </Container>
);
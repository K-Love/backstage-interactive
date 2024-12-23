// src/components/sections/agency/Services.tsx
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { OptimizedImage } from '@/components/ui/OptimizedImage';

const ServiceCard = ({ title, subtitle, description, icon }) => (
  <motion.div 
    className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/10 transition-all"
    whileHover={{ scale: 1.02 }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
  >
    <div className="flex items-center gap-4 mb-4">
      {icon && <div className="w-12 h-12">{icon}</div>}
      <div>
        <h3 className="text-2xl font-bold text-white">{title}</h3>
        <p className="text-gray-400 italic">{subtitle}</p>
      </div>
    </div>
    <p className="text-gray-300 leading-relaxed">{description}</p>
  </motion.div>
);

export const Services = () => (
  <Container className="py-24">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <ServiceCard
        title="Design"
        subtitle="Crafting Visuals"
        description="Design is where imagination meets strategy... transforming concepts into compelling visuals that capture a brand's essence..."
        icon={<svg>...</svg>} // Add appropriate icon
      />
      {/* Add other service cards */}
    </div>
  </Container>
);
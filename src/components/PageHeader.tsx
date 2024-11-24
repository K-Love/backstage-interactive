import { FC } from 'react';
import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

const PageHeader: FC<PageHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="relative bg-primary overflow-hidden">
      {/* Enhanced texture overlay */}
      <div className="absolute inset-0 opacity-20 texture-overlay"></div>
      <div className="absolute inset-0 opacity-30 texture-dots"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent2/20"></div>
      
      {/* Slanted bottom edge with enhanced shadow */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-white transform -skew-y-2 translate-y-8 shadow-lg"></div>
      
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center py-24 md:py-32"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-shadow-lg">{title}</h1>
          {subtitle && (
            <p className="text-xl text-white/90 max-w-2xl mx-auto text-shadow">{subtitle}</p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default PageHeader;

import { FC } from 'react';
import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

const PageHeader: FC<PageHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="relative bg-primary overflow-hidden">
      {/* Texture overlay */}
      <div className="absolute inset-0 opacity-10 texture-overlay"></div>
      
      {/* Slanted bottom edge */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-white transform -skew-y-2 translate-y-8"></div>
      
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center py-20 md:py-28"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{title}</h1>
          {subtitle && (
            <p className="text-xl text-white/90 max-w-2xl mx-auto">{subtitle}</p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default PageHeader;

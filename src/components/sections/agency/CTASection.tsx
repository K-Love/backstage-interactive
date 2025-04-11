// src/components/sections/agency/CTASection.tsx
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import Link from 'next/link';

export const CTASection = () => (
  <Container className="py-24">
    <div className="max-w-4xl mx-auto text-center">
      <motion.h2 
        className="text-3xl md:text-4xl font-bold mb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Ready to Start Your Project?
      </motion.h2>
      <motion.p 
        className="text-xl text-charcoal/80 mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        Let's transform your vision into reality
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        <Link 
          href="/contact"
          className="inline-block bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-bold transition-colors"
        >
          Get in Touch
        </Link>
      </motion.div>
    </div>
  </Container>
);
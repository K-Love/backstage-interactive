import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import StripeCheckoutButton from '@/components/stripe-checkout-button';

interface Tool {
  id: string;
  name: string;
  description: string;
  isFree: boolean;
  stripePriceId: string;
  slug: string;
  imageUrl: string;
}

interface User {
  hasPremium: boolean;
}

interface ToolCardProps {
  tool: Tool;
  user?: User;
}

export const ToolCard = ({ tool, user }: ToolCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative h-48 w-full">
        <Image
          src={tool.imageUrl}
          alt={tool.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-primary mb-2">{tool.name}</h3>
        <p className="text-gray-600 mb-4">{tool.description}</p>
        <div className="flex items-center justify-between">
          {!tool.isFree && !user?.hasPremium && (
            <StripeCheckoutButton priceId={tool.stripePriceId} />
          )}
          {(tool.isFree || user?.hasPremium) && (
            <Link 
              href={`/members/tools/${tool.slug}`}
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors duration-150"
            >
              Access Tool
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};
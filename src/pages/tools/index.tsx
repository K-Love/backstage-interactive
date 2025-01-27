import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { prisma } from '@/lib/prisma';
import { ToolCard } from '@/components/tools/ToolCard';
import { useState } from 'react';

interface Tool {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface ToolsPageProps {
  tools: Tool[];
}

export default function ToolsPage({ tools }: ToolsPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'free' | 'premium'>('all');

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || 
                         (filter === 'free' && tool.price === 0) ||
                         (filter === 'premium' && tool.price > 0);
    return matchesSearch && matchesFilter;
  });

  return (
    <>
      <Head>
        <title>Tools | Backstage Interactive</title>
        <meta 
          name="description" 
          content="Discover our collection of web development and digital marketing tools." 
        />
      </Head>

      <div className="min-h-screen bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Digital Tools & Resources
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our collection of tools designed to enhance your digital presence
              and streamline your workflow.
            </p>
          </motion.div>

          <div className="mb-8 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between">
            <div className="relative rounded-md shadow-sm max-w-xs">
              <input
                type="text"
                placeholder="Search tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full rounded-md border-gray-300 pl-4 pr-12 focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 
                  ${filter === 'all' 
                    ? 'bg-primary text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('free')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 
                  ${filter === 'free' 
                    ? 'bg-primary text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                Free
              </button>
              <button
                onClick={() => setFilter('premium')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 
                  ${filter === 'premium' 
                    ? 'bg-primary text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                Premium
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.id} {...tool} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const tools = await prisma.tool.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      imagesJson: true
    }
  });

  return {
    props: {
      tools: tools.map(tool => ({
        ...tool,
        imageUrl: JSON.parse(tool.imagesJson)[0]?.url || '/images/placeholder-tool.jpg'
      }))
    }
  };
};
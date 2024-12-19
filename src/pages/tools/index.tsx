import { GetServerSideProps } from 'next';
import { prisma } from '@/lib/prisma';
import { Tool } from '@prisma/client';
import { ToolCard } from '@/components/tools/ToolCard';
import { useState } from 'react';

interface ToolsPageProps {
  tools: Tool[];
}

export default function ToolsPage({ tools }: ToolsPageProps) {
  const [filter, setFilter] = useState<'all' | 'free' | 'premium'>('all');
  const [search, setSearch] = useState('');

  const filteredTools = tools.filter(tool => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'free' && !tool.price) ||
      (filter === 'premium' && tool.price);

    const matchesSearch = tool.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search tools..."
          className="p-2 border rounded-md w-full max-w-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="mt-4 space-x-4">
          <button
            className={`px-4 py-2 rounded-md ${
              filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              filter === 'free' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setFilter('free')}
          >
            Free
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              filter === 'premium' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setFilter('premium')}
          >
            Premium
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const tools = await prisma.tool.findMany();
  return {
    props: {
      tools: JSON.parse(JSON.stringify(tools)),
    },
  };
};
import { GetServerSideProps } from 'next';
import { prisma } from '@/lib/prisma';
import { Tool } from '@prisma/client';
import { ToolCard } from '@/components/tools/ToolCard';
import { parseJsonSafely } from '@/utils/json';
import { useState, useMemo } from 'react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';

interface ToolsPageProps {
  tools: Tool[];
}

export default function ToolsPage({ tools }: ToolsPageProps) {
  const [filter, setFilter] = useState<'all' | 'free' | 'premium'>('all');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Get unique categories from tools
  const categories = useMemo(() => {
    const categorySet = new Set(tools.map(tool => tool.category));
    return ['all', ...Array.from(categorySet)];
  }, [tools]);

  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
      // Price filter
      const matchesFilter =
        filter === 'all' ||
        (filter === 'free' && !tool.price) ||
        (filter === 'premium' && tool.price);

      // Search filter
      const matchesSearch = tool.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
        tool.description.toLowerCase().includes(search.toLowerCase()) ||
        parseJsonSafely<string[]>(tool.featuresJson, []).some(feature =>
          feature.toLowerCase().includes(search.toLowerCase())
        );

      // Category filter
      const matchesCategory =
        selectedCategory === 'all' || tool.category === selectedCategory;

      return matchesFilter && matchesSearch && matchesCategory;
    });
  }, [tools, filter, search, selectedCategory]);

  return (
    <Section>
      <Container>
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Interactive Tools</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our collection of tools designed to enhance your workflow
            </p>
          </div>

          {/* Filters */}
          <div className="space-y-4">
            {/* Search */}
            <div>
              <input
                type="text"
                placeholder="Search tools..."
                className="w-full max-w-md px-4 py-2 border rounded-md"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Price Filter */}
            <div className="flex space-x-2">
              {['all', 'free', 'premium'].map((filterOption) => (
                <button
                  key={filterOption}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    filter === filterOption
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                  onClick={() => setFilter(filterOption as typeof filter)}
                >
                  {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
                </button>
              ))}
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>

          {/* No Results Message */}
          {filteredTools.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">
                No tools found matching your criteria
              </p>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const tools = await prisma.tool.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });

  // Serialize the Date objects
  return {
    props: {
      tools: JSON.parse(JSON.stringify(tools))
    }
  };
};
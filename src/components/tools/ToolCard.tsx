import { Tool } from '@prisma/client';
import Image from 'next/image';
import { Button } from '../ui/Button';

interface ToolCardProps {
  tool: Tool;
}

export const ToolCard = ({ tool }: ToolCardProps) => {
  return (
    <div className="rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
      {tool.previewImages[0] && (
        <div className="relative h-48 w-full mb-4">
          <Image
            src={tool.previewImages[0]}
            alt={tool.name}
            fill
            className="object-cover rounded-md"
          />
        </div>
      )}
      <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
      <p className="text-gray-600 mb-4">{tool.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-lg font-medium">
          {tool.price ? `${tool.price}` : 'Free'}
        </span>
        <Button href={`/tools/${tool.id}`}>
          Learn More
        </Button>
      </div>
    </div>
  );
};
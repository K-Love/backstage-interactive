import { Tool } from '@prisma/client';
import Image from 'next/image';
import { Button } from '../ui/Button';

interface ToolCardProps {
  tool: Tool;
}

export const ToolCard = ({ tool }: ToolCardProps) => {
  // Parse JSON strings into arrays
  const images: string[] = JSON.parse(tool.imagesJson);
  const features: string[] = JSON.parse(tool.featuresJson);

  return (
    <div className="rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
      {images[0] && (
        <div className="relative h-48 w-full mb-4">
          <Image
            src={images[0]}
            alt={tool.name}
            fill
            className="object-cover rounded-md"
          />
        </div>
      )}
      
      <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
      <p className="text-gray-600 mb-4">{tool.description}</p>
      
      {features.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Features:</h4>
          <ul className="text-sm text-gray-600 list-disc list-inside">
            {features.slice(0, 3).map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      )}
      
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
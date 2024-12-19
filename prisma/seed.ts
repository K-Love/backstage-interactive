import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.purchase.deleteMany();
  await prisma.tool.deleteMany();
  await prisma.user.deleteMany();

  // Create sample tools
  const tools = [
    {
      name: 'Image Optimizer',
      description: 'Optimize your images for the web with AI-powered compression',
      featuresJson: JSON.stringify([
        'AI-powered compression',
        'Batch processing',
        'Multiple format support',
        'Preview comparison'
      ]),
      price: null, // Free tool
      category: 'Images',
      imagesJson: JSON.stringify([
        '/images/tools/image-optimizer-1.jpg',
        '/images/tools/image-optimizer-2.jpg'
      ])
    },
    {
      name: 'Code Formatter',
      description: 'Format your code with industry-standard rules',
      featuresJson: JSON.stringify([
        'Multiple language support',
        'Custom rule configuration',
        'IDE integration',
        'Team sharing'
      ]),
      price: 9.99,
      category: 'Development',
      imagesJson: JSON.stringify([
        '/images/tools/code-formatter-1.jpg',
        '/images/tools/code-formatter-2.jpg'
      ])
    }
    // Add more sample tools as needed
  ];

  for (const tool of tools) {
    await prisma.tool.create({
      data: tool
    });
  }

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
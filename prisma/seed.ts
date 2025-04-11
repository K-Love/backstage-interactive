import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.tool.deleteMany();

  // Create sample tools
  const tools = [
    {
      name: 'SEO Analyzer',
      description: 'Advanced tool for analyzing and optimizing website SEO performance with AI-powered recommendations.',
      price: 49.99,
      featuresJson: JSON.stringify([
        'AI-powered analysis',
        'Keyword optimization',
        'Competitor tracking',
        'Performance metrics'
      ]),
      category: 'SEO',
      imagesJson: JSON.stringify([
        {
          url: '/images/tools/seo-analyzer.svg',
          alt: 'SEO Analyzer Dashboard'
        }
      ])
    },
    {
      name: 'Content Generator',
      description: 'AI-powered content generation tool for creating engaging blog posts, social media content, and more.',
      price: 29.99,
      featuresJson: JSON.stringify([
        'AI content generation',
        'Multiple content types',
        'SEO optimization',
        'Export options'
      ]),
      category: 'CONTENT',
      imagesJson: JSON.stringify([
        {
          url: '/images/tools/content-generator.svg',
          alt: 'Content Generator Interface'
        }
      ])
    },
    {
      name: 'Analytics Dashboard',
      description: 'Free analytics dashboard for tracking website performance and user behavior.',
      price: 0,
      featuresJson: JSON.stringify([
        'Real-time tracking',
        'User behavior analysis',
        'Basic reporting',
        'Website metrics'
      ]),
      category: 'ANALYTICS',
      imagesJson: JSON.stringify([
        {
          url: '/images/tools/analytics-dashboard.svg',
          alt: 'Analytics Dashboard'
        }
      ])
    }
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
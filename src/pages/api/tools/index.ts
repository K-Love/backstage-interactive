import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    try {
      // Get user's subscriptions
      const user = await prisma.user.findUnique({
        where: { email: session.user?.email! },
        include: {
          subscriptions: true,
        },
      });

      // Get all available tools
      const tools = [
        {
          id: 'seo-analyzer',
          name: 'SEO Analyzer',
          description: 'Analyze your website\'s SEO performance and get recommendations',
          features: ['Keyword analysis', 'Meta tag checker', 'Site speed analysis'],
          price: 0,
          type: 'free',
        },
        {
          id: 'social-scheduler',
          name: 'Social Media Scheduler',
          description: 'Schedule and manage your social media posts',
          features: ['Multi-platform support', 'Analytics', 'Content calendar'],
          price: 29,
          type: 'premium',
        },
        // Add more tools as needed
      ];

      // Combine tools with subscription status
      const toolsWithStatus = tools.map(tool => ({
        ...tool,
        subscribed: user?.subscriptions.some(sub => 
          sub.toolId === tool.id && sub.status === 'active'
        ) || false,
        subscription: user?.subscriptions.find(sub => sub.toolId === tool.id),
      }));

      return res.status(200).json(toolsWithStatus);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch tools' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
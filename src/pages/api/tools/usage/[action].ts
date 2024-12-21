import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { action } = req.query;
  const { toolId, metadata = {} } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user?.email! },
      include: {
        subscriptions: {
          where: {
            toolId,
            status: 'active',
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    switch (action) {
      case 'start':
        const activeSubscription = user.subscriptions[0];
        if (!activeSubscription) {
          return res.status(403).json({ error: 'No active subscription found' });
        }

        const usage = await prisma.toolUsage.create({
          data: {
            userId: user.id,
            toolId,
            subscriptionId: activeSubscription.id,
            metadata,
          },
        });
        return res.status(200).json(usage);

      case 'end':
        const { usageId } = req.body;
        const updatedUsage = await prisma.toolUsage.update({
          where: {
            id: usageId,
            userId: user.id,
          },
          data: {
            endTime: new Date(),
            status: 'completed',
            metadata: {
              ...metadata,
            },
          },
        });
        return res.status(200).json(updatedUsage);

      default:
        return res.status(400).json({ error: 'Invalid action' });
    }
  } catch (error) {
    console.error('Tool usage error:', error);
    return res.status(500).json({ error: 'Failed to track tool usage' });
  }
}
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { action } = req.query;
  const { subscriptionId } = req.body;

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email! },
  });

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  try {
    switch (action) {
      case 'cancel':
        const canceledSubscription = await prisma.subscription.update({
          where: {
            id: subscriptionId,
            userId: user.id,
          },
          data: {
            status: 'cancelled',
            endDate: new Date(),
          },
        });
        return res.status(200).json(canceledSubscription);

      case 'upgrade':
        const upgradedSubscription = await prisma.subscription.update({
          where: {
            id: subscriptionId,
            userId: user.id,
          },
          data: {
            plan: 'premium',
            endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
          },
        });
        return res.status(200).json(upgradedSubscription);

      default:
        return res.status(400).json({ error: 'Invalid action' });
    }
  } catch (error) {
    console.error('Subscription management error:', error);
    return res.status(500).json({ error: 'Failed to manage subscription' });
  }
}
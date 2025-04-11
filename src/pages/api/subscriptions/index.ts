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
      const user = await prisma.user.findUnique({
        where: { email: session.user?.email! },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const subscriptions = await prisma.subscription.findMany({
        where: { userId: user.id },
        orderBy: { startDate: 'desc' },
      });

      return res.status(200).json(subscriptions);
    } catch (error) {
      console.error('Subscription fetch error:', error);
      return res.status(500).json({ error: 'Failed to fetch subscriptions' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { toolId, plan } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user?.email! },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if user already has an active subscription for this tool
    const existingSubscription = await prisma.subscription.findFirst({
      where: {
        userId: user.id,
        toolId: toolId,
        status: 'active',
      },
    });

    if (existingSubscription) {
      return res.status(400).json({ error: 'Already subscribed to this tool' });
    }

    // Create new subscription
    const subscription = await prisma.subscription.create({
      data: {
        userId: user.id,
        toolId: toolId,
        status: 'active',
        plan: plan,
        startDate: new Date(),
        endDate: plan === 'free' ? null : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days for premium
      },
    });

    return res.status(200).json(subscription);
  } catch (error) {
    console.error('Subscription error:', error);
    return res.status(500).json({ error: 'Failed to create subscription' });
  }
}
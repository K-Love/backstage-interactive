import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { toolId } = req.query;

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user?.email! },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get usage data for the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const usageData = await prisma.toolUsage.findMany({
      where: {
        userId: user.id,
        ...(toolId ? { toolId: String(toolId) } : {}),
        startTime: {
          gte: thirtyDaysAgo,
        },
      },
      orderBy: {
        startTime: 'asc',
      },
    });

    // Process and aggregate the data
    const aggregatedData = usageData.reduce((acc, usage) => {
      const date = usage.startTime.toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = { date, count: 0, duration: 0 };
      }

      acc[date].count += 1;
      if (usage.endTime) {
        const duration = Math.round(
          (usage.endTime.getTime() - usage.startTime.getTime()) / (1000 * 60)
        );
        acc[date].duration += duration;
      }

      return acc;
    }, {} as Record<string, { date: string; count: number; duration: number }>);

    return res.status(200).json(Object.values(aggregatedData));
  } catch (error) {
    console.error('Usage stats error:', error);
    return res.status(500).json({ error: 'Failed to fetch usage statistics' });
  }
}
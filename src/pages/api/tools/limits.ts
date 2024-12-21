import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { UsageLimitsService } from '@/services/usageLimits';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { toolId } = req.query;
  if (!toolId || Array.isArray(toolId)) {
    return res.status(400).json({ error: 'Invalid tool ID' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user?.email! },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const limits = await UsageLimitsService.checkUserLimits(user.id, toolId);
    return res.status(200).json(limits);
  } catch (error) {
    console.error('Usage limits error:', error);
    return res.status(500).json({ error: 'Failed to check usage limits' });
  }
}
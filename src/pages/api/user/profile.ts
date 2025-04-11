import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const userEmail = session.user?.email!;

  if (req.method === 'GET') {
    const profile = await prisma.user.findUnique({
      where: { email: userEmail },
      include: { profile: true },
    });
    return res.status(200).json(profile);
  }

  if (req.method === 'PUT') {
    const { name, company, website, bio } = req.body;

    try {
      const user = await prisma.user.update({
        where: { email: userEmail },
        data: {
          name,
          profile: {
            upsert: {
              create: { company, website, bio },
              update: { company, website, bio },
            },
          },
        },
        include: { profile: true },
      });
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update profile' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
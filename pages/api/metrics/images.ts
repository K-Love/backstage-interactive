// pages/api/metrics/images.ts
import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const metrics = await prisma.imageMetrics.create({
        data: {
          ...req.body,
          timestamp: new Date(req.body.timestamp)
        }
      })
      return res.status(200).json(metrics)
    } catch (error) {
      return res.status(500).json({ error: 'Failed to save metrics' })
    }
  }

  if (req.method === 'GET') {
    try {
      const metrics = await prisma.imageMetrics.findMany({
        orderBy: { timestamp: 'desc' },
        take: 1000
      })
      return res.status(200).json(metrics)
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch metrics' })
    }
  }
}
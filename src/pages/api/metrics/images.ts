// pages/api/metrics/images.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const metrics = await prisma.imageMetrics.create({
        data: {
          src: req.body.src,
          loadTime: req.body.loadTime,
          size: req.body.size,
          error: req.body.error || false,
          isZoomed: req.body.isZoomed || false,
        }
      })
      return res.status(200).json(metrics)
    } catch (error) {
      console.error('Failed to save metrics:', error)
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
      console.error('Failed to fetch metrics:', error)
      return res.status(500).json({ error: 'Failed to fetch metrics' })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
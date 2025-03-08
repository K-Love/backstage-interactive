import { NextApiRequest, NextApiResponse } from 'next'
import { isValidUrl } from '@/utils/validation'
import { analyzePageSpeed, analyzeSecurityHeaders, analyzeSocialPresence } from '@/utils/analyzers'

// Types for our analysis
interface AnalysisResult {
  overall: number
  performance: number
  accessibility: number
  bestPractices: number
  seo: number
  security: number
  social: number
  details: {
    performance: string[]
    accessibility: string[]
    bestPractices: string[]
    seo: string[]
    security: string[]
    social: string[]
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { url } = req.body

  if (!url || !isValidUrl(url)) {
    return res.status(400).json({ error: 'Invalid URL provided' })
  }

  try {
    // Initialize scores and details
    const result: AnalysisResult = {
      overall: 0,
      performance: 0,
      accessibility: 0,
      bestPractices: 0,
      seo: 0,
      security: 0,
      social: 0,
      details: {
        performance: [],
        accessibility: [],
        bestPractices: [],
        seo: [],
        security: [],
        social: [],
      },
    }

    // Run all analyses in parallel
    const [pageSpeedResult, securityResult, socialResult] = await Promise.all([
      analyzePageSpeed(url),
      analyzeSecurityHeaders(url),
      analyzeSocialPresence(url),
    ])

    // Combine results
    result.performance = pageSpeedResult.performance
    result.accessibility = pageSpeedResult.accessibility
    result.bestPractices = pageSpeedResult.bestPractices
    result.seo = Math.round((pageSpeedResult.seo + socialResult.score * 0.4) / 1.4) // Weighted average
    result.security = securityResult.score
    result.social = socialResult.score

    // Combine details
    result.details = {
      performance: pageSpeedResult.details.performance,
      accessibility: pageSpeedResult.details.accessibility,
      bestPractices: pageSpeedResult.details.bestPractices,
      seo: [...pageSpeedResult.details.seo, ...socialResult.details.filter(d => d.includes('SEO'))],
      security: securityResult.details,
      social: socialResult.details,
    }

    // Calculate overall score (weighted average)
    result.overall = Math.round(
      (result.performance * 0.25 +
        result.accessibility * 0.15 +
        result.bestPractices * 0.15 +
        result.seo * 0.20 +
        result.security * 0.15 +
        result.social * 0.10)
    )

    // Cache the result for 24 hours
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=86400, stale-while-revalidate=43200'
    )

    return res.status(200).json(result)
  } catch (error) {
    console.error('Analysis error:', error)
    return res.status(500).json({ 
      error: 'Failed to analyze website',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  }
} 
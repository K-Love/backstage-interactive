import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { load } from 'cheerio'
import { isValidUrl } from '@/utils/validation'

// Types for our analysis
interface AnalysisResult {
  overall: number
  performance: number
  mobile: number
  seo: number
  security: number
  social: number
  details: {
    performance: string[]
    mobile: string[]
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
      mobile: 0,
      seo: 0,
      security: 0,
      social: 0,
      details: {
        performance: [],
        mobile: [],
        seo: [],
        security: [],
        social: [],
      },
    }

    // Fetch the website content
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; DigitalPresenceScorer/1.0)',
      },
      timeout: 10000,
    })

    const $ = load(response.data)

    // Performance Analysis
    const startTime = performance.now()
    const responseTime = performance.now() - startTime
    result.performance = Math.min(100, Math.max(0, 100 - (responseTime / 100)))
    result.details.performance.push(
      `Page load time: ${(responseTime / 1000).toFixed(2)}s`,
      response.headers['content-encoding'] ? 'Compression enabled' : 'Compression not detected',
      $('img[src]:not([loading="lazy"])').length === 0 ? 'Images use lazy loading' : 'Add lazy loading to images'
    )

    // Mobile Responsiveness
    const hasViewport = $('meta[name="viewport"]').length > 0
    const hasMobileMediaQueries = response.data.includes('@media') && response.data.includes('max-width')
    result.mobile = ((hasViewport ? 50 : 0) + (hasMobileMediaQueries ? 50 : 0))
    result.details.mobile.push(
      hasViewport ? 'Viewport meta tag present' : 'Add viewport meta tag',
      hasMobileMediaQueries ? 'Mobile media queries detected' : 'Add mobile-responsive design',
      'Touch elements analysis pending'
    )

    // SEO Analysis
    const hasTitle = $('title').length > 0
    const hasDescription = $('meta[name="description"]').length > 0
    const hasH1 = $('h1').length > 0
    result.seo = ((hasTitle ? 33 : 0) + (hasDescription ? 33 : 0) + (hasH1 ? 34 : 0))
    result.details.seo.push(
      hasTitle ? 'Title tag present' : 'Add a title tag',
      hasDescription ? 'Meta description present' : 'Add meta description',
      hasH1 ? 'H1 heading present' : 'Add H1 heading'
    )

    // Security Analysis
    const isHttps = url.startsWith('https')
    const hasCSP = !!response.headers['content-security-policy']
    const hasXFrame = !!response.headers['x-frame-options']
    result.security = (
      (isHttps ? 40 : 0) +
      (hasCSP ? 30 : 0) +
      (hasXFrame ? 30 : 0)
    )
    result.details.security.push(
      isHttps ? 'HTTPS enabled' : 'Enable HTTPS',
      hasCSP ? 'Content Security Policy present' : 'Add Content Security Policy',
      hasXFrame ? 'X-Frame-Options header present' : 'Add X-Frame-Options header'
    )

    // Social Integration
    const hasOG = $('meta[property^="og:"]').length > 0
    const hasTwitter = $('meta[name^="twitter:"]').length > 0
    const hasSocialLinks = $('a[href*="facebook.com"], a[href*="twitter.com"], a[href*="linkedin.com"], a[href*="instagram.com"]').length > 0
    result.social = (
      (hasOG ? 33 : 0) +
      (hasTwitter ? 33 : 0) +
      (hasSocialLinks ? 34 : 0)
    )
    result.details.social.push(
      hasOG ? 'Open Graph tags present' : 'Add Open Graph tags',
      hasTwitter ? 'Twitter Card tags present' : 'Add Twitter Card tags',
      hasSocialLinks ? 'Social media links found' : 'Add social media links'
    )

    // Calculate overall score
    result.overall = Math.round(
      (result.performance +
        result.mobile +
        result.seo +
        result.security +
        result.social) / 5
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
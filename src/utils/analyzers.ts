import axios from 'axios'
import { load } from 'cheerio'

interface PageSpeedResult {
  performance: number
  accessibility: number
  bestPractices: number
  seo: number
  details: {
    performance: string[]
    accessibility: string[]
    bestPractices: string[]
    seo: string[]
  }
}

interface SecurityResult {
  score: number
  details: string[]
  headers: Record<string, string>
}

interface SocialResult {
  score: number
  details: string[]
  meta: {
    og: string[]
    twitter: string[]
    links: string[]
  }
}

export async function analyzePageSpeed(url: string): Promise<PageSpeedResult> {
  try {
    // Note: In production, you'd want to store this in an environment variable
    const API_KEY = 'YOUR_GOOGLE_API_KEY'
    const response = await axios.get(
      `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
        url
      )}&key=${API_KEY}&strategy=mobile`
    )

    const { 
      lighthouseResult: { 
        categories: {
          performance,
          accessibility,
          'best-practices': bestPractices,
          seo
        },
        audits
      }
    } = response.data

    return {
      performance: Math.round(performance.score * 100),
      accessibility: Math.round(accessibility.score * 100),
      bestPractices: Math.round(bestPractices.score * 100),
      seo: Math.round(seo.score * 100),
      details: {
        performance: [
          `First Contentful Paint: ${audits['first-contentful-paint'].displayValue}`,
          `Time to Interactive: ${audits['interactive'].displayValue}`,
          `Speed Index: ${audits['speed-index'].displayValue}`,
        ],
        accessibility: [
          audits['color-contrast'].score < 1 ? 'Improve color contrast' : 'Good color contrast',
          audits['document-title'].score < 1 ? 'Add a title element' : 'Title element present',
          audits['html-has-lang'].score < 1 ? 'Add a lang attribute' : 'Language attribute present',
        ],
        bestPractices: [
          audits['no-document-write'].score < 1 ? 'Avoid document.write()' : 'No document.write() used',
          audits['js-libraries'].score < 1 ? 'Update JavaScript libraries' : 'JavaScript libraries up to date',
          audits['deprecations'].score < 1 ? 'Remove deprecated APIs' : 'No deprecated APIs used',
        ],
        seo: [
          audits['meta-description'].score < 1 ? 'Add meta description' : 'Meta description present',
          audits['link-text'].score < 1 ? 'Improve link text' : 'Good link text',
          audits['robots-txt'].score < 1 ? 'Add robots.txt' : 'robots.txt present',
        ],
      },
    }
  } catch (error) {
    console.error('PageSpeed API error:', error)
    return {
      performance: 0,
      accessibility: 0,
      bestPractices: 0,
      seo: 0,
      details: {
        performance: ['Failed to analyze performance'],
        accessibility: ['Failed to analyze accessibility'],
        bestPractices: ['Failed to analyze best practices'],
        seo: ['Failed to analyze SEO'],
      },
    }
  }
}

export async function analyzeSecurityHeaders(url: string): Promise<SecurityResult> {
  try {
    const response = await axios.get(url, {
      validateStatus: () => true,
      maxRedirects: 5,
    })

    const headers = response.headers
    const checks = [
      {
        name: 'Strict-Transport-Security',
        value: headers['strict-transport-security'],
        weight: 15,
        message: 'HSTS header present',
        recommendation: 'Add HSTS header for improved security',
      },
      {
        name: 'Content-Security-Policy',
        value: headers['content-security-policy'],
        weight: 20,
        message: 'CSP header present',
        recommendation: 'Implement Content Security Policy',
      },
      {
        name: 'X-Frame-Options',
        value: headers['x-frame-options'],
        weight: 10,
        message: 'X-Frame-Options header present',
        recommendation: 'Add X-Frame-Options header to prevent clickjacking',
      },
      {
        name: 'X-Content-Type-Options',
        value: headers['x-content-type-options'],
        weight: 10,
        message: 'X-Content-Type-Options header present',
        recommendation: 'Add X-Content-Type-Options header',
      },
      {
        name: 'Referrer-Policy',
        value: headers['referrer-policy'],
        weight: 10,
        message: 'Referrer-Policy header present',
        recommendation: 'Add Referrer-Policy header',
      },
      {
        name: 'Permissions-Policy',
        value: headers['permissions-policy'],
        weight: 10,
        message: 'Permissions-Policy header present',
        recommendation: 'Add Permissions-Policy header',
      },
    ]

    let score = 0
    const details: string[] = []

    checks.forEach(check => {
      if (check.value) {
        score += check.weight
        details.push(check.message)
      } else {
        details.push(check.recommendation)
      }
    })

    // Add SSL check
    if (url.startsWith('https')) {
      score += 25
      details.push('HTTPS enabled')
    } else {
      details.push('Enable HTTPS for secure connections')
    }

    return {
      score,
      details,
      headers: response.headers as Record<string, string>,
    }
  } catch (error) {
    return {
      score: 0,
      details: ['Failed to analyze security headers'],
      headers: {},
    }
  }
}

export async function analyzeSocialPresence(url: string): Promise<SocialResult> {
  try {
    const response = await axios.get(url)
    const $ = load(response.data)
    
    const ogTags = $('meta[property^="og:"]')
      .map((_, el) => $(el).attr('property'))
      .get()
    
    const twitterTags = $('meta[name^="twitter:"]')
      .map((_, el) => $(el).attr('name'))
      .get()
    
    const socialLinks = $('a[href*="facebook.com"], a[href*="twitter.com"], a[href*="linkedin.com"], a[href*="instagram.com"]')
      .map((_, el) => $(el).attr('href'))
      .get()

    let score = 0
    const details: string[] = []

    // Score OG tags
    if (ogTags.length >= 4) {
      score += 30
      details.push('Good Open Graph implementation')
    } else if (ogTags.length > 0) {
      score += 15
      details.push('Basic Open Graph tags present')
    } else {
      details.push('Add Open Graph tags for better social sharing')
    }

    // Score Twitter tags
    if (twitterTags.length >= 3) {
      score += 30
      details.push('Good Twitter Card implementation')
    } else if (twitterTags.length > 0) {
      score += 15
      details.push('Basic Twitter Card tags present')
    } else {
      details.push('Add Twitter Card tags for better Twitter sharing')
    }

    // Score social links
    if (socialLinks.length >= 3) {
      score += 40
      details.push('Good social media presence')
    } else if (socialLinks.length > 0) {
      score += 20
      details.push('Limited social media presence')
    } else {
      details.push('Add social media profile links')
    }

    return {
      score,
      details,
      meta: {
        og: ogTags,
        twitter: twitterTags,
        links: socialLinks,
      },
    }
  } catch (error) {
    return {
      score: 0,
      details: ['Failed to analyze social presence'],
      meta: {
        og: [],
        twitter: [],
        links: [],
      },
    }
  }
} 
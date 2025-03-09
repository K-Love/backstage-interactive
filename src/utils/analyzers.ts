import axios from 'axios'
import { load } from 'cheerio'

interface PageSpeedAudit {
  score: number
  displayValue?: string
  group?: string
}

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
    const API_KEY = process.env.GOOGLE_PAGESPEED_API_KEY

    if (!API_KEY) {
      console.error('PageSpeed API key not found in environment variables')
      throw new Error('PageSpeed API key not configured')
    }

    console.log('Analyzing URL:', url)
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
      url
    )}&key=${API_KEY}&strategy=mobile&category=accessibility&category=performance&category=best-practices&category=seo`

    const response = await axios.get(apiUrl)
    console.log('PageSpeed API response received')

    if (!response.data?.lighthouseResult?.categories) {
      throw new Error('Invalid API response format')
    }

    const categories = response.data.lighthouseResult.categories
    const audits = response.data.lighthouseResult.audits as Record<string, PageSpeedAudit> || {}

    // Extract accessibility-specific audits
    const accessibilityAudits = Object.entries(audits)
      .filter(([_, audit]) => audit.group === 'accessibility')
      .reduce((acc: Record<string, PageSpeedAudit>, [key, audit]) => {
        acc[key] = audit;
        return acc;
      }, {});

    const result = {
      performance: Math.round((categories.performance?.score || 0) * 100),
      accessibility: Math.round((categories.accessibility?.score || 0) * 100),
      bestPractices: Math.round((categories['best-practices']?.score || 0) * 100),
      seo: Math.round((categories.seo?.score || 0) * 100),
      details: {
        performance: [
          audits['first-contentful-paint']?.displayValue ? 
            `First Contentful Paint: ${audits['first-contentful-paint'].displayValue}` :
            'First Contentful Paint: Not available',
          audits['interactive']?.displayValue ?
            `Time to Interactive: ${audits['interactive'].displayValue}` :
            'Time to Interactive: Not available',
          audits['speed-index']?.displayValue ?
            `Speed Index: ${audits['speed-index'].displayValue}` :
            'Speed Index: Not available',
        ],
        accessibility: [
          // Core accessibility checks
          audits['color-contrast']?.score !== undefined ?
            (audits['color-contrast'].score < 1 ? 'Improve color contrast' : 'Good color contrast') :
            'Color contrast: Not analyzed',
          audits['document-title']?.score !== undefined ?
            (audits['document-title'].score < 1 ? 'Add a title element' : 'Title element present') :
            'Document title: Not analyzed',
          audits['html-has-lang']?.score !== undefined ?
            (audits['html-has-lang'].score < 1 ? 'Add a lang attribute' : 'Language attribute present') :
            'Language attribute: Not analyzed',
          // Additional accessibility checks
          audits['aria-required-attr']?.score !== undefined ?
            (audits['aria-required-attr'].score < 1 ? 'Add required ARIA attributes' : 'ARIA attributes properly implemented') :
            'ARIA attributes: Not analyzed',
          audits['image-alt']?.score !== undefined ?
            (audits['image-alt'].score < 1 ? 'Add alt text to images' : 'Images have alt text') :
            'Image alt text: Not analyzed',
          audits['link-name']?.score !== undefined ?
            (audits['link-name'].score < 1 ? 'Add descriptive link text' : 'Links have descriptive text') :
            'Link text: Not analyzed',
          audits['heading-order']?.score !== undefined ?
            (audits['heading-order'].score < 1 ? 'Fix heading order' : 'Proper heading structure') :
            'Heading structure: Not analyzed',
          audits['tabindex']?.score !== undefined ?
            (audits['tabindex'].score < 1 ? 'Fix tab order' : 'Proper tab order') :
            'Tab order: Not analyzed'
        ],
        bestPractices: [
          audits['no-document-write']?.score !== undefined ?
            (audits['no-document-write'].score < 1 ? 'Avoid document.write()' : 'No document.write() used') :
            'document.write() usage: Not analyzed',
          audits['js-libraries']?.score !== undefined ?
            (audits['js-libraries'].score < 1 ? 'Update JavaScript libraries' : 'JavaScript libraries up to date') :
            'JavaScript libraries: Not analyzed',
          audits['deprecations']?.score !== undefined ?
            (audits['deprecations'].score < 1 ? 'Remove deprecated APIs' : 'No deprecated APIs used') :
            'Deprecated APIs: Not analyzed',
        ],
        seo: [
          audits['meta-description']?.score !== undefined ?
            (audits['meta-description'].score < 1 ? 'Add meta description' : 'Meta description present') :
            'Meta description: Not analyzed',
          audits['link-text']?.score !== undefined ?
            (audits['link-text'].score < 1 ? 'Improve link text' : 'Good link text') :
            'Link text: Not analyzed',
          audits['robots-txt']?.score !== undefined ?
            (audits['robots-txt'].score < 1 ? 'Add robots.txt' : 'robots.txt present') :
            'robots.txt: Not analyzed',
        ],
      },
    }

    console.log('Analysis complete:', {
      performance: result.performance,
      accessibility: result.accessibility,
      bestPractices: result.bestPractices,
      seo: result.seo,
    })

    return result
  } catch (error) {
    console.error('PageSpeed API error:', error)
    if (axios.isAxiosError(error)) {
      console.error('API Response:', error.response?.data)
    }
    return {
      performance: 0,
      accessibility: 0,
      bestPractices: 0,
      seo: 0,
      details: {
        performance: ['Failed to analyze performance: ' + (error instanceof Error ? error.message : 'Unknown error')],
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
import { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Layout from '@/components/layout/Layout'
import { 
  ChartBarIcon, 
  LightBulbIcon, 
  KeyIcon, 
  DocumentTextIcon,
  ChartPieIcon,
  ArrowUpIcon,
  UsersIcon
} from '@heroicons/react/24/outline'

interface KeywordMetric {
  keyword: string
  searchVolume: number
  difficulty: number
  trend: 'up' | 'down' | 'stable'
  cpc: number
  competition: number
  monthlyClicks: number
  searchIntent: 'informational' | 'commercial' | 'transactional' | 'navigational'
  seasonality: 'steady' | 'seasonal' | 'trending'
  historical: {
    date: string
    searchVolume: number
    position?: number
    clicks?: number
  }[]
}

interface ContentSuggestion {
  title: string
  description: string
  type: 'blog' | 'landing' | 'product' | 'service' | 'guide' | 'comparison'
  estimatedImpact: 'high' | 'medium' | 'low'
  targetKeywords: string[]
  wordCount: number
  competitorContent?: {
    url: string
    wordCount: number
    publishDate: string
    shares: number
  }[]
  contentGaps: string[]
  outline: string[]
  roi: {
    estimatedTraffic: number
    conversionRate: number
    customerValue: number
    timeToRank: number
    monthlyValue: number
  }
  technicalRequirements: {
    schema: string
    headings: string[]
    internalLinks: number
    imageOptimization: string[]
    performance: string[]
  }
}

interface Competitor {
  domain: string
  metrics: {
    performance: number
    seo: number
    traffic: number
    backlinks: number
    domainAuthority: number
    socialFollowers: {
      twitter: number
      linkedin: number
      facebook: number
    }
  }
  strengths: string[]
  weaknesses: string[]
  topKeywords: Array<{
    keyword: string
    position: number
    traffic: number
  }>
  contentStrategy: {
    postFrequency: string
    avgWordCount: number
    topPerformingPages: Array<{
      url: string
      traffic: number
      shares: number
    }>
  }
}

interface TechnicalSEO {
  category: string
  priority: 'critical' | 'high' | 'medium' | 'low'
  impact: number
  timeToFix: string
  description: string
  steps: string[]
  tools?: string[]
}

interface AnalysisResult {
  performance: number
  accessibility: number
  bestPractices: number
  seo: number
  keywords?: KeywordMetric[]
  contentSuggestions?: ContentSuggestion[]
  competitors?: Competitor[]
  recommendations?: {
    category: string
    items: string[]
  }[]
  technicalSEO?: TechnicalSEO[]
  historicalMetrics?: {
    date: string
    performance: number
    seo: number
    traffic: number
  }[]
}

const WebsiteAnalyzerPage: NextPage = () => {
  const [url, setUrl] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState<'scores' | 'keywords' | 'content' | 'competitors'>('scores')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsAnalyzing(true)
    setError('')
    setResult(null)

    try {
      const response = await fetch('/api/analyze-site', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })

      if (!response.ok) {
        throw new Error('Analysis failed')
      }

      const data = await response.json()
      // Simulating additional data that would come from enhanced APIs
      setResult({
        ...data,
        keywords: [
          {
            keyword: 'web development',
            searchVolume: 110000,
            difficulty: 78,
            trend: 'up',
            cpc: 12.50,
            competition: 0.85,
            monthlyClicks: 85000,
            searchIntent: 'commercial',
            seasonality: 'steady',
            historical: [
              { date: '2024-01-01', searchVolume: 100000 },
              { date: '2023-12-01', searchVolume: 90000 },
              { date: '2023-11-01', searchVolume: 80000 },
              { date: '2023-10-01', searchVolume: 70000 }
            ]
          },
          {
            keyword: 'digital marketing',
            searchVolume: 90000,
            difficulty: 82,
            trend: 'up',
            cpc: 15.30,
            competition: 0.92,
            monthlyClicks: 65000,
            searchIntent: 'commercial',
            seasonality: 'steady',
            historical: [
              { date: '2024-01-01', searchVolume: 80000 },
              { date: '2023-12-01', searchVolume: 70000 },
              { date: '2023-11-01', searchVolume: 60000 },
              { date: '2023-10-01', searchVolume: 50000 }
            ]
          },
          {
            keyword: 'SEO optimization',
            searchVolume: 40000,
            difficulty: 65,
            trend: 'stable',
            cpc: 8.20,
            competition: 0.75,
            monthlyClicks: 32000,
            searchIntent: 'informational',
            seasonality: 'steady',
            historical: [
              { date: '2024-01-01', searchVolume: 35000 },
              { date: '2023-12-01', searchVolume: 30000 },
              { date: '2023-11-01', searchVolume: 25000 },
              { date: '2023-10-01', searchVolume: 20000 }
            ]
          },
          {
            keyword: 'website performance',
            searchVolume: 22000,
            difficulty: 45,
            trend: 'up',
            cpc: 6.80,
            competition: 0.55,
            monthlyClicks: 18000,
            searchIntent: 'informational',
            seasonality: 'steady',
            historical: [
              { date: '2024-01-01', searchVolume: 20000 },
              { date: '2023-12-01', searchVolume: 18000 },
              { date: '2023-11-01', searchVolume: 16000 },
              { date: '2023-10-01', searchVolume: 14000 }
            ]
          }
        ],
        contentSuggestions: [
          {
            title: 'Ultimate Guide to Website Performance Optimization',
            description: 'A comprehensive guide covering Core Web Vitals, image optimization, caching strategies, and more.',
            type: 'guide',
            estimatedImpact: 'high',
            targetKeywords: ['website performance', 'core web vitals', 'page speed'],
            wordCount: 2500,
            competitorContent: [
              {
                url: 'competitor1.com/blog/web-performance',
                wordCount: 1800,
                publishDate: '2024-01-15',
                shares: 450
              },
              {
                url: 'competitor2.com/guides/speed-optimization',
                wordCount: 3200,
                publishDate: '2023-12-01',
                shares: 820
              }
            ],
            contentGaps: [
              'Real-world case studies',
              'Mobile performance optimization',
              'Server-side optimization techniques'
            ],
            outline: [
              'Introduction to Web Performance',
              'Core Web Vitals Explained',
              'Image Optimization Techniques',
              'Caching Strategies',
              'Mobile Performance',
              'Server Optimization',
              'Monitoring and Analytics',
              'Case Studies'
            ],
            roi: {
              estimatedTraffic: 100000,
              conversionRate: 0.02,
              customerValue: 100,
              timeToRank: 6,
              monthlyValue: 2000
            },
            technicalRequirements: {
              schema: 'JSON-LD',
              headings: ['H1', 'H2', 'H3'],
              internalLinks: 10,
              imageOptimization: ['WebP', 'JPEG XR'],
              performance: ['Lazy Loading', 'Image Compression']
            }
          },
          {
            title: 'Complete SEO Strategy for 2024',
            description: 'In-depth guide to modern SEO practices with actionable steps.',
            type: 'guide',
            estimatedImpact: 'high',
            targetKeywords: ['seo strategy', 'seo guide', 'search optimization'],
            wordCount: 3000,
            competitorContent: [
              {
                url: 'competitor1.com/blog/seo-guide',
                wordCount: 2500,
                publishDate: '2023-11-20',
                shares: 680
              }
            ],
            contentGaps: [
              'AI and SEO integration',
              'Voice search optimization',
              'E-commerce specific strategies'
            ],
            outline: [
              'Current SEO Landscape',
              'Technical SEO Fundamentals',
              'Content Strategy',
              'Link Building in 2024',
              'AI and SEO',
              'Mobile SEO',
              'Voice Search Optimization',
              'Measuring Success'
            ],
            roi: {
              estimatedTraffic: 80000,
              conversionRate: 0.01,
              customerValue: 75,
              timeToRank: 12,
              monthlyValue: 1500
            },
            technicalRequirements: {
              schema: 'JSON-LD',
              headings: ['H1', 'H2', 'H3'],
              internalLinks: 15,
              imageOptimization: ['WebP', 'JPEG XR'],
              performance: ['Lazy Loading', 'Image Compression']
            }
          }
        ],
        competitors: [
          {
            domain: 'competitor1.com',
            metrics: {
              performance: 92,
              seo: 88,
              traffic: 150000,
              backlinks: 12500,
              domainAuthority: 65,
              socialFollowers: {
                twitter: 25000,
                linkedin: 15000,
                facebook: 35000
              }
            },
            strengths: [
              'Strong blog content',
              'Fast loading times',
              'High domain authority',
              'Active social presence',
              'Regular content updates'
            ],
            weaknesses: [
              'Limited service pages',
              'Poor mobile optimization',
              'Few case studies',
              'Outdated design',
              'Limited video content'
            ],
            topKeywords: [
              { keyword: 'web design', position: 3, traffic: 12000 },
              { keyword: 'digital marketing', position: 5, traffic: 8500 },
              { keyword: 'SEO services', position: 4, traffic: 6200 }
            ],
            contentStrategy: {
              postFrequency: '3 posts per week',
              avgWordCount: 1800,
              topPerformingPages: [
                { url: '/blog/seo-guide', traffic: 25000, shares: 1200 },
                { url: '/blog/web-design-tips', traffic: 18000, shares: 850 },
                { url: '/services/digital-marketing', traffic: 15000, shares: 600 }
              ]
            }
          },
          {
            domain: 'competitor2.com',
            metrics: {
              performance: 78,
              seo: 94,
              traffic: 200000,
              backlinks: 18000,
              domainAuthority: 72,
              socialFollowers: {
                twitter: 35000,
                linkedin: 28000,
                facebook: 42000
              }
            },
            strengths: [
              'Comprehensive service offerings',
              'Strong backlink profile',
              'Regular content updates',
              'High-quality case studies',
              'Engaging video content'
            ],
            weaknesses: [
              'Slow page load times',
              'Complex navigation',
              'Limited social proof',
              'Poor mobile experience',
              'Inconsistent branding'
            ],
            topKeywords: [
              { keyword: 'web development', position: 2, traffic: 15000 },
              { keyword: 'digital strategy', position: 3, traffic: 12000 },
              { keyword: 'ecommerce solutions', position: 1, traffic: 9500 }
            ],
            contentStrategy: {
              postFrequency: '2 posts per week',
              avgWordCount: 2200,
              topPerformingPages: [
                { url: '/guides/ecommerce', traffic: 35000, shares: 1800 },
                { url: '/case-studies/success', traffic: 22000, shares: 1100 },
                { url: '/services/web-development', traffic: 18000, shares: 750 }
              ]
            }
          }
        ],
        recommendations: [
          {
            category: 'Performance',
            items: [
              'Optimize images and use WebP format',
              'Implement lazy loading for images and videos',
              'Minify and compress CSS/JS files',
              'Enable browser caching',
              'Use a CDN for static assets',
              'Reduce server response time'
            ]
          },
          {
            category: 'SEO',
            items: [
              'Add meta descriptions to all pages',
              'Optimize title tags with keywords',
              'Improve URL structure',
              'Create an XML sitemap',
              'Fix broken internal links',
              'Implement schema markup'
            ]
          },
          {
            category: 'Content',
            items: [
              'Create content targeting identified keywords',
              'Develop comprehensive service pages',
              'Add customer testimonials and case studies',
              'Implement a content calendar',
              'Optimize images with alt text',
              'Create topic clusters'
            ]
          }
        ],
        technicalSEO: [
          {
            category: 'Mobile SEO',
            priority: 'critical',
            impact: 9,
            timeToFix: 'Immediate',
            description: 'Improve mobile page load times',
            steps: ['Optimize images', 'Implement lazy loading', 'Minify CSS/JS'],
            tools: ['Google PageSpeed Insights', 'GTmetrix']
          },
          {
            category: 'Content Quality',
            priority: 'high',
            impact: 8,
            timeToFix: '3 months',
            description: 'Increase content relevance and depth',
            steps: ['Research more specific keywords', 'Add more detailed information'],
            tools: ['Google Keyword Planner', 'SEMrush']
          },
          {
            category: 'Link Building',
            priority: 'medium',
            impact: 7,
            timeToFix: '6 months',
            description: 'Build more authoritative backlinks',
            steps: ['Identify new content opportunities', 'Reach out to influencers'],
            tools: ['Ahrefs', 'BuzzSumo']
          }
        ],
        historicalMetrics: [
          { date: '2024-01-01', performance: 90, seo: 85, traffic: 140000 },
          { date: '2023-12-01', performance: 88, seo: 82, traffic: 130000 },
          { date: '2023-11-01', performance: 86, seo: 80, traffic: 120000 },
          { date: '2023-10-01', performance: 84, seo: 78, traffic: 110000 }
        ]
      })
    } catch (err) {
      setError('Failed to analyze website. Please try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const ScoreCard = ({ label, score }: { label: string; score: number }) => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-2">{label}</h3>
      <div className="flex items-center">
        <div className="relative h-16 w-16">
          <svg className="w-full h-full" viewBox="0 0 36 36">
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="3"
            />
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke={score >= 90 ? '#22C55E' : score >= 50 ? '#F59E0B' : '#EF4444'}
              strokeWidth="3"
              strokeDasharray={`${score}, 100`}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-semibold">{score}</span>
          </div>
        </div>
        <div className="ml-4">
          <p className="text-sm text-gray-600">
            {score >= 90 ? 'Excellent' : score >= 50 ? 'Needs Improvement' : 'Poor'}
          </p>
        </div>
      </div>
    </div>
  )

  const TabButton = ({ 
    label, 
    icon: Icon, 
    isActive, 
    onClick 
  }: { 
    label: string
    icon: React.ComponentType<any>
    isActive: boolean
    onClick: () => void 
  }) => (
    <button
      onClick={onClick}
      className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
        isActive
          ? 'bg-primary text-white'
          : 'bg-white text-gray-700 hover:bg-gray-50'
      }`}
    >
      <Icon className="w-5 h-5 mr-2" />
      {label}
    </button>
  )

  const KeywordCard = ({ keyword }: { keyword: KeywordMetric }) => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h4 className="font-medium text-gray-900 mb-4">{keyword.keyword}</h4>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Search Volume</span>
          <span className="font-medium">{keyword.searchVolume.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Monthly Clicks</span>
          <span className="font-medium">{keyword.monthlyClicks.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Difficulty</span>
          <div className="flex items-center">
            <div className="w-24 h-2 bg-gray-200 rounded-full mr-2">
              <div 
                className={`h-2 rounded-full ${
                  keyword.difficulty >= 80 ? 'bg-red-500' :
                  keyword.difficulty >= 60 ? 'bg-yellow-500' :
                  'bg-green-500'
                }`}
                style={{ width: `${keyword.difficulty}%` }}
              />
            </div>
            <span className="font-medium">{keyword.difficulty}</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Competition</span>
          <div className="flex items-center">
            <div className="w-24 h-2 bg-gray-200 rounded-full mr-2">
              <div 
                className={`h-2 rounded-full ${
                  keyword.competition >= 0.8 ? 'bg-red-500' :
                  keyword.competition >= 0.6 ? 'bg-yellow-500' :
                  'bg-green-500'
                }`}
                style={{ width: `${keyword.competition * 100}%` }}
              />
            </div>
            <span className="font-medium">{(keyword.competition * 100).toFixed(0)}%</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">CPC</span>
          <span className="font-medium">${keyword.cpc.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Intent</span>
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {keyword.searchIntent}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Trend</span>
          <span className={`flex items-center ${
            keyword.trend === 'up' ? 'text-green-500' :
            keyword.trend === 'down' ? 'text-red-500' :
            'text-yellow-500'
          }`}>
            {keyword.trend === 'up' && <ArrowUpIcon className="w-4 h-4 mr-1" />}
            {keyword.trend}
          </span>
        </div>
      </div>
      
      <div className="mt-4">
        <h5 className="text-sm font-medium text-gray-900 mb-2">Historical Data</h5>
        <div className="relative h-40">
          <div className="absolute inset-0">
            {keyword.historical.map((data, index, array) => {
              const x = (index / (array.length - 1)) * 100
              const y = ((data.searchVolume / Math.max(...array.map(d => d.searchVolume))) * 100)
              return index === 0 ? `M ${x} ${100 - y}` : `L ${x} ${100 - y}`
            })}
          </div>
          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500">
            {keyword.historical.map((data) => (
              <span key={data.date}>{new Date(data.date).toLocaleDateString()}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const ContentCard = ({ content }: { content: ContentSuggestion }) => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-start justify-between mb-4">
        <h4 className="font-medium text-gray-900">{content.title}</h4>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          content.estimatedImpact === 'high' ? 'bg-green-100 text-green-800' :
          content.estimatedImpact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {content.estimatedImpact} impact
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-4">{content.description}</p>
      
      <div className="space-y-4">
        <div className="flex items-center text-sm text-gray-600">
          <DocumentTextIcon className="w-4 h-4 mr-2" />
          {content.type.charAt(0).toUpperCase() + content.type.slice(1)} • {content.wordCount} words
        </div>

        <div>
          <h5 className="text-sm font-medium text-gray-900 mb-2">Target Keywords</h5>
          <div className="flex flex-wrap gap-2">
            {content.targetKeywords.map((keyword) => (
              <span
                key={keyword}
                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        {content.competitorContent && (
          <div>
            <h5 className="text-sm font-medium text-gray-900 mb-2">Competitor Content</h5>
            <div className="space-y-2">
              {content.competitorContent.map((comp) => (
                <div key={comp.url} className="text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>{comp.url}</span>
                    <span>{comp.wordCount} words</span>
                  </div>
                  <div className="flex justify-between text-gray-500 text-xs">
                    <span>{comp.publishDate}</span>
                    <span>{comp.shares} shares</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {content.contentGaps && (
          <div>
            <h5 className="text-sm font-medium text-gray-900 mb-2">Content Gaps</h5>
            <ul className="space-y-1">
              {content.contentGaps.map((gap) => (
                <li key={gap} className="flex items-center text-sm text-gray-600">
                  <LightBulbIcon className="w-4 h-4 mr-2 text-yellow-500" />
                  {gap}
                </li>
              ))}
            </ul>
          </div>
        )}

        {content.outline && (
          <div>
            <h5 className="text-sm font-medium text-gray-900 mb-2">Suggested Outline</h5>
            <ol className="list-decimal list-inside space-y-1">
              {content.outline.map((item) => (
                <li key={item} className="text-sm text-gray-600">{item}</li>
              ))}
            </ol>
          </div>
        )}

        <div>
          <h5 className="text-sm font-medium text-gray-900 mb-2">ROI Prediction</h5>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Est. Monthly Traffic:</span>
              <span className="font-medium">{content.roi.estimatedTraffic.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Conversion Rate:</span>
              <span className="font-medium">{(content.roi.conversionRate * 100).toFixed(1)}%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Customer Value:</span>
              <span className="font-medium">${content.roi.customerValue.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Time to Rank:</span>
              <span className="font-medium">{content.roi.timeToRank} months</span>
            </div>
            <div className="flex justify-between text-sm font-medium text-primary">
              <span>Est. Monthly Value:</span>
              <span>${content.roi.monthlyValue.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div>
          <h5 className="text-sm font-medium text-gray-900 mb-2">Technical Requirements</h5>
          <div className="space-y-3">
            <div className="text-sm">
              <span className="text-gray-600">Schema Markup:</span>
              <code className="ml-2 px-2 py-1 bg-gray-100 rounded text-xs">{content.technicalRequirements.schema}</code>
            </div>
            <div className="text-sm">
              <span className="text-gray-600">Required Headings:</span>
              <div className="mt-1 space-y-1">
                {content.technicalRequirements.headings.map((heading, index) => (
                  <div key={index} className="text-xs text-gray-600">H{index + 1}: {heading}</div>
                ))}
              </div>
            </div>
            <div className="text-sm">
              <span className="text-gray-600">Internal Links:</span>
              <span className="ml-2">Minimum {content.technicalRequirements.internalLinks}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const CompetitorCard = ({ competitor }: { competitor: Competitor }) => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h4 className="font-medium text-gray-900 mb-4">{competitor.domain}</h4>
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{competitor.metrics.performance}</div>
            <div className="text-xs text-gray-600">Performance</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{competitor.metrics.seo}</div>
            <div className="text-xs text-gray-600">SEO Score</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {(competitor.metrics.traffic / 1000).toFixed(1)}k
            </div>
            <div className="text-xs text-gray-600">Monthly Traffic</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-xl font-bold text-primary">{competitor.metrics.backlinks.toLocaleString()}</div>
            <div className="text-xs text-gray-600">Backlinks</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-primary">{competitor.metrics.domainAuthority}</div>
            <div className="text-xs text-gray-600">Domain Authority</div>
          </div>
        </div>

        <div>
          <h5 className="text-sm font-medium text-gray-900 mb-2">Social Presence</h5>
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center">
              <div className="text-sm font-medium text-primary">
                {(competitor.metrics.socialFollowers.twitter / 1000).toFixed(1)}k
              </div>
              <div className="text-xs text-gray-600">Twitter</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-medium text-primary">
                {(competitor.metrics.socialFollowers.linkedin / 1000).toFixed(1)}k
              </div>
              <div className="text-xs text-gray-600">LinkedIn</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-medium text-primary">
                {(competitor.metrics.socialFollowers.facebook / 1000).toFixed(1)}k
              </div>
              <div className="text-xs text-gray-600">Facebook</div>
            </div>
          </div>
        </div>

        <div>
          <h5 className="text-sm font-medium text-gray-900 mb-2">Content Strategy</h5>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Post Frequency:</span>
              <span>{competitor.contentStrategy.postFrequency}</span>
            </div>
            <div className="flex justify-between">
              <span>Avg. Word Count:</span>
              <span>{competitor.contentStrategy.avgWordCount}</span>
            </div>
          </div>
        </div>

        <div>
          <h5 className="text-sm font-medium text-gray-900 mb-2">Top Performing Pages</h5>
          <div className="space-y-2">
            {competitor.contentStrategy.topPerformingPages.map((page) => (
              <div key={page.url} className="text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>{page.url}</span>
                  <span>{page.traffic.toLocaleString()} visits</span>
                </div>
                <div className="text-xs text-gray-500 text-right">
                  {page.shares} shares
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h5 className="text-sm font-medium text-gray-900 mb-2">Top Keywords</h5>
          <div className="space-y-2">
            {competitor.topKeywords.map((keyword) => (
              <div key={keyword.keyword} className="flex items-center justify-between">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {keyword.keyword}
                </span>
                <div className="text-sm">
                  <span className="text-primary font-medium">#{keyword.position}</span>
                  <span className="text-gray-500 ml-2">
                    {keyword.traffic.toLocaleString()} visits
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <h5 className="text-sm font-medium text-gray-900 mb-2">Strengths</h5>
            <ul className="space-y-1">
              {competitor.strengths.map((strength) => (
                <li key={strength} className="flex items-center text-sm text-green-600">
                  <ChartPieIcon className="w-4 h-4 mr-2" />
                  {strength}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-sm font-medium text-gray-900 mb-2">Weaknesses</h5>
            <ul className="space-y-1">
              {competitor.weaknesses.map((weakness) => (
                <li key={weakness} className="flex items-center text-sm text-red-600">
                  <ChartPieIcon className="w-4 h-4 mr-2" />
                  {weakness}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )

  const TechnicalSEOCard = ({ item }: { item: TechnicalSEO }) => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-start justify-between mb-4">
        <h4 className="font-medium text-gray-900">{item.category}</h4>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          item.priority === 'critical' ? 'bg-red-100 text-red-800' :
          item.priority === 'high' ? 'bg-yellow-100 text-yellow-800' :
          item.priority === 'medium' ? 'bg-blue-100 text-blue-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {item.priority}
        </span>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">{item.description}</p>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Impact Score:</span>
          <span className="font-medium">{item.impact}/10</span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Time to Fix:</span>
          <span className="font-medium">{item.timeToFix}</span>
        </div>

        <div>
          <h5 className="text-sm font-medium text-gray-900 mb-2">Implementation Steps</h5>
          <ol className="list-decimal list-inside space-y-1">
            {item.steps.map((step, index) => (
              <li key={index} className="text-sm text-gray-600">{step}</li>
            ))}
          </ol>
        </div>

        {item.tools && (
          <div>
            <h5 className="text-sm font-medium text-gray-900 mb-2">Recommended Tools</h5>
            <div className="flex flex-wrap gap-2">
              {item.tools.map((tool, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <Layout>
      <Head>
        <title>Website Analyzer | Backstage Interactive</title>
        <meta 
          name="description" 
          content="Get a comprehensive analysis of your website's performance, SEO, content opportunities, and competitive landscape." 
        />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-magenta bg-clip-text text-transparent leading-tight md:leading-tight py-1">
                Website Analyzer
              </h1>
              <p className="mt-6 text-lg text-gray-600">
                Get a comprehensive analysis of your website's performance, SEO, content opportunities, and competitive landscape.
              </p>
            </motion.div>
          </div>

          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="url" className="sr-only">
                  Website URL
                </label>
                <input
                  type="url"
                  id="url"
                  name="url"
                  required
                  placeholder="Enter website URL (e.g., https://example.com)"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </div>
              <button
                type="submit"
                disabled={isAnalyzing}
                className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze Website'}
              </button>
            </form>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-8 p-4 rounded-lg bg-red-50 text-red-600"
              >
                {error}
              </motion.div>
            )}

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-12 space-y-8"
              >
                <div className="flex justify-center space-x-4 flex-wrap gap-y-2">
                  <TabButton
                    label="Performance"
                    icon={ChartBarIcon}
                    isActive={activeTab === 'scores'}
                    onClick={() => setActiveTab('scores')}
                  />
                  <TabButton
                    label="Keywords"
                    icon={KeyIcon}
                    isActive={activeTab === 'keywords'}
                    onClick={() => setActiveTab('keywords')}
                  />
                  <TabButton
                    label="Content"
                    icon={DocumentTextIcon}
                    isActive={activeTab === 'content'}
                    onClick={() => setActiveTab('content')}
                  />
                  <TabButton
                    label="Competitors"
                    icon={UsersIcon}
                    isActive={activeTab === 'competitors'}
                    onClick={() => setActiveTab('competitors')}
                  />
                </div>

                {activeTab === 'scores' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-8"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <ScoreCard label="Performance" score={result.performance} />
                      <ScoreCard label="Accessibility" score={result.accessibility} />
                      <ScoreCard label="Best Practices" score={result.bestPractices} />
                      <ScoreCard label="SEO" score={result.seo} />
                    </div>

                    {result.recommendations && (
                      <div className="mt-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Recommendations</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {result.recommendations.map((rec) => (
                            <div key={rec.category} className="bg-white rounded-xl shadow-lg p-6">
                              <h4 className="font-medium text-gray-900 mb-4">{rec.category}</h4>
                              <ul className="space-y-2">
                                {rec.items.map((item) => (
                                  <li key={item} className="flex items-start text-sm text-gray-600">
                                    <LightBulbIcon className="w-5 h-5 text-primary shrink-0 mr-2" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {result.historicalMetrics && (
                      <div className="mt-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Historical Performance</h3>
                        <div className="bg-white rounded-xl shadow-lg p-6">
                          <div className="relative h-60">
                            <div className="absolute inset-0">
                              {result.historicalMetrics.map((metric, index, array) => {
                                const x = (index / (array.length - 1)) * 100
                                const y = ((metric.performance / 100) * 100)
                                return index === 0 ? `M ${x} ${100 - y}` : `L ${x} ${100 - y}`
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {result.technicalSEO && (
                      <div className="mt-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Technical SEO Recommendations</h3>
                        <div className="grid grid-cols-1 gap-6">
                          {result.technicalSEO.map((item, index) => (
                            <TechnicalSEOCard key={index} item={item} />
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === 'keywords' && result.keywords && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    {result.keywords.map((keyword) => (
                      <KeywordCard key={keyword.keyword} keyword={keyword} />
                    ))}
                  </motion.div>
                )}

                {activeTab === 'content' && result.contentSuggestions && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 gap-6">
                      {result.contentSuggestions.map((suggestion) => (
                        <ContentCard key={suggestion.title} content={suggestion} />
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'competitors' && result.competitors && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    {result.competitors.map((competitor) => (
                      <CompetitorCard key={competitor.domain} competitor={competitor} />
                    ))}
                  </motion.div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default WebsiteAnalyzerPage 
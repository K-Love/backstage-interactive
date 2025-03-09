import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import {
  ChartBarIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  ShareIcon,
  CheckCircleIcon,
  BeakerIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'
import Head from 'next/head'

interface ScoreData {
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

const DigitalScore = () => {
  const router = useRouter()
  const { url } = router.query
  const urlString = typeof url === 'string' ? url : ''
  const [loading, setLoading] = useState(true)
  const [scoreData, setScoreData] = useState<ScoreData | null>(null)
  const [error, setError] = useState('')
  const [reportDate] = useState(new Date().toLocaleDateString())

  useEffect(() => {
    const analyzeWebsite = async () => {
      if (!urlString) return

      try {
        const response = await fetch('/api/analyze-site', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url: urlString }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Analysis failed')
        }

        const data = await response.json()
        setScoreData(data)
        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to analyze website. Please try again.')
        setLoading(false)
      }
    }

    if (urlString) {
      analyzeWebsite()
    }
  }, [urlString])

  const ScoreCard = ({ title, score, icon: Icon, details }: { 
    title: string
    score: number
    icon: React.ComponentType<any>
    details: string[]
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-lg"
    >
      <div className="flex items-center mb-4">
        <Icon className="w-6 h-6 text-primary mr-2" />
        <h3 className="text-lg font-semibold text-primary">{title}</h3>
      </div>
      <div className="flex items-center mb-4">
        <div className="relative w-24 h-24">
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
              stroke={score >= 80 ? '#16A085' : score >= 60 ? '#F5A623' : '#EC008C'}
              strokeWidth="3"
              strokeDasharray={`${score}, 100`}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-primary">{score}</span>
          </div>
        </div>
        <ul className="ml-6 flex-1 space-y-2">
          {details.map((detail, index) => (
            <li key={index} className="text-sm text-charcoal flex items-start">
              <span className="w-2 h-2 rounded-full bg-magenta mt-1.5 mr-2 flex-shrink-0" />
              {detail}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )

  if (!url) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 px-4">
        <Head>
          <title>Digital Presence Scorer | Backstage Interactive</title>
          <meta name="description" content="Analyze your website's digital presence with our comprehensive scoring tool." />
        </Head>
        <div className="max-w-4xl mx-auto text-center py-20">
          <h1 className="text-3xl font-bold text-primary mb-4">No URL Provided</h1>
          <p className="text-charcoal mb-8">Please provide a URL to analyze your digital presence.</p>
          <button
            onClick={() => router.push('/')}
            className="px-8 py-4 bg-magenta hover:bg-magenta/90 text-white rounded-lg font-semibold transition-colors"
          >
            Go Back Home
          </button>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 px-4">
        <Head>
          <title>Analyzing {url} | Digital Presence Scorer</title>
        </Head>
        <div className="max-w-4xl mx-auto text-center py-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            <h1 className="text-3xl font-bold text-primary">Analyzing Your Digital Presence</h1>
            <p className="text-xl text-charcoal">Scanning {url}</p>
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 border-4 border-primary border-t-magenta rounded-full animate-spin" />
              <div className="text-charcoal">
                This will take a few moments...
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 px-4">
        <Head>
          <title>Analysis Error | Digital Presence Scorer</title>
        </Head>
        <div className="max-w-4xl mx-auto text-center py-20">
          <h1 className="text-3xl font-bold text-primary mb-4">Analysis Failed</h1>
          <p className="text-charcoal mb-8">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-4 bg-magenta hover:bg-magenta/90 text-white rounded-lg font-semibold transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (!scoreData) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 px-4">
        <Head>
          <title>Analysis Error | Digital Presence Scorer</title>
        </Head>
        <div className="max-w-4xl mx-auto text-center py-20">
          <h1 className="text-3xl font-bold text-primary mb-4">Analysis Error</h1>
          <p className="text-charcoal mb-8">Failed to load analysis data. Please try again.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-4 bg-magenta hover:bg-magenta/90 text-white rounded-lg font-semibold transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4">
      <Head>
        <title>Digital Presence Score: {scoreData.overall}/100 | {urlString}</title>
        <meta name="robots" content="noindex" />
      </Head>

      <div className="max-w-6xl mx-auto py-12">
        <div className="report-header text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h1 className="text-3xl font-bold text-primary">Digital Presence Score</h1>
            <p className="text-xl text-charcoal">Results for {urlString}</p>
            <p className="text-sm text-charcoal">Generated on {reportDate}</p>
            <div className="inline-flex items-center bg-white px-6 py-3 rounded-full shadow-md">
              <span className="text-2xl font-bold text-primary mr-2">Overall Score:</span>
              <span className={`text-2xl font-bold ${
                scoreData.overall >= 80 ? 'text-teal' : 
                scoreData.overall >= 60 ? 'text-amber' : 
                'text-magenta'
              }`}>
                {scoreData.overall}
              </span>
            </div>
          </motion.div>
        </div>

        <div className="score-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ScoreCard
            title="Performance"
            score={scoreData.performance}
            icon={ChartBarIcon}
            details={scoreData.details.performance}
          />
          <ScoreCard
            title="Accessibility"
            score={scoreData.accessibility}
            icon={UserGroupIcon}
            details={scoreData.details.accessibility}
          />
          <ScoreCard
            title="Best Practices"
            score={scoreData.bestPractices}
            icon={CheckCircleIcon}
            details={scoreData.details.bestPractices}
          />
          <ScoreCard
            title="SEO & Visibility"
            score={scoreData.seo}
            icon={GlobeAltIcon}
            details={scoreData.details.seo}
          />
          <ScoreCard
            title="Security"
            score={scoreData.security}
            icon={ShieldCheckIcon}
            details={scoreData.details.security}
          />
          <ScoreCard
            title="Social Integration"
            score={scoreData.social}
            icon={ShareIcon}
            details={scoreData.details.social}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center screen-only"
        >
          <h2 className="text-2xl font-bold text-primary mb-6">Ready to Improve Your Score?</h2>
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={`/contact?score=${scoreData.overall}&url=${encodeURIComponent(urlString)}`}
                className="px-8 py-4 bg-magenta hover:bg-magenta/90 text-white rounded-lg font-semibold transition-colors"
              >
                Get a Custom Action Plan
              </a>
              <button
                onClick={() => window.location.reload()}
                className="px-8 py-4 border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-lg font-semibold transition-colors"
              >
                Analyze Again
              </button>
            </div>
            <p className="text-sm text-charcoal mt-4">
              Want to save this report?{' '}
              <button 
                onClick={() => {
                  // Set filename for print
                  document.title = `Digital-Presence-Score-${urlString.replace(/[^a-zA-Z0-9]/g, '-')}-${reportDate}`
                  window.print()
                  // Reset title
                  document.title = `Digital Presence Score: ${scoreData.overall}/100 | ${urlString}`
                }}
                className="text-primary hover:underline"
              >
                Download PDF
              </button>
            </p>
          </div>
        </motion.div>

        <div className="print-only mt-12 text-center">
          <p className="text-sm">
            This report was generated by Backstage Interactive's Digital Presence Scorer.
            Visit {process.env.NEXT_PUBLIC_WEBSITE_URL} to analyze your website.
          </p>
        </div>
      </div>
    </div>
  )
}

export default DigitalScore 
import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Layout from '@/components/layout/Layout'
import { CheckIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'

interface Tool {
  id: string
  name: string
  description: string
  features: string[]
  price: {
    monthly: number
    yearly: number
  }
  imageUrl: string
  comingSoon?: boolean
}

const tools: Tool[] = [
  {
    id: 'website-analyzer',
    name: 'Website Analyzer',
    description: 'Get a comprehensive analysis of your website\'s performance, SEO, and accessibility.',
    imageUrl: '/images/tools/seo-analyzer.svg',
    features: [
      'Performance metrics',
      'SEO analysis',
      'Accessibility audit',
      'Best practices check',
      'Mobile responsiveness',
      'Core Web Vitals'
    ],
    price: {
      monthly: 0,
      yearly: 0
    }
  },
  {
    id: 'content-generator',
    name: 'AI Content Generator',
    description: 'Create engaging content for your website, blog, and social media with AI assistance.',
    imageUrl: '/images/tools/content-generator.svg',
    features: [
      'Blog post generation',
      'Social media content',
      'Meta descriptions',
      'Product descriptions',
      'Email templates',
      'Unlimited generations'
    ],
    price: {
      monthly: 29,
      yearly: 290
    },
    comingSoon: true
  },
  {
    id: 'analytics-dashboard',
    name: 'Analytics Dashboard',
    description: 'Track and visualize your website\'s performance metrics in real-time.',
    imageUrl: '/images/tools/analytics-dashboard.svg',
    features: [
      'Real-time analytics',
      'Custom reports',
      'Goal tracking',
      'User behavior',
      'Conversion tracking',
      'Export capabilities'
    ],
    price: {
      monthly: 49,
      yearly: 490
    },
    comingSoon: true
  }
]

const ToolCard = ({ tool }: { tool: Tool }) => {
  const [isYearly, setIsYearly] = useState(false)
  const price = isYearly ? tool.price.yearly : tool.price.monthly
  const isFree = price === 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative bg-white rounded-2xl shadow-lg overflow-hidden"
    >
      <div className="p-6 sm:p-8">
        <div className="h-12 w-12 mb-6 relative">
          <Image
            src={tool.imageUrl}
            alt={tool.name}
            fill
            className="object-contain"
          />
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2">{tool.name}</h3>
        <p className="text-gray-600 mb-6">{tool.description}</p>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-baseline">
              <span className="text-4xl font-bold text-gray-900">
                {isFree ? 'Free' : `$${price}`}
              </span>
              {!isFree && (
                <span className="ml-2 text-gray-500">/{isYearly ? 'year' : 'month'}</span>
              )}
            </div>
            {!isFree && (
              <div className="flex items-center space-x-2">
                <span className={`text-sm ${!isYearly ? 'text-primary' : 'text-gray-500'}`}>Monthly</span>
                <button
                  onClick={() => setIsYearly(!isYearly)}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                    isYearly ? 'bg-primary' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      isYearly ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
                <span className={`text-sm ${isYearly ? 'text-primary' : 'text-gray-500'}`}>Yearly</span>
              </div>
            )}
          </div>
        </div>

        <ul className="mb-8 space-y-4">
          {tool.features.map((feature) => (
            <li key={feature} className="flex items-start">
              <CheckIcon className="h-5 w-5 shrink-0 text-primary" />
              <span className="ml-3 text-sm text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>

        {tool.comingSoon ? (
          <div className="flex justify-center">
            <span className="inline-flex items-center px-4 py-2 rounded-lg bg-gray-100 text-gray-600 text-sm font-medium">
              Coming Soon
            </span>
          </div>
        ) : (
          <button
            onClick={() => {
              if (isFree) {
                // Handle free tool access
                window.location.href = `/tools/${tool.id}`
              } else {
                // Handle paid tool subscription
                // This will be connected to Stripe
                console.log('Subscribe to:', tool.name)
              }
            }}
            className="w-full rounded-lg px-4 py-2 text-sm font-semibold bg-primary text-white hover:bg-primary/90 transition-colors"
          >
            {isFree ? 'Try Now' : 'Subscribe'}
          </button>
        )}
      </div>
    </motion.div>
  )
}

const ToolsPage: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState<'all' | 'free' | 'paid'>('all')

  const filteredTools = tools.filter(tool => {
    const matchesSearch = 
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'free' && tool.price.monthly === 0) ||
      (filter === 'paid' && tool.price.monthly > 0)
    return matchesSearch && matchesFilter
  })

  return (
    <Layout>
      <Head>
        <title>Tools | Backstage Interactive</title>
        <meta 
          name="description" 
          content="Explore our suite of powerful web development and digital marketing tools. From free tools to premium features, find the perfect solution for your needs." 
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
                Digital Tools for Modern Web
              </h1>
              <p className="mt-6 text-lg text-gray-600">
                Enhance your website's performance and reach with our suite of powerful tools. 
                Choose the plan that best fits your needs.
              </p>
            </motion.div>
          </div>

          <div className="mb-8 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between">
            <div className="relative rounded-md shadow-sm max-w-xs">
              <input
                type="text"
                placeholder="Search tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full rounded-md border-gray-300 pl-4 pr-12 focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 
                  ${filter === 'all' 
                    ? 'bg-primary text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                All Tools
              </button>
              <button
                onClick={() => setFilter('free')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 
                  ${filter === 'free' 
                    ? 'bg-primary text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                Free Tools
              </button>
              <button
                onClick={() => setFilter('paid')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 
                  ${filter === 'paid' 
                    ? 'bg-primary text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                Premium Tools
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block rounded-2xl bg-gradient-to-r from-primary/5 to-magenta/5 p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Need a Custom Solution?
              </h2>
              <p className="text-gray-600 mb-6">
                Looking for specific features or custom integrations? 
                Contact us to discuss your requirements.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Contact Sales
              </a>
            </motion.div>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default ToolsPage
// src/app/tools/page.tsx
import React from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { colors } from '@/design-tokens';
import ToolsHeader from '@/components/headers/ToolsHeader';

export default function Tools() {
  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: colors.neutralBg }}>
      <Head>
        <title>Tools | Backstage Interactive</title>
        <meta name="description" content="Access free and premium tools from Backstage Interactive to enhance your web presence and business growth." />
        <meta name="keywords" content="tools, web presence, business growth, free tools, premium tools" />
        <meta property="og:title" content="Tools | Backstage Interactive" />
        <meta property="og:description" content="Access free and premium tools from Backstage Interactive to enhance your web presence and business growth." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Tools | Backstage Interactive" />
        <meta name="twitter:description" content="Access free and premium tools from Backstage Interactive to enhance your web presence and business growth." />
      </Head>
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 px-4 text-center" style={{ backgroundColor: colors.primary, color: 'white' }}>
          <div className="container mx-auto">
            <h1 className="text-5xl font-bold mb-4 gradient-title">Tools to Elevate Your Digital Game</h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">Whether you're a small business owner or a marketing professional, our suite of tools—free and premium—helps you build a stronger online presence without needing a tech degree.</p>
            {/* SVG Illustration Idea: A toolbox with digital tools spilling out */}
            <div className="mt-8 h-64 flex items-center justify-center">
              <div className="text-accent1" style={{ color: colors.accent1 }}>
              <ToolsHeader />
                <span className="text-8xl">🛠️</span>
              </div>
            </div>
          </div>
        </section>
        {/* Free Tools Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12" style={{ color: colors.neutralText }}>Free Tools for Every Business</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card title="Website Health Check" description="Analyze your site's performance, SEO, and accessibility in seconds. Get actionable insights to improve user experience and search rankings." />
              <Card title="Social Media Content Planner" description="Plan a month's worth of social posts with templates and ideas tailored to your industry. Boost engagement without the guesswork." />
              <Card title="Keyword Suggestion Tool" description="Discover low-competition keywords to target for your niche. Perfect for beginners looking to attract organic traffic." />
            </div>
            <div className="text-center mt-12">
              <Button variant="primary" size="medium">Sign Up to Access Free Tools</Button>
              <p className="text-sm mt-2" style={{ color: colors.neutralText }}>Create a free account to unlock these tools in the members area.</p>
            </div>
          </div>
        </section>
        {/* Paid Tools Section */}
        <section className="py-16 px-4" style={{ backgroundColor: colors.primaryLight, color: 'white' }}>
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Premium Tools for Serious Growth</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card title="Advanced SEO Auditor ($9/month)" description="Deep-dive into your site's SEO with competitor analysis, backlink tracking, and custom reports. Ideal for businesses ready to dominate search results." />
              <Card title="Conversion Rate Optimizer ($15/month)" description="A/B test landing pages with real-time data and heatmaps. Turn more clicks into customers with data-driven tweaks." />
              <Card title="Social Media Automation Suite ($19/month)" description="Schedule, post, and analyze across multiple platforms from one dashboard. Save hours each week while growing your audience." />
              <Card title="Email Marketing Blueprint ($12/month)" description="Build high-converting email sequences with templates, analytics, and automation triggers. Perfect for nurturing leads into sales." />
              <Card title="Competitive Intelligence Tracker ($25/month)" description="Monitor competitors’ digital strategies—ads, keywords, content, and more. Stay one step ahead with actionable insights." />
            </div>
            <div className="text-center mt-12">
              <Button variant="accent" size="medium">Upgrade for Premium Access</Button>
              <p className="text-sm mt-2">Sign up or log in to purchase and access premium tools in the members area.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
// src/app/agency/page.tsx (updated portfolio section)
import React from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { colors } from '@/design-tokens';
import Link from 'next/link';
import AgencyHeader from '@/components/headers/AgencyHeader';

export default function Agency() {
  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: colors.neutralBg }}>
      <Head>
        <title>Agency | Backstage Interactive</title>
        <meta name="description" content="Backstage Interactive Agency transforms ideas into digital reality with custom web development and design services." />
        <meta name="keywords" content="agency, web development, design, digital solutions" />
        <meta property="og:title" content="Agency | Backstage Interactive" />
        <meta property="og:description" content="Backstage Interactive Agency transforms ideas into digital reality with custom web development and design services." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Agency | Backstage Interactive" />
        <meta name="twitter:description" content="Backstage Interactive Agency transforms ideas into digital reality with custom web development and design services." />
      </Head>
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 px-4 text-center" style={{ backgroundColor: colors.primary, color: 'white' }}>
          <div className="container mx-auto">
            <h1 className="text-5xl font-bold mb-4 gradient-title">Transforming Ideas into Digital Reality</h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">We craft digital experiences that inspire, engage, and deliver results. Your vision, amplified by our expertise, becomes an irresistible online presence.</p>
            {/* SVG Illustration Idea: A blueprint turning into a vibrant digital interface */}
            <div className="mt-8 h-64 flex items-center justify-center">
              <div className="text-accent2" style={{ color: colors.accent2 }}>
              <AgencyHeader />
                <span className="text-8xl">💻</span>
              </div>
            </div>
          </div>
        </section>
        {/* Offer Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6" style={{ color: colors.neutralText }}>An Irresistible Offer for Your Business</h2>
            <p className="text-lg mb-8 max-w-4xl mx-auto" style={{ color: colors.neutralText }}>At Backstage Interactive Agency, we don't just build websites—we build growth engines. Imagine a digital presence so compelling that your prospects can't look away, delivered by a team obsessed with your success. From stunning design to robust development, we tailor every pixel and line of code to convert visitors into loyal customers.</p>
            <Button variant="primary" size="large">Let's Create Together</Button>
          </div>
        </section>
        {/* White Label Solution */}
        <section className="py-16 px-4" style={{ backgroundColor: colors.primaryLight, color: 'white' }}>
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">White Label Solutions at No Upfront Cost</h2>
            <p className="text-lg mb-8 max-w-4xl mx-auto">Partner with us to offer premium web development and design services under your brand. Our white label solution lets agencies and consultants expand their offerings without the overhead. We handle the tech; you take the credit. No upfront fees—pay only when you close the deal, with flexible revenue-sharing models.</p>
            <Button variant="accent" size="medium">Learn More About White Label</Button>
          </div>
        </section>
        {/* Portfolio Section – Updated to Two-Column Responsive Layout */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12" style={{ color: colors.neutralText }}>Our Work Speaks for Itself</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-lg shadow-md text-center" style={{ backgroundColor: colors.neutralBg }}>
                <Link href="https://www.chriswillburncoaching.com" target="_blank" rel="noopener noreferrer">
                  <img src="/images/cwc-logo.png" alt="Chris Willburn Coaching" className="mx-auto mb-4 h-24 w-auto object-contain" />
                  <h3 className="text-xl font-bold" style={{ color: colors.neutralText }}>Chris Willburn Coaching</h3>
                </Link>
              </div>
              <div className="p-6 rounded-lg shadow-md text-center" style={{ backgroundColor: colors.neutralBg }}>
                <Link href="https://www.sharreydore.com" target="_blank" rel="noopener noreferrer">
                  <img src="/images/sharrey-dore-logo.png" alt="Sharreydore" className="mx-auto mb-4 h-24 w-auto object-contain" />
                  <h3 className="text-xl font-bold" style={{ color: colors.neutralText }}>Sharreydore</h3>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
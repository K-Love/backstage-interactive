// src/app/studio/page.tsx
import React from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Card from '@/components/Card';
import { colors } from '@/design-tokens';
import StudioHeader from '@/components/headers/StudioHeader';

export default function Studio() {
  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: colors.neutralBg }}>
      <Head>
        <title>Studio | Backstage Interactive</title>
        <meta name="description" content="Backstage Interactive Studio innovates and pushes the boundaries of web technologies through experimental projects." />
        <meta name="keywords" content="studio, innovation, web technologies, experiments" />
        <meta property="og:title" content="Studio | Backstage Interactive" />
        <meta property="og:description" content="Backstage Interactive Studio innovates and pushes the boundaries of web technologies through experimental projects." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Studio | Backstage Interactive" />
        <meta name="twitter:description" content="Backstage Interactive Studio innovates and pushes the boundaries of web technologies through experimental projects." />
      </Head>
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 px-4 text-center" style={{ backgroundColor: colors.primary, color: 'white' }}>
          <div className="container mx-auto">
            <h1 className="text-5xl font-bold mb-4 gradient-title">Pushing the Boundaries of Web Innovation</h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">Backstage Interactive Studio is a lab for experimentation, where we explore cutting-edge web technologies and build in-house projects that redefine digital possibilities.</p>
            {/* SVG Illustration Idea: A futuristic lab with bubbling experiments and digital screens */}
            <div className="mt-8 h-64 flex items-center justify-center">
              <div className="text-accent1" style={{ color: colors.accent1 }}>
              <StudioHeader />
                <span className="text-8xl">🧪</span>
              </div>
            </div>
          </div>
        </section>
        {/* Projects Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12" style={{ color: colors.neutralText }}>Our Experimental Ventures</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card title="HerbCraft" description="A site dedicated to herbs for cooking and medicinal purposes, exploring unique content delivery methods." />
              <Card title="HustleFiles" description="A site and newsletter focusing on bootstrapped websites, analyzing successes and potential improvements." />
              <Card title="Phanterra" description="A coloring book brand for Amazon, testing e-commerce integrations and digital-to-physical product strategies." />
              <Card title="Splattrd" description="A t-shirt brand with potential to expand into other print-on-demand products, experimenting with design customization tools." />
              <Card title="Unnamed Bonsai Project" description="A work in progress, exploring niche community building and interactive content for bonsai enthusiasts." />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
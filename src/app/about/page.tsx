// src/app/about/page.tsx
import React from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AboutHeader from '@/components/headers/AboutHeader';
import { colors } from '@/design-tokens';

export default function About() {
  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: colors.neutralBg }}>
      <Head>
        <title>About | Backstage Interactive</title>
        <meta name="description" content="Welcome to the intersection of tech and creativity. Backstage Interactive brings cutting-edge web development, AI integration, and Web3 innovations together." />
        <meta name="keywords" content="about, tech, creativity, web development, AI, Web3" />
        <meta property="og:title" content="About | Backstage Interactive" />
        <meta property="og:description" content="Welcome to the intersection of tech and creativity. Backstage Interactive brings cutting-edge web development, AI integration, and Web3 innovations together." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="About | Backstage Interactive" />
        <meta name="twitter:description" content="Welcome to the intersection of tech and creativity. Backstage Interactive brings cutting-edge web development, AI integration, and Web3 innovations together." />
      </Head>
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 px-4 text-center" style={{ backgroundColor: colors.primary, color: 'white' }}>
          <div className="container mx-auto">
            <h1 className="text-5xl font-bold mb-4 gradient-title">Where Innovation Meets Imagination</h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">Welcome to the intersection of tech and creativity. Backstage Interactive brings cutting-edge web development, AI integration, and Web3 innovations together to craft digital experiences that simply work better.</p>
            {/* SVG Illustration Idea: A crossroads with tech (circuits, AI nodes) on one side and creativity (art, colors) on the other */}
            <div className="mt-8 h-64 flex items-center justify-center">
              <div className="text-accent2" style={{ color: colors.accent2 }}>
                <AboutHeader />
              </div>
            </div>
          </div>
        </section>
        {/* Content Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <p className="text-lg mb-6 max-w-4xl mx-auto" style={{ color: colors.neutralText }}>The setup is unique: one part agency, one part studio lab. The agency side crafts custom solutions for forward-thinking businesses, while the studio serves as a playground for building and growing innovative digital properties.</p>
            <p className="text-lg mb-12 max-w-4xl mx-auto" style={{ color: colors.neutralText }}>Think modern web frameworks meets AI sophistication, with a dash of blockchain innovation. The result? Digital solutions that don't just keep up with the curve—but help define it.</p>
            <h2 className="text-3xl font-bold text-center mb-8" style={{ color: colors.neutralText }}>Two Distinct Divisions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 rounded-lg shadow-md" style={{ backgroundColor: colors.neutralBg }}>
                <h3 className="text-2xl font-bold mb-4" style={{ color: colors.primary }}>The Agency</h3>
                <h4 className="text-xl font-semibold mb-2" style={{ color: colors.neutralText }}>Crafting Digital Experiences</h4>
                <p style={{ color: colors.neutralText }}>At the heart of Backstage Interactive is the Agency, dedicated to providing top-notch web development and digital marketing services. Whether building a stunning website, enhancing online presence, or driving targeted traffic to a business, strategies are tailored to meet specific needs.</p>
              </div>
              <div className="p-6 rounded-lg shadow-md" style={{ backgroundColor: colors.neutralBg }}>
                <h3 className="text-2xl font-bold mb-4" style={{ color: colors.primary }}>The Studio</h3>
                <h4 className="text-xl font-semibold mb-2" style={{ color: colors.neutralText }}>Innovating from Within</h4>
                <p style={{ color: colors.neutralText }}>Our Studio focuses on building and operating its own web projects. This division allows for the exploration of new ideas, experimentation with cutting-edge technologies, and the development of innovative solutions that push the boundaries of what's possible.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
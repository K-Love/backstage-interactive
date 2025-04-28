import React from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { Globe, Paintbrush, Megaphone, Lightbulb } from 'lucide-react';
import HomeHeroIllustration from '@/components/HomeHeroIllustration';

// Import Bebas Neue font from next/font/google
import { Bebas_Neue } from 'next/font/google';

const bebas = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900">
      <Head>
        <title>Backstage Interactive | Building Digital Experiences</title>
        <meta name="description" content="Backstage Interactive builds digital experiences, delivers consumer and client projects, and consults businesses on strategy and execution." />
        <meta name="keywords" content="digital experiences, web development, design, marketing, consulting" />
        <meta property="og:title" content="Backstage Interactive | Building Digital Experiences" />
        <meta property="og:description" content="Backstage Interactive builds digital experiences, delivers consumer and client projects, and consults businesses on strategy and execution." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Backstage Interactive | Building Digital Experiences" />
        <meta name="twitter:description" content="Backstage Interactive builds digital experiences, delivers consumer and client projects, and consults businesses on strategy and execution." />
      </Head>
      <Navbar />
      <main className="flex-grow">
        {/* HEADER SECTION */}
        <section className="relative py-16 text-center overflow-hidden bg-gradient-to-b from-indigo-50 to-white" style={{ minHeight: 400 }}>
          {/* SVG Illustration as background */}
          <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
            <HomeHeroIllustration />
          </div>
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-white/70 z-10 pointer-events-none" />
          {/* Header Content */}
          <div className="relative z-20 px-4 md:px-8">
            <h1 className={`text-4xl md:text-5xl font-bold text-neutral-900 mb-4 drop-shadow-sm ${bebas.className}`}>
              Building Digital Experiences
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-neutral-800 drop-shadow-sm">
              Backstage Interactive builds digital experiences, delivers consumer and client projects, and consults businesses on strategy and execution.
            </p>
          </div>
        </section>
        {/* SERVICES SECTION */}
        <section className="py-16 px-4 md:px-8 bg-white">
          <p className="text-xl text-center max-w-3xl mx-auto mb-12 text-neutral-800">
            Offering comprehensive digital solutions to help your business thrive in the modern world.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Card title="Web Development" description="Custom websites and applications built with modern technologies and best practices." icon={<Globe className="w-8 h-8 text-primary" />} />
            <Card title="Design" description="Beautiful, functional designs that enhance user experience and drive engagement." icon={<Paintbrush className="w-8 h-8 text-primary" />} />
            <Card title="Digital Marketing" description="Strategic marketing solutions to grow your online presence and reach your target audience." icon={<Megaphone className="w-8 h-8 text-primary" />} />
            <Card title="Consulting" description="Expert guidance to help you make informed decisions about your digital strategy." icon={<Lightbulb className="w-8 h-8 text-primary" />} />
          </div>
        </section>
        {/* CTA SECTION */}
        <section className="py-16 px-4 md:px-8 text-center bg-gradient-to-b from-white to-indigo-50">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 drop-shadow-sm">
            Ready to Transform Your Digital Presence?
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-8 text-neutral-800 drop-shadow-sm">
            Let's collaborate to create exceptional digital experiences that drive results and exceed expectations.
          </p>
          <Button variant="primary" size="large">Get Started</Button>
        </section>
      </main>
      <Footer />
    </div>
  );
}
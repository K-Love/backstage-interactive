import React from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { colors } from '@/design-tokens';
import { Globe, Paintbrush, Megaphone, Lightbulb } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: colors.neutralBg }}>
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
        {/* Hero Section with SVG Illustration */}
        <section className="py-16 px-4 text-center" style={{ backgroundColor: colors.primary, color: 'white' }}>
          <div className="container mx-auto">
            <h1 className="text-5xl font-bold mb-4">Building Digital Experiences</h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">Backstage Interactive builds digital experiences, delivers consumer and client projects, and consults businesses on strategy and execution.</p>
            {/* SVG Illustration Idea: A dynamic stage with digital elements (screens, gears, lights) symbolizing creation and interaction */}
            <div className="mt-8 h-64 flex items-center justify-center">
              <div className="text-accent1" style={{ color: colors.accent1 }}>
                {/* Placeholder for SVG or Three.js scene */}
                <Globe size={128} />
              </div>
            </div>
          </div>
        </section>
        {/* Services Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12" style={{ color: colors.neutralText }}>Offering comprehensive digital solutions to help your business thrive in the modern world.</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card title="Web Development" description="Custom websites and applications built with modern technologies and best practices." icon={<Globe size={24} />} />
              <Card title="Design" description="Beautiful, functional designs that enhance user experience and drive engagement." icon={<Paintbrush size={24} />} />
              <Card title="Digital Marketing" description="Strategic marketing solutions to grow your online presence and reach your target audience." icon={<Megaphone size={24} />} />
              <Card title="Consulting" description="Expert guidance to help you make informed decisions about your digital strategy." icon={<Lightbulb size={24} />} />
            </div>
          </div>
        </section>
        {/* CTA Section */}
        <section className="py-16 px-4 text-center" style={{ backgroundColor: colors.primaryLight, color: 'white' }}>
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Digital Presence?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">Let's collaborate to create exceptional digital experiences that drive results and exceed expectations.</p>
            <Button variant="accent" size="large">Get Started</Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
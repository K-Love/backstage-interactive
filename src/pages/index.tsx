import { NextPage } from 'next';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Backstage Interactive - Digital Experiences & Marketing</title>
        <meta name="description" content="Backstage Interactive builds digital experiences, delivers consumer and client projects, and consults businesses on strategy and execution." />
      </Head>

      <section className="hero-gradient py-20 md:py-32 relative overflow-hidden">
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center text-white"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Building Digital Experiences
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Backstage Interactive builds digital experiences, delivers consumer and client projects, 
              and consults businesses on strategy and execution. I take my work seriously, but not myself. 
              My passion lies in bringing brands and companies to a whole new level through the use of sound 
              development practices, creative online marketing, content, and social media.
            </p>
            <motion.a
              href="/contact"
              className="btn inline-flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-light">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 gradient-text">
              Transforming Ideas into Reality
            </h2>
            <p className="text-lg text-gray-600">
              Through innovative solutions and strategic thinking, we help businesses achieve their digital goals 
              and reach new heights in the ever-evolving digital landscape.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;

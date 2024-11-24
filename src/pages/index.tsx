import { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import { CodeBracketIcon, PresentationChartLineIcon, MegaphoneIcon } from '@heroicons/react/24/outline';

const Home: NextPage = () => {
  const services = [
    {
      title: 'Web Development',
      description: 'Building modern, responsive websites and applications using cutting-edge technologies.',
      icon: <CodeBracketIcon />
    },
    {
      title: 'Digital Strategy',
      description: 'Creating comprehensive digital strategies to help businesses grow and succeed online.',
      icon: <PresentationChartLineIcon />
    },
    {
      title: 'Digital Marketing',
      description: 'Implementing effective marketing campaigns to reach and engage your target audience.',
      icon: <MegaphoneIcon />
    }
  ];

  return (
    <Layout>
      <Head>
        <title>Backstage Interactive - Digital Experiences & Marketing</title>
        <meta name="description" content="Backstage Interactive builds digital experiences, delivers consumer and client projects, and consults businesses on strategy and execution." />
      </Head>

      <Hero />

      <section className="py-20 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                icon={service.icon}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">My passion lies in bringing brands to a whole new level</h2>
            <p className="text-lg text-gray-600">
              Through the use of sound development practices, creative online marketing, content, and social media, 
              we help businesses achieve their digital goals and reach new heights.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;

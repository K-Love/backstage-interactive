import { NextPage } from 'next';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';
import { 
  PaintBrushIcon, 
  CodeBracketIcon, 
  ShareIcon, 
  LightBulbIcon 
} from '@heroicons/react/24/outline';

const services = [
  {
    title: "Design",
    subtitle: "Crafting Visuals",
    description: "Design is where imagination meets strategy... transforming concepts into compelling visuals that capture a brand's essence. A blend of aesthetics and functionality creates designs that not only look stunning but also communicate messages effectively.",
    icon: <PaintBrushIcon className="w-10 h-10 text-accent stroke-2" />
  },
  {
    title: "Development",
    subtitle: "Building Solutions",
    description: "Development turns visionary ideas into reality... building robust, scalable solutions tailored to specific needs. Love WordPress, Shopify, or another popular platform? Great, let's use it. Want to get back to the basics and use good old HTML, CSS, and JavaScript? Let's do it.",
    icon: <CodeBracketIcon className="w-10 h-10 text-primary stroke-2" />
  },
  {
    title: "Sharing",
    subtitle: "Spreading the Word",
    description: "Sharing is about making connections and amplifying voices. Digital marketing strategies are designed to maximize reach and engagement. Through targeted social media campaigns, SEO, content marketing, and more, brands can connect with their audience on a deeper level.",
    icon: <ShareIcon className="w-10 h-10 text-accent2 stroke-2" />
  },
  {
    title: "Consulting",
    subtitle: "Guiding Success",
    description: "Consulting is where expertise meets partnership. Strategic guidance is provided to navigate the complexities of the digital landscape... working closely to understand goals and challenges, offering tailored solutions to drive growth and success.",
    icon: <LightBulbIcon className="w-10 h-10 text-accent stroke-2" />
  }
];

const portfolio = [
  {
    title: "Chris Willburn Coaching",
    url: "https://www.chriswillburncoaching.com/",
    image: "/images/chris-willburn.jpg"
  },
  {
    title: "Sharrey Dore",
    url: "https://www.sharreydore.com/",
    image: "/images/sharrey-dore.jpg"
  }
];

const Agency: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Agency - Backstage Interactive</title>
        <meta name="description" content="Discover our agency services including design, development, marketing, and consulting" />
      </Head>

      <PageHeader 
        title="Agency" 
        subtitle="Crafting digital experiences that drive results" 
      />

      <section className="section-divider light">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="text-accent mb-6 transform transition-transform duration-300 group-hover:scale-110">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-2 text-gray-900">{service.title}</h3>
                <h4 className="text-accent2 font-medium mb-4">{service.subtitle}</h4>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-dark text-white">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-12 gradient-text">Showcase</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {portfolio.map((item, index) => (
              <motion.a
                key={item.title}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="block group"
              >
                <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
                  <div className="relative h-48 mb-4 overflow-hidden rounded">
                    <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                  </div>
                  <h3 className="text-xl font-bold text-center group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Agency;

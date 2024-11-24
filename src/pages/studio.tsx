import { NextPage } from 'next';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';
import { 
  LightBulbIcon, 
  MagnifyingGlassIcon, 
  CommandLineIcon, 
  RocketLaunchIcon, 
  MegaphoneIcon, 
  ChartBarIcon 
} from '@heroicons/react/24/outline';

const processSteps = [
  {
    title: "Idea",
    description: "It all starts with the idea. It could come out of thin air, or it could be an improvement on a concept that already exists.",
    icon: <LightBulbIcon className="w-8 h-8 text-accent stroke-2" />
  },
  {
    title: "Validation",
    description: "When an idea sounds good, we put it through the wringer, looking at search volume, social media interest, business models, and more.",
    icon: <MagnifyingGlassIcon className="w-8 h-8 text-accent2 stroke-2" />
  },
  {
    title: "Development",
    description: "Projects for validated ideas are built according to modern standards.",
    icon: <CommandLineIcon className="w-8 h-8 text-primary stroke-2" />
  },
  {
    title: "Launch",
    description: "The project gets launched to a pre-built email list, social media following, and/or partnerships, among other methods.",
    icon: <RocketLaunchIcon className="w-8 h-8 text-accent stroke-2" />
  },
  {
    title: "Marketing",
    description: "Share it with an interested audience wherever they hang out – search engines, social media, forums, groups, etc.",
    icon: <MegaphoneIcon className="w-8 h-8 text-accent2 stroke-2" />
  },
  {
    title: "Growth & Scaling",
    description: "Once traction is gained, efforts are scaled. This could mean an increase in paid advertising, hiring, and expanding on the project.",
    icon: <ChartBarIcon className="w-8 h-8 text-primary stroke-2" />
  }
];

const Studio: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Studio - Backstage Interactive</title>
        <meta name="description" content="Discover how Backstage Interactive's Studio takes ideas from inception to scaling" />
      </Head>

      <PageHeader 
        title="Studio" 
        subtitle="A Bootstrapped, Lean Approach to Projects" 
      />

      <section className="section-divider light">
        <div className="container">
          <div className="max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="prose prose-lg"
            >
              <p className="text-gray-600 mb-6">
                Backstage Interactive takes an idea from start to finish – from idea, to validation, 
                development, launch, marketing, and scaling.
              </p>
              <p className="text-gray-600 mb-6">
                Building a startup, especially a successful one, isn't easy. You have to have a great 
                idea, but truthfully, ideas are everywhere. Execution is key. Brilliant ideas can sit 
                around unfulfilled forever if they aren't acted upon.
              </p>
              <p className="text-gray-600">
                Oh, and venture capital funding is nowhere to be found. These projects are bootstrapped, 
                focused on gaining traction and growing from there.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex items-center mb-4">
                  <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold mr-3">
                    {index + 1}
                  </span>
                  <div className="flex items-center">
                    <span className="mr-3">{step.icon}</span>
                    <h3 className="text-xl font-bold">{step.title}</h3>
                  </div>
                </div>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Studio;

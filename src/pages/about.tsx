import { NextPage } from 'next';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';

const About: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>About - Backstage Interactive</title>
        <meta name="description" content="Learn about Backstage Interactive and its founder Kevin Love" />
      </Head>

      <PageHeader 
        title="About Us" 
        subtitle="Building digital experiences with passion and expertise" 
      />

      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="prose prose-lg"
            >
              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-6">Technically, Backstage Interactive is a one-man shop.</h2>
                <p className="text-gray-600 mb-6">
                  Remote teams are assembled on a project-by-project basis, depending on the needs of the business.
                </p>
                <p className="text-gray-600">
                  These teams consist of experts in web design and development, search engine optimization (SEO), 
                  pay-per-click advertising (PPC) on platforms including Google and Microsoft, social media 
                  (organic and paid), and content marketing.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="prose prose-lg"
            >
              <h2 className="text-3xl font-bold mb-6">So, who is this one man?</h2>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4">Kevin Love</h3>
                <p className="text-gray-600 mb-4">
                  Kevin Love is a self-taught entrepreneur, web developer, and digital marketer. 
                  He started Backstage Interactive in 2012 as an agency, but he always knew he 
                  wanted to build his own projects as well.
                </p>
                <p className="text-gray-600">
                  He added the Startup Studio arm to the company in January 2020 to fulfill this destiny.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;

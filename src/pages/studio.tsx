// Previous imports remain the same...

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
            {/* Content remains the same */}
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
                {/* Step card content remains the same */}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Studio;

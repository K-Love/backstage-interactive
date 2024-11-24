// Previous imports remain the same...

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
                {/* Service card content remains the same */}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-divider accent bg-dark text-white">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-12 gradient-text">Showcase</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Portfolio items remain the same */}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Agency;

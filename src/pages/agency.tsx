import { NextPage } from 'next'
import Head from 'next/head'

const AgencyPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Agency | Backstage Interactive</title>
        <meta 
          name="description" 
          content="Explore our agency services including web development and digital marketing." 
        />
      </Head>
      
      <div className="pt-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Agency</h1>
          {/* Content will be added later */}
        </div>
      </div>
    </>
  )
}

export default AgencyPage
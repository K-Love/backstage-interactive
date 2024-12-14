import { NextPage } from 'next'
import Head from 'next/head'

const StudioPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Studio | Backstage Interactive</title>
        <meta 
          name="description" 
          content="Discover our studio projects and innovative solutions at Backstage Interactive." 
        />
      </Head>
      
      <div className="pt-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Studio</h1>
          {/* Content will be added later */}
        </div>
      </div>
    </>
  )
}

export default StudioPage
import { NextPage } from 'next'
import Head from 'next/head'

const AboutPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>About | Backstage Interactive</title>
        <meta 
          name="description" 
          content="Learn about Backstage Interactive, where innovation meets imagination in web development and digital marketing." 
        />
      </Head>
      
      <div className="pt-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">
            About Backstage Interactive
          </h1>
          <h2 className="text-2xl md:text-3xl text-purple mb-6">
            Where Innovation Meets Imagination
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-xl mb-6">
              Welcome to Backstage Interactive, where creativity and technology converge 
              to bring digital dreams to life. Founded and operated by Kevin Love, 
              a self-taught entrepreneur, web developer, and digital marketer, 
              our mission is to empower businesses through innovative web solutions 
              and strategic digital marketing.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutPage
import { NextPage } from 'next'
import Head from 'next/head'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import FeaturedWork from '@/components/sections/FeaturedWork'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Backstage Interactive | Digital Experiences & Marketing</title>
        <meta 
          name="description" 
          content="Backstage Interactive builds digital experiences, delivers consumer and client projects, and consults businesses on strategy and execution." 
        />
      </Head>
      <Hero />
      <Services />
      <FeaturedWork />
    </>
  )
}

export default Home
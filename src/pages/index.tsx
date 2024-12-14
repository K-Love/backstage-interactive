import { NextPage } from 'next'
import Head from 'next/head'
import Hero from '@/components/sections/Hero'

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
    </>
  )
}

export default Home
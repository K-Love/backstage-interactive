import { NextPage } from 'next'
import Head from 'next/head'
import StudioHero from '@/components/sections/studio/Hero'
import Projects from '@/components/sections/studio/Projects'
import Process from '@/components/sections/studio/Process'

const StudioPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Studio | Backstage Interactive</title>
        <meta 
          name="description" 
          content="Explore our innovative studio projects and experiments at Backstage Interactive." 
        />
      </Head>
      
      <div>
        <StudioHero />
        <Projects />
        <Process />
      </div>
    </>
  )
}

export default StudioPage
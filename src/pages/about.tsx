import { NextPage } from 'next'
import Head from 'next/head'
import Vision from '@/components/sections/about/Vision'
import Divisions from '@/components/sections/about/Divisions'

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
      
      <div className="pt-20">
        <Vision />
        <Divisions />
      </div>
    </>
  )
}

export default AboutPage
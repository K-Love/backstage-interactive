import { NextPage } from 'next'
import Head from 'next/head'
import Layout from '@/components/layout/Layout'  // Check if this is the correct import path
import { AgencyHero } from '@/components/sections/agency/Hero'
import { Services } from '@/components/sections/agency/Services'
import { Portfolio } from '@/components/sections/agency/Portfolio'
import { CTASection } from '@/components/sections/agency/CTASection'

const AgencyPage: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Agency | Backstage Interactive</title>
        <meta 
          name="description" 
          content="Explore our agency services including web development and digital marketing." 
        />
      </Head>
      
      <AgencyHero />
      <Services />
      <Portfolio />
      <CTASection />
    </Layout>
  )
}

export default AgencyPage
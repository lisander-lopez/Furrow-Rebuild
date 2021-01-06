import Head from 'next/head'
import Layout from '../components/layout';
import HomeHero from '../components/index/homeHero';
import HomeContent from '../components/index/homeContent';
import HomeFeature from '../components/index/homeFeature';

export default function Home() {
  return (
    <Layout>
      <HomeHero />
      <HomeContent />
      <HomeFeature />
    </Layout>
  )
}

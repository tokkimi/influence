import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/home/Hero'
import QuickLinks from '@/components/home/QuickLinks'
import Features from '@/components/home/Features'
import Influencers from '@/components/home/Influencers'
import Newsletter from '@/components/home/Newsletter'
import CTASection from '@/components/home/CTASection'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <QuickLinks />
      <Features />
      <Influencers />
      <Newsletter />
      <CTASection />
      <Footer />
    </main>
  )
}

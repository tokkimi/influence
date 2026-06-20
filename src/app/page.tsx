import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/home/Hero'
import Features from '@/components/home/Features'
import Influencers from '@/components/home/Influencers'
import Newsletter from '@/components/home/Newsletter'
import QuickLinks from '@/components/home/QuickLinks'
import CTASection from '@/components/home/CTASection'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <Influencers />
      <Newsletter />
      <QuickLinks />
      <CTASection />
      <Footer />
    </main>
  )
}

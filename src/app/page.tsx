import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/home/Hero'
import Stats from '@/components/home/Stats'
import HowItWorks from '@/components/home/HowItWorks'
import Features from '@/components/home/Features'
import Influencers from '@/components/home/Influencers'
import Testimonials from '@/components/home/Testimonials'
import Pricing from '@/components/home/Pricing'
import FAQ from '@/components/home/FAQ'
import CTASection from '@/components/home/CTASection'
import Newsletter from '@/components/home/Newsletter'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Stats />
      <HowItWorks />
      <Features />
      <Influencers />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTASection />
      <Newsletter />
      <Footer />
    </main>
  )
}

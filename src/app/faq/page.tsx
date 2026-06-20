'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import FAQ from '@/components/home/FAQ'

export default function FAQPage() {
  return (
    <>
      <Navbar />
      <div className="pt-16">
        <div className="bg-hero-gradient py-16 text-center">
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-white mb-3">Questions fréquentes</h1>
          <p className="text-white/80 text-lg">Tout ce que vous devez savoir sur Dot The Talents</p>
        </div>
        <FAQ />
      </div>
      <Footer />
    </>
  )
}

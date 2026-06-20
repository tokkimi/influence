'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import FAQ from '@/components/home/FAQ'

export default function FAQPage() {
  return (
    <>
      <Navbar />
      <div className="pt-14 bg-[#080c1a] min-h-screen">
        <div className="py-20 text-center px-6">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3 tracking-tight">Questions fréquentes</h1>
          <p className="text-muted text-lg">Tout ce que vous devez savoir sur Dot The Talents</p>
        </div>
        <FAQ />
        <div className="pb-20" />
      </div>
      <Footer />
    </>
  )
}

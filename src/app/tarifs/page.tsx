import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Pricing from '@/components/home/Pricing'

export const metadata = { title: 'Tarifs | Dot The Talents' }

export default function TarifsPage() {
  return (
    <>
      <Navbar />
      <div className="pt-14 bg-[#080c1a] min-h-screen">
        <div className="py-20 text-center px-6">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3 tracking-tight">Nos tarifs</h1>
          <p className="text-muted text-lg">Transparent, sans engagement, rentable dès le premier mois</p>
        </div>
        <Pricing />
        <section className="py-16">
          <div className="max-w-sm mx-auto px-6 text-center">
            <div className="liquid-glass-card rounded-3xl p-8">
              <p className="text-muted text-sm mb-3">Budget minimum de campagne</p>
              <p className="text-5xl font-bold text-white mb-2">500€</p>
              <p className="text-faint text-xs">pour une campagne micro-influence</p>
            </div>
          </div>
        </section>
        <div className="pb-20" />
      </div>
      <Footer />
    </>
  )
}

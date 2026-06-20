import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Pricing from '@/components/home/Pricing'

export const metadata = { title: 'Tarifs | Dot The Talents' }

export default function TarifsPage() {
  return (
    <>
      <Navbar />
      <div className="pt-16">
        <div className="bg-hero-gradient py-16 text-center">
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-white mb-3">Nos tarifs</h1>
          <p className="text-white/80 text-lg">Transparent, sans engagement, rentable dès le premier mois</p>
        </div>
        <Pricing />

        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="font-display text-3xl font-bold text-gray-900 mb-8 text-center">Tarifs pour les Marques</h2>
            <p className="text-gray-600 text-center mb-8">
              Pour les marques, les tarifs dépendent du budget de votre campagne. La plateforme ne prélève pas de commission supplémentaire sur le budget – vous payez les influenceurs au prix défini.
            </p>
            <div className="bg-purple-50 rounded-2xl p-6 text-center">
              <p className="text-gray-600 mb-4">Budget minimum de campagne</p>
              <p className="text-4xl font-bold text-purple-700 mb-2">500€</p>
              <p className="text-gray-500 text-sm">pour une campagne micro-influence</p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HowItWorks from '@/components/home/HowItWorks'
import Link from 'next/link'

export const metadata = { title: 'Comment ça marche | Dot The Talents' }

export default function CommentCaMarche() {
  return (
    <>
      <Navbar />
      <div className="pt-16">
        <div className="bg-[#07071a] py-16 text-center">
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-white mb-3">Comment ça marche ?</h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto">Une plateforme simple et transparente pour créer des collaborations authentiques entre marques et influenceurs</p>
        </div>
        <HowItWorks />

        <section className="py-16 bg-[#07071a]">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="font-display text-3xl font-bold text-white mb-4">Prêt à démarrer ?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/inscription?role=brand" className="bg-purple-700 text-white px-8 py-3 rounded-full font-medium hover:bg-purple-800 transition">
                Je suis une marque →
              </Link>
              <Link href="/auth/inscription?role=influencer" className="border-2 border-purple-700 text-purple-700 px-8 py-3 rounded-full font-medium hover:bg-purple-50 transition">
                Je suis influenceur(se) →
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

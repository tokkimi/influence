import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HowItWorks from '@/components/home/HowItWorks'
import Link from 'next/link'

export const metadata = { title: 'Comment ça marche | Dot The Talents' }

export default function CommentCaMarche() {
  return (
    <>
      <Navbar />
      <div className="pt-14 bg-[#080c1a] min-h-screen">
        <div className="py-20 text-center px-6">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3 tracking-tight">Comment ça marche ?</h1>
          <p className="text-muted text-lg max-w-xl mx-auto">Une plateforme simple pour créer des collaborations authentiques</p>
        </div>
        <HowItWorks />
        <section className="py-20">
          <div className="max-w-md mx-auto px-6 text-center">
            <div className="liquid-glass-card rounded-3xl p-10">
              <h2 className="text-2xl font-bold text-white mb-3 tracking-tight">Prêt à démarrer ?</h2>
              <p className="text-muted text-sm mb-8">Rejoignez des milliers de marques et influenceurs</p>
              <div className="flex flex-col gap-3">
                <Link href="/auth/inscription?role=brand" className="block text-center liquid-glass-strong hover:bg-white/15 text-white font-medium px-6 py-3 rounded-2xl text-sm transition-all border border-white/20">
                  Je suis une marque →
                </Link>
                <Link href="/auth/inscription?role=influencer" className="block text-center liquid-glass hover:bg-white/10 text-muted hover:text-white font-medium px-6 py-3 rounded-2xl text-sm transition-all">
                  Je suis influenceur(se) →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

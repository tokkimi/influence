import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="py-24 bg-hero-gradient relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-yellow-500/20 rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-6">
          Prêt à transformer votre stratégie d&apos;influence ?
        </h2>
        <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
          Rejoignez les 847 marques et 5 420 influenceurs qui font confiance à Dot The Talents
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/auth/inscription?role=brand"
            className="inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-8 py-4 rounded-full text-lg transition transform hover:scale-105"
          >
            Lancer ma campagne
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/auth/inscription?role=influencer"
            className="inline-flex items-center justify-center gap-2 border-2 border-white/50 text-white font-bold px-8 py-4 rounded-full text-lg hover:bg-white/10 transition"
          >
            Devenir influenceur partenaire
          </Link>
        </div>
      </div>
    </section>
  )
}

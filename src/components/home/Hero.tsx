import Link from "next/link"
import { ArrowRight, Star, TrendingUp, Users } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-950 via-purple-900 to-purple-800">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span className="text-white/90 text-sm font-medium">La plateforme #1 du marketing d&apos;influence en France</span>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Connectez votre marque
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-300">
            aux meilleurs talents
          </span>
        </h1>

        <p className="text-xl text-purple-200 mb-10 max-w-2xl mx-auto leading-relaxed">
          Dot The Talents connecte les marques ambitieuses avec les influenceurs les plus engagés.
          Créez des campagnes percutantes et mesurez votre ROI en temps réel.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link href="/auth/inscription?role=brand" className="inline-flex items-center justify-center h-14 rounded-lg px-10 text-base bg-amber-400 text-purple-900 hover:bg-amber-300 font-semibold shadow-lg shadow-amber-400/25 transition-colors">
            Je suis une marque
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
          <Link href="/auth/inscription?role=influencer" className="inline-flex items-center justify-center h-14 rounded-lg px-10 text-base border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm transition-colors">
            Je suis influenceur(se)
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Users className="w-5 h-5 text-amber-400 mr-1" />
              <span className="text-3xl font-bold text-white">5K+</span>
            </div>
            <p className="text-purple-300 text-sm">Influenceurs</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <TrendingUp className="w-5 h-5 text-amber-400 mr-1" />
              <span className="text-3xl font-bold text-white">500+</span>
            </div>
            <p className="text-purple-300 text-sm">Marques</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Star className="w-5 h-5 text-amber-400 mr-1 fill-amber-400" />
              <span className="text-3xl font-bold text-white">50</span>
            </div>
            <p className="text-purple-300 text-sm">Pays</p>
          </div>
        </div>
      </div>
    </section>
  )
}

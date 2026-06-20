"use client"
import Link from "next/link"
import { ArrowRight, TrendingUp, Users, Globe, BadgeCheck, Sparkles } from "lucide-react"
import { useLang } from "@/lib/lang"

const avatars = [
  { initials: 'SM', g: ['#f9a8d4','#fb923c'] },
  { initials: 'LD', g: ['#86efac','#34d399'] },
  { initials: 'EL', g: ['#93c5fd','#818cf8'] },
  { initials: 'TC', g: ['#fde68a','#fb923c'] },
]

export default function Hero() {
  const { t } = useLang()

  return (
    <section className="relative min-h-screen flex items-center bg-[#fafaf8] overflow-hidden">

      {/* Blobs lumineux pastel */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-8%] right-[-5%] w-[700px] h-[700px] rounded-full opacity-50" style={{background:'radial-gradient(circle, #fde8d0 0%, transparent 65%)'}} />
        <div className="absolute bottom-[-10%] left-[-8%] w-[600px] h-[600px] rounded-full opacity-40" style={{background:'radial-gradient(circle, #dbeafe 0%, transparent 65%)'}} />
        <div className="absolute top-[40%] left-[40%] w-[500px] h-[500px] rounded-full opacity-30" style={{background:'radial-gradient(circle, #fef9c3 0%, transparent 65%)'}} />
      </div>

      <div className="relative max-w-6xl mx-auto px-5 lg:px-8 pt-20 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Colonne texte */}
          <div>
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-8">
              <Sparkles className="w-3.5 h-3.5 text-[#c9993a]" />
              <span className="text-secondary text-xs font-medium">{t('hero.badge')}</span>
            </div>

            <h1 className="text-[clamp(2rem,4.5vw,3.2rem)] font-bold text-[#0f0f0f] leading-[1.1] tracking-tight mb-5">
              {t('hero.title1')}
              <br />
              <span className="font-display italic" style={{background:'linear-gradient(135deg, #c9993a 0%, #e8b860 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text'}}>
                {t('hero.title2')}
              </span>
            </h1>

            <p className="text-secondary text-base leading-relaxed mb-10 max-w-md">
              {t('hero.sub')}
            </p>

            <div className="flex flex-wrap gap-3 mb-12">
              <Link href="/auth/inscription?role=brand" className="inline-flex items-center gap-2 bg-[#0f0f0f] hover:bg-[#1a1a2e] text-white font-medium px-6 py-3 rounded-full text-sm transition-all shadow-sm">
                {t('hero.brand')} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/auth/inscription?role=influencer" className="inline-flex items-center glass hover:shadow-md text-[#0f0f0f] font-medium px-6 py-3 rounded-full text-sm transition-all">
                {t('hero.influencer')}
              </Link>
            </div>

            <div className="flex gap-8">
              {[
                { icon: Users, value: '5 420', label: t('hero.stat1') },
                { icon: TrendingUp, value: '847', label: t('hero.stat2') },
                { icon: Globe, value: '52', label: t('hero.stat3') },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label}>
                  <p className="text-[#0f0f0f] font-bold text-xl">{value}</p>
                  <p className="text-tertiary text-xs mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Colonne visuelle */}
          <div className="hidden lg:block relative h-[480px]">

            {/* Card principale */}
            <div className="absolute top-0 right-0 w-72 glass-card rounded-3xl p-6 animate-float">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-secondary text-xs mb-1">ROI moyen</p>
                  <p className="text-[#0f0f0f] font-bold text-2xl">+287%</p>
                </div>
                <div className="w-9 h-9 rounded-2xl flex items-center justify-center" style={{background:'rgba(201,153,58,0.1)'}}>
                  <TrendingUp className="w-4 h-4 text-[#c9993a]" />
                </div>
              </div>
              <div className="flex items-end gap-1 h-14 mb-3">
                {[35,55,40,70,50,85,65,95,75,88].map((h, i) => (
                  <div key={i} className="flex-1 rounded-sm" style={{height:`${h}%`, background: i >= 7 ? '#c9993a' : 'rgba(0,0,0,0.08)'}} />
                ))}
              </div>
              <p className="text-xs text-secondary">124 campagnes cette semaine</p>
            </div>

            {/* Talents */}
            <div className="absolute top-44 left-0 w-60 glass-card rounded-3xl p-5 animate-float2">
              <p className="text-xs text-secondary mb-4">Talents certifiés</p>
              <div className="space-y-3">
                {avatars.slice(0,3).map((a, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{background:`linear-gradient(135deg, ${a.g[0]}, ${a.g[1]})`}}>
                      {a.initials}
                    </div>
                    <div className="h-2 rounded-full flex-1 bg-black/5" />
                    <BadgeCheck className="w-4 h-4 text-[#0a84ff] flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            {/* Notification paiement */}
            <div className="absolute bottom-8 right-4 w-56 glass-card rounded-2xl p-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{background:'rgba(48,209,88,0.12)'}}>
                <span className="text-base">💸</span>
              </div>
              <div>
                <p className="text-[#0f0f0f] text-xs font-semibold">Paiement validé</p>
                <p className="text-tertiary text-[11px]">2 400€ · il y a 2 min</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

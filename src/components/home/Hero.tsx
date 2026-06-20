"use client"
import Link from "next/link"
import { ArrowRight, TrendingUp, Users, Globe, BadgeCheck } from "lucide-react"
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
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#f8f7f4]">

      {/* Animated blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="animate-blob absolute top-[-10%] right-[-8%] w-[650px] h-[650px] rounded-full" style={{background:'radial-gradient(circle at 40% 40%, #fde8c8 0%, #fce7f3 40%, transparent 70%)', opacity:0.8}} />
        <div className="animate-blob2 absolute bottom-[-15%] left-[-10%] w-[600px] h-[600px] rounded-full" style={{background:'radial-gradient(circle at 60% 60%, #dbeafe 0%, #e0f2fe 40%, transparent 70%)', opacity:0.7}} />
        <div className="animate-blob3 absolute top-[30%] left-[35%] w-[400px] h-[400px] rounded-full" style={{background:'radial-gradient(circle, #fef9c3 0%, transparent 70%)', opacity:0.5}} />
      </div>

      <div className="relative max-w-6xl mx-auto px-5 lg:px-8 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Text */}
          <div>
            <div className="inline-flex items-center gap-2 bg-white/70 border border-black/8 rounded-full px-4 py-1.5 mb-8 animate-fade-up">
              <div className="w-1.5 h-1.5 rounded-full bg-[#30d158] animate-pulse" />
              <span className="text-secondary text-xs font-medium">{t('hero.badge')}</span>
            </div>

            <h1 className="animate-fade-up-1 text-[clamp(2rem,4vw,3rem)] font-bold text-[#0f0f0f] leading-[1.1] tracking-tight mb-5">
              {t('hero.title1')}
              <br />
              <span style={{background:'linear-gradient(135deg, #c9993a 0%, #e8b860 50%, #c9993a 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text'}}>
                {t('hero.title2')}
              </span>
            </h1>

            <p className="animate-fade-up-2 text-secondary text-base leading-relaxed mb-10 max-w-[420px]">
              {t('hero.sub')}
            </p>

            <div className="animate-fade-up-3 flex flex-wrap gap-3 mb-12">
              <Link href="/auth/inscription?role=brand" className="inline-flex items-center gap-2 bg-[#0f0f0f] hover:bg-[#222] text-white font-medium px-6 py-3 rounded-full text-sm transition-all shadow-lg shadow-black/10">
                {t('hero.brand')} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/auth/inscription?role=influencer" className="inline-flex items-center bg-white/80 hover:bg-white border border-black/10 text-[#0f0f0f] font-medium px-6 py-3 rounded-full text-sm transition-all">
                {t('hero.influencer')}
              </Link>
            </div>

            <div className="animate-fade-up-3 flex gap-10">
              {[
                { icon: Users, value: '5 420', label: t('hero.stat1') },
                { icon: TrendingUp, value: '847', label: t('hero.stat2') },
                { icon: Globe, value: '52', label: t('hero.stat3') },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label}>
                  <p className="text-[#0f0f0f] font-bold text-2xl tracking-tight">{value}</p>
                  <p className="text-tertiary text-xs mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Visual cards */}
          <div className="hidden lg:block relative h-[500px]">

            {/* Main ROI card */}
            <div className="animate-float absolute top-0 right-0 w-72 glass-card rounded-3xl p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-secondary text-xs mb-1">ROI moyen</p>
                  <p className="text-[#0f0f0f] font-bold text-3xl tracking-tight">+287%</p>
                </div>
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{background:'rgba(201,153,58,0.12)'}}>
                  <TrendingUp className="w-5 h-5 text-[#c9993a]" />
                </div>
              </div>
              {/* Mini bar chart */}
              <div className="flex items-end gap-1 h-16 mb-3">
                {[30,48,35,62,45,78,55,88,68,92].map((h, i) => (
                  <div key={i} className="flex-1 rounded-sm transition-all" style={{height:`${h}%`, background: i >= 7 ? '#c9993a' : 'rgba(0,0,0,0.07)'}} />
                ))}
              </div>
              <p className="text-xs text-secondary">124 campagnes cette semaine</p>
            </div>

            {/* Talent list card */}
            <div className="animate-float2 absolute top-48 left-0 w-64 glass-card rounded-3xl p-5">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-semibold text-[#0f0f0f]">Talents certifiés</p>
                <span className="text-[10px] text-[#30d158] bg-green-50 px-2 py-0.5 rounded-full font-medium">Live</span>
              </div>
              <div className="space-y-3">
                {avatars.slice(0,3).map((a, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-2xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-sm" style={{background:`linear-gradient(135deg, ${a.g[0]}, ${a.g[1]})`}}>
                      {a.initials}
                    </div>
                    <div className="flex-1">
                      <div className="h-2 rounded-full bg-black/6 mb-1" />
                      <div className="h-1.5 rounded-full bg-black/4 w-3/4" />
                    </div>
                    <BadgeCheck className="w-4 h-4 text-[#0a84ff] flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            {/* Payment notification */}
            <div className="animate-float absolute bottom-10 right-6 w-56 glass-card rounded-2xl p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{background:'rgba(48,209,88,0.12)'}}>
                <span className="text-lg">💸</span>
              </div>
              <div>
                <p className="text-[#0f0f0f] text-xs font-semibold">Paiement validé</p>
                <p className="text-tertiary text-[11px]">2 400 € · il y a 2 min</p>
              </div>
            </div>

            {/* Small match badge */}
            <div className="animate-float2 absolute top-8 left-12 glass rounded-2xl px-4 py-2.5 flex items-center gap-2">
              <div className="w-6 h-6 rounded-xl" style={{background:'linear-gradient(135deg, #fda4af, #fb923c)'}} />
              <div>
                <p className="text-[10px] font-semibold text-[#0f0f0f]">Match parfait</p>
                <p className="text-[9px] text-tertiary">98% compatibilité</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

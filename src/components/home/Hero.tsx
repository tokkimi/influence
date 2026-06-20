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
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-white">

      {/* Liquid glass blob — centré, flotte derrière le texte */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div
          className="animate-blob w-[700px] h-[600px] opacity-[0.22]"
          style={{
            background: 'radial-gradient(ellipse at 40% 50%, #c9993a 0%, #fde8c8 30%, #dbeafe 60%, transparent 80%)',
            borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%',
            filter: 'blur(40px)',
          }}
        />
      </div>

      {/* Second blob subtil */}
      <div className="absolute top-[10%] right-[-5%] pointer-events-none overflow-hidden">
        <div
          className="animate-blob2 w-[350px] h-[350px] opacity-[0.15]"
          style={{
            background: 'radial-gradient(circle, #0f0f0f 0%, transparent 70%)',
            borderRadius: '40% 60% 55% 45% / 45% 55% 45% 55%',
            filter: 'blur(50px)',
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-5 lg:px-8 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT — typo bold */}
          <div>
            <div className="inline-flex items-center gap-2 border border-black/10 rounded-full px-4 py-1.5 mb-10 animate-fade-up">
              <div className="w-1.5 h-1.5 rounded-full bg-[#30d158] animate-pulse" />
              <span className="text-secondary text-xs font-medium">{t('hero.badge')}</span>
            </div>

            <h1 className="animate-fade-up-1 font-bold text-[#0f0f0f] leading-[1.05] tracking-[-0.03em] mb-6" style={{fontSize:'clamp(2.4rem, 5vw, 3.8rem)'}}>
              {t('hero.title1')}
              <br />
              <span style={{
                background: 'linear-gradient(135deg, #c9993a 0%, #e8b860 50%, #b8832a 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                {t('hero.title2')}
              </span>
            </h1>

            <p className="animate-fade-up-2 text-secondary text-base leading-relaxed mb-10 max-w-[400px]">
              {t('hero.sub')}
            </p>

            <div className="animate-fade-up-3 flex flex-wrap gap-3 mb-12">
              <Link href="/auth/inscription?role=brand" className="inline-flex items-center gap-2 bg-[#0f0f0f] hover:bg-[#222] text-white font-semibold px-7 py-3.5 rounded-full text-sm transition-all shadow-xl shadow-black/15">
                {t('hero.brand')} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/auth/inscription?role=influencer" className="inline-flex items-center border border-black/12 hover:border-black/30 text-[#0f0f0f] font-medium px-7 py-3.5 rounded-full text-sm transition-all">
                {t('hero.influencer')}
              </Link>
            </div>

            <div className="animate-fade-up-3 flex gap-10 border-t border-black/6 pt-8">
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

          {/* RIGHT — glass cards */}
          <div className="hidden lg:block relative h-[520px]">

            {/* ROI card */}
            <div className="animate-float absolute top-0 right-0 w-72 rounded-3xl p-6 border border-black/6" style={{background:'rgba(255,255,255,0.85)', backdropFilter:'blur(32px) saturate(180%)', WebkitBackdropFilter:'blur(32px) saturate(180%)', boxShadow:'0 20px 60px rgba(0,0,0,0.1)'}}>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-secondary text-xs mb-1">ROI moyen</p>
                  <p className="text-[#0f0f0f] font-bold text-3xl tracking-tight">+287%</p>
                </div>
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{background:'rgba(201,153,58,0.1)', border:'1px solid rgba(201,153,58,0.2)'}}>
                  <TrendingUp className="w-5 h-5 text-[#c9993a]" />
                </div>
              </div>
              <div className="flex items-end gap-1 h-16 mb-3">
                {[28,45,32,58,42,72,50,85,62,94].map((h, i) => (
                  <div key={i} className="flex-1 rounded-sm" style={{height:`${h}%`, background: i >= 7 ? '#c9993a' : 'rgba(0,0,0,0.06)'}} />
                ))}
              </div>
              <p className="text-xs text-secondary">124 campagnes cette semaine</p>
            </div>

            {/* Talent card */}
            <div className="animate-float2 absolute top-52 left-0 w-64 rounded-3xl p-5 border border-black/6" style={{background:'rgba(255,255,255,0.85)', backdropFilter:'blur(32px)', WebkitBackdropFilter:'blur(32px)', boxShadow:'0 20px 60px rgba(0,0,0,0.08)'}}>
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-semibold text-[#0f0f0f]">Talents certifiés</p>
                <span className="text-[10px] text-[#30d158] bg-green-50 border border-green-100 px-2 py-0.5 rounded-full font-medium">● Live</span>
              </div>
              <div className="space-y-3">
                {avatars.slice(0,3).map((a, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-2xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-sm" style={{background:`linear-gradient(135deg, ${a.g[0]}, ${a.g[1]})`}}>
                      {a.initials}
                    </div>
                    <div className="flex-1">
                      <div className="h-2 rounded-full bg-black/5 mb-1.5" />
                      <div className="h-1.5 rounded-full bg-black/4 w-2/3" />
                    </div>
                    <BadgeCheck className="w-4 h-4 text-[#0a84ff] flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            {/* Payment pill */}
            <div className="animate-float absolute bottom-12 right-6 rounded-2xl p-4 flex items-center gap-3 border border-black/6" style={{background:'rgba(255,255,255,0.9)', backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)', boxShadow:'0 12px 40px rgba(0,0,0,0.08)'}}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{background:'rgba(48,209,88,0.1)'}}>
                <span className="text-lg">💸</span>
              </div>
              <div>
                <p className="text-[#0f0f0f] text-xs font-semibold">Paiement validé</p>
                <p className="text-tertiary text-[11px]">2 400 € · il y a 2 min</p>
              </div>
            </div>

            {/* Match badge */}
            <div className="animate-float2 absolute top-6 left-10 rounded-2xl px-4 py-2.5 flex items-center gap-2 border border-black/6" style={{background:'rgba(255,255,255,0.85)', backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)'}}>
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

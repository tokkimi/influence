"use client"
import Link from "next/link"
import { ArrowRight, TrendingUp, Users, Globe, Sparkles } from "lucide-react"
import { useLang } from "@/lib/lang"

export default function Hero() {
  const { t } = useLang()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#f5f5f7]">

      {/* Soft blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-15%] right-[-10%] w-[600px] h-[600px] rounded-full opacity-40" style={{background: 'radial-gradient(circle, #ffbac7 0%, transparent 70%)'}} />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full opacity-25" style={{background: 'radial-gradient(circle, #a8d8ea 0%, transparent 70%)'}} />
        <div className="absolute top-[30%] left-[30%] w-[400px] h-[400px] rounded-full opacity-20" style={{background: 'radial-gradient(circle, #ffd6a5 0%, transparent 70%)'}} />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 lg:px-8 text-center pt-24 pb-24">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-2 mb-10">
          <Sparkles className="w-3.5 h-3.5 text-[#ff2d55]" />
          <span className="text-[#1d1d1f] text-xs font-medium">{t('hero.badge')}</span>
        </div>

        {/* Headline */}
        <h1 className="text-[clamp(2.8rem,8vw,5.5rem)] font-bold text-[#1d1d1f] leading-[1.06] tracking-tight mb-6">
          {t('hero.title1')}
          <br />
          <span style={{background: 'linear-gradient(135deg, #ff2d55 0%, #ff9500 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>
            {t('hero.title2')}
          </span>
        </h1>

        <p className="text-lg text-secondary mb-12 max-w-xl mx-auto leading-relaxed">
          {t('hero.sub')}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-20">
          <Link href="/auth/inscription?role=brand" className="inline-flex items-center justify-center gap-2 h-12 rounded-2xl px-7 bg-[#1d1d1f] hover:bg-black text-white font-medium text-sm transition-all shadow-sm">
            {t('hero.brand')} <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/auth/inscription?role=influencer" className="inline-flex items-center justify-center h-12 rounded-2xl px-7 glass-card hover:shadow-md text-[#1d1d1f] font-medium text-sm transition-all">
            {t('hero.influencer')}
          </Link>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {[
            { icon: Users, value: '5 420', label: t('hero.stat1') },
            { icon: TrendingUp, value: '847', label: t('hero.stat2') },
            { icon: Globe, value: '52', label: t('hero.stat3') },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="glass-card rounded-2xl px-6 py-4 flex items-center gap-3">
              <Icon className="w-4 h-4 text-[#ff2d55]" />
              <div className="text-left">
                <p className="text-[#1d1d1f] font-bold text-base leading-none">{value}</p>
                <p className="text-tertiary text-xs mt-0.5">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Live notification cards */}
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <div className="glass-card rounded-2xl px-5 py-4 flex items-center gap-3 text-left">
            <div className="w-8 h-8 rounded-full bg-[#ff2d55]/10 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-4 h-4 text-[#ff2d55]" />
            </div>
            <div>
              <p className="text-[#1d1d1f] text-xs font-semibold">Campagne validée</p>
              <p className="text-tertiary text-[11px] mt-0.5">+342% engagement · il y a 2 min</p>
            </div>
            <div className="ml-auto w-2 h-2 bg-[#30d158] rounded-full flex-shrink-0" />
          </div>
          <div className="glass-card rounded-2xl px-5 py-4 flex items-center gap-3 text-left">
            <div className="w-8 h-8 rounded-full bg-[#ff9500]/10 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 text-[#ff9500]" />
            </div>
            <div>
              <p className="text-[#1d1d1f] text-xs font-semibold">Nouveau talent certifié</p>
              <p className="text-tertiary text-[11px] mt-0.5">Sofia M. · 280k abonnés</p>
            </div>
            <div className="ml-auto w-2 h-2 bg-[#ff9500] rounded-full flex-shrink-0" />
          </div>
        </div>
      </div>
    </section>
  )
}

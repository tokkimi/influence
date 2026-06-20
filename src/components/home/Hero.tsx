"use client"
import Link from "next/link"
import { ArrowRight, TrendingUp, Users, Globe, CheckCircle2 } from "lucide-react"
import { useLang } from "@/lib/lang"

export default function Hero() {
  const { t } = useLang()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#07071a]">

      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[20%] w-[700px] h-[700px] rounded-full bg-violet-600/10 blur-[140px]" />
        <div className="absolute bottom-[-5%] right-[10%] w-[500px] h-[500px] rounded-full bg-blue-600/8 blur-[120px]" />
        <div className="absolute top-[40%] left-[-5%] w-[300px] h-[300px] rounded-full bg-indigo-500/8 blur-[100px]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 lg:px-8 text-center pt-24 pb-16">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-10">
          <div className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-pulse" />
          <span className="text-white/60 text-xs font-medium tracking-wide">{t('hero.badge')}</span>
        </div>

        {/* Title */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.08] tracking-tight">
          {t('hero.title1')}<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
            {t('hero.title2')}
          </span>
        </h1>

        <p className="text-lg text-white/45 mb-12 max-w-xl mx-auto leading-relaxed">
          {t('hero.sub')}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-20">
          <Link
            href="/auth/inscription?role=brand"
            className="inline-flex items-center justify-center gap-2 h-12 rounded-xl px-7 bg-violet-600 hover:bg-violet-500 text-white font-medium text-sm transition-colors"
          >
            {t('hero.brand')}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/auth/inscription?role=influencer"
            className="inline-flex items-center justify-center h-12 rounded-xl px-7 glass hover:bg-white/8 text-white/80 font-medium text-sm transition-all"
          >
            {t('hero.influencer')}
          </Link>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 mb-16">
          {[
            { icon: Users, value: '5 420', label: t('hero.stat1') },
            { icon: TrendingUp, value: '847', label: t('hero.stat2') },
            { icon: Globe, value: '52', label: t('hero.stat3') },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-9 h-9 glass rounded-lg flex items-center justify-center">
                <Icon className="w-4 h-4 text-violet-400" />
              </div>
              <div className="text-left">
                <p className="text-white font-bold text-lg leading-none">{value}</p>
                <p className="text-white/40 text-xs mt-0.5">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Glass notification card */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <div className="glass-card rounded-2xl px-5 py-4 flex items-center gap-4 max-w-xs mx-auto sm:mx-0">
            <div className="w-8 h-8 rounded-full bg-violet-500/20 border border-violet-400/30 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-4 h-4 text-violet-400" />
            </div>
            <div className="text-left">
              <p className="text-white text-xs font-semibold">Campagne validée</p>
              <p className="text-white/35 text-[11px] mt-0.5">+342% engagement · 2 min ago</p>
            </div>
          </div>
          <div className="glass-card rounded-2xl px-5 py-4 flex items-center gap-4 max-w-xs mx-auto sm:mx-0">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-400/30 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-left">
              <p className="text-white text-xs font-semibold">ROI moyen cette semaine</p>
              <p className="text-white/35 text-[11px] mt-0.5">+287% sur 124 campagnes</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

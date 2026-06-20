"use client"
import Link from "next/link"
import { ArrowRight, Star, TrendingUp, Users, Globe, Award } from "lucide-react"
import { useLang } from "@/lib/lang"

export default function Hero() {
  const { t } = useLang()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero-gradient">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] bg-gold-400/8 rounded-full blur-[100px]" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-ink-500/20 rounded-full blur-[80px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-ink-800/30 rounded-full blur-[120px]" />
        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/8 backdrop-blur-sm border border-white/12 rounded-full px-5 py-2 mb-10">
          <div className="w-2 h-2 bg-gold-400 rounded-full animate-pulse" />
          <span className="text-white/85 text-sm font-medium tracking-wide">{t('hero.badge')}</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
          {t('hero.title1')}
          <br />
          <span className="text-gradient-gold font-display italic">
            {t('hero.title2')}
          </span>
        </h1>

        <p className="text-lg text-white/65 mb-12 max-w-2xl mx-auto leading-relaxed">
          {t('hero.sub')}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
          <Link
            href="/auth/inscription?role=brand"
            className="inline-flex items-center justify-center gap-2 h-14 rounded-xl px-8 bg-gold-gradient text-ink-900 font-semibold text-base shadow-gold hover:brightness-110 transition-all"
          >
            {t('hero.brand')}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/auth/inscription?role=influencer"
            className="inline-flex items-center justify-center gap-2 h-14 rounded-xl px-8 border border-white/20 text-white font-medium text-base hover:bg-white/8 hover:border-white/35 backdrop-blur-sm transition-all"
          >
            {t('hero.influencer')}
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 max-w-md mx-auto mb-20">
          {[
            { icon: Users, value: '5 420', label: t('hero.stat1') },
            { icon: Award, value: '847', label: t('hero.stat2') },
            { icon: Globe, value: '52', label: t('hero.stat3') },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="text-center">
              <p className="text-3xl font-bold text-white mb-1">{value}</p>
              <p className="text-white/50 text-xs uppercase tracking-widest">{label}</p>
            </div>
          ))}
        </div>

        {/* Floating card */}
        <div className="flex justify-center">
          <div className="glass-dark rounded-2xl px-6 py-4 flex items-center gap-4 max-w-sm">
            <div className="w-10 h-10 bg-gold-gradient rounded-full flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-5 h-5 text-ink-900" />
            </div>
            <div className="text-left">
              <p className="text-white text-sm font-semibold">Campagne #2847 validée</p>
              <p className="text-white/50 text-xs">+342% d'engagement · il y a 2 min</p>
            </div>
            <div className="flex -space-x-2 ml-auto">
              {['#6448f5','#efc84a','#d4a843'].map((c, i) => (
                <div key={i} className="w-7 h-7 rounded-full border-2 border-ink-800 flex items-center justify-center" style={{ background: c }}>
                  <Star className="w-3 h-3 text-white fill-white" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

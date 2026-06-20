"use client"
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useLang } from '@/lib/lang'

export default function CTASection() {
  const { t } = useLang()

  return (
    <section className="py-28 bg-hero-gradient relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold-400/6 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-ink-500/20 rounded-full blur-[80px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>
      <div className="relative max-w-3xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 bg-gold-400/15 border border-gold-400/25 rounded-full px-5 py-2 mb-8">
          <div className="w-2 h-2 bg-gold-400 rounded-full" />
          <span className="text-gold-300 text-sm font-medium">Dot The Talents</span>
        </div>
        <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
          {t('cta.title')}
        </h2>
        <p className="text-lg text-white/60 mb-12 max-w-xl mx-auto">
          {t('cta.sub')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/auth/inscription?role=brand"
            className="inline-flex items-center justify-center gap-2 bg-gold-gradient text-ink-900 font-bold px-8 py-4 rounded-xl text-base shadow-gold hover:brightness-110 transition-all"
          >
            {t('cta.brand')}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/auth/inscription?role=influencer"
            className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-medium px-8 py-4 rounded-xl text-base hover:bg-white/8 hover:border-white/35 transition-all"
          >
            {t('cta.influencer')}
          </Link>
        </div>
      </div>
    </section>
  )
}

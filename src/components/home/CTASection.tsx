"use client"
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useLang } from '@/lib/lang'

export default function CTASection() {
  const { t } = useLang()

  return (
    <section className="py-24 bg-[#080c1a] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full" style={{background:'radial-gradient(ellipse, rgba(240,192,64,0.08) 0%, transparent 70%)'}} />
      </div>
      <div className="relative max-w-2xl mx-auto px-6 text-center">
        <div className="liquid-glass-card rounded-3xl p-10 sm:p-14">
          <div className="inline-flex items-center gap-2 liquid-glass rounded-full px-4 py-2 mb-8">
            <div className="w-2 h-2 bg-[#f0c040] rounded-full" />
            <span className="text-muted text-xs font-medium">Dot The Talents</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 tracking-tight leading-tight">
            {t('cta.title')}
          </h2>
          <p className="text-muted mb-10 text-sm leading-relaxed max-w-md mx-auto">
            {t('cta.sub')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/auth/inscription?role=brand" className="inline-flex items-center justify-center gap-2 liquid-glass-strong hover:bg-white/15 text-white font-semibold px-7 py-3 rounded-2xl text-sm transition-all border border-white/20">
              {t('cta.brand')} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/auth/inscription?role=influencer" className="inline-flex items-center justify-center liquid-glass hover:bg-white/10 text-muted hover:text-white font-medium px-7 py-3 rounded-2xl text-sm transition-all">
              {t('cta.influencer')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

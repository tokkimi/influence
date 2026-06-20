"use client"
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useLang } from '@/lib/lang'

export default function CTASection() {
  const { t } = useLang()

  return (
    <section className="py-28 bg-[#07071a] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-violet-600/8 rounded-full blur-[120px]" />
      </div>
      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <div className="glass-card rounded-3xl p-12 sm:p-16">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-8">
            <div className="w-1.5 h-1.5 bg-violet-400 rounded-full" />
            <span className="text-white/50 text-xs font-medium">Dot The Talents</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5 tracking-tight leading-tight">
            {t('cta.title')}
          </h2>
          <p className="text-white/40 mb-10 leading-relaxed">
            {t('cta.sub')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/auth/inscription?role=brand"
              className="inline-flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-medium px-7 py-3 rounded-xl text-sm transition-colors"
            >
              {t('cta.brand')}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/auth/inscription?role=influencer"
              className="inline-flex items-center justify-center glass hover:bg-white/8 text-white/70 hover:text-white font-medium px-7 py-3 rounded-xl text-sm transition-all"
            >
              {t('cta.influencer')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

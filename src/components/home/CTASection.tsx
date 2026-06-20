"use client"
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useLang } from '@/lib/lang'

export default function CTASection() {
  const { t } = useLang()
  return (
    <section className="py-24 bg-[#0f0f0f] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-20" style={{background:'radial-gradient(circle, #c9993a 0%, transparent 65%)'}} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-10" style={{background:'radial-gradient(circle, #ffffff 0%, transparent 65%)'}} />
      </div>
      <div className="relative max-w-2xl mx-auto px-6 text-center">
        <p className="text-xs text-white/40 uppercase tracking-widest mb-4">Dot The Talents</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 tracking-tight">
          {t('cta.title')}
        </h2>
        <p className="text-white/50 mb-10 text-sm leading-relaxed max-w-sm mx-auto">
          {t('cta.sub')}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/auth/inscription?role=brand" className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#fafaf8] text-[#0f0f0f] font-semibold px-7 py-3 rounded-full text-sm transition-all">
            {t('cta.brand')} <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/auth/inscription?role=influencer" className="inline-flex items-center justify-center border border-white/20 hover:border-white/40 text-white/70 hover:text-white font-medium px-7 py-3 rounded-full text-sm transition-all">
            {t('cta.influencer')}
          </Link>
        </div>
      </div>
    </section>
  )
}

"use client"
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useLang } from '@/lib/lang'

export default function CTASection() {
  const { t } = useLang()
  return (
    <section className="py-16 bg-white border-t border-black/6">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <p className="text-[10px] text-[#aaaaaa] uppercase tracking-widest mb-3">Dot The Talents</p>
        <h2 className="text-lg font-bold text-[#0f0f0f] mb-3 tracking-tight">{t('cta.title')}</h2>
        <p className="text-[#6b6b6b] mb-8 text-sm leading-relaxed max-w-sm mx-auto">{t('cta.sub')}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/auth/inscription?role=brand" className="inline-flex items-center justify-center gap-2 bg-[#0f0f0f] hover:bg-[#222] text-white font-semibold px-6 py-3 rounded-full text-sm transition-all">
            {t('cta.brand')} <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/auth/inscription?role=influencer" className="inline-flex items-center justify-center border border-black/12 hover:border-black/25 text-[#0f0f0f] font-medium px-6 py-3 rounded-full text-sm transition-all">
            {t('cta.influencer')}
          </Link>
        </div>
      </div>
    </section>
  )
}

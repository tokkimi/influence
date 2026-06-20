"use client"
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useLang } from '@/lib/lang'

export default function CTASection() {
  const { t } = useLang()

  return (
    <section className="py-24 bg-[#f5f5f7] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-35" style={{background: 'radial-gradient(ellipse, #ffbac7 0%, transparent 70%)'}} />
      </div>
      <div className="relative max-w-2xl mx-auto px-6 text-center">
        <div className="glass-card rounded-3xl p-10 sm:p-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1d1d1f] mb-4 tracking-tight leading-tight">
            {t('cta.title')}
          </h2>
          <p className="text-secondary mb-10 leading-relaxed">
            {t('cta.sub')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/auth/inscription?role=brand" className="inline-flex items-center justify-center gap-2 bg-[#1d1d1f] hover:bg-black text-white font-medium px-7 py-3 rounded-2xl text-sm transition-colors">
              {t('cta.brand')} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/auth/inscription?role=influencer" className="inline-flex items-center justify-center glass-card hover:shadow-md text-[#1d1d1f] font-medium px-7 py-3 rounded-2xl text-sm transition-all">
              {t('cta.influencer')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

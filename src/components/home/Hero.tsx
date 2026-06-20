"use client"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, TrendingUp, Users, Globe } from "lucide-react"
import { useLang } from "@/lib/lang"

export default function Hero() {
  const { t } = useLang()

  return (
    <section className="relative bg-white overflow-hidden pt-14">
      <div className="max-w-6xl mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-2 min-h-[88vh] items-center gap-8">

          {/* Texte */}
          <div className="py-14 lg:py-0 pb-20 lg:pb-0">
            <div className="inline-flex items-center gap-2 border border-[#f97316]/30 bg-[#f97316]/6 rounded-full px-3.5 py-1.5 mb-7">
              <div className="w-1.5 h-1.5 rounded-full bg-[#30d158] animate-pulse" />
              <span className="text-[#f97316] text-[11px] font-semibold tracking-wide">{t('hero.badge')}</span>
            </div>

            <h1 className="font-black text-[#0f0f0f] leading-[1.05] tracking-[-0.025em] mb-4" style={{fontSize:'clamp(1.8rem, 3.2vw, 2.6rem)'}}>
              {t('hero.title1')}<br />
              <span className="text-[#f97316]">{t('hero.title2')}</span>
            </h1>

            <p className="text-[#6b6b6b] text-sm leading-relaxed mb-8 max-w-[400px]">
              {t('hero.sub')}
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <Link href="/auth/inscription?role=brand" className="inline-flex items-center gap-2 bg-[#0f0f0f] hover:bg-[#1a1a1a] text-white font-semibold px-6 py-3 rounded-full text-sm transition-all">
                {t('hero.brand')} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/auth/inscription?role=influencer" className="inline-flex items-center border border-black/12 hover:border-[#f97316]/40 text-[#0f0f0f] font-medium px-6 py-3 rounded-full text-sm transition-all">
                {t('hero.influencer')}
              </Link>
            </div>

            <div className="flex gap-8 pt-6 border-t border-black/6">
              {[
                { value: '5 420', label: t('hero.stat1'), icon: Users },
                { value: '847', label: t('hero.stat2'), icon: TrendingUp },
                { value: '52', label: t('hero.stat3'), icon: Globe },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="font-black text-lg text-[#0f0f0f] tracking-tight">{value}</p>
                  <p className="text-[#aaaaaa] text-xs mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image éditoriale */}
          <div className="hidden lg:flex relative h-[88vh]">
            <div className="absolute inset-0 overflow-hidden rounded-bl-[3rem]">
              <Image
                src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=900&q=85&auto=format&fit=crop"
                alt="Influencer"
                fill
                className="object-cover object-top"
                priority
                unoptimized
              />
              <div className="absolute inset-0" style={{background:'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.25) 100%)'}} />
            </div>

            {/* Card ROI */}
            <div className="animate-float absolute bottom-28 left-[-2rem] rounded-2xl p-4 z-10" style={{width:'190px', background:'rgba(255,255,255,0.88)', backdropFilter:'blur(20px)', border:'1px solid rgba(0,0,0,0.07)', boxShadow:'0 16px 50px rgba(0,0,0,0.1)'}}>
              <p className="text-[10px] text-[#aaaaaa] mb-0.5">ROI moyen</p>
              <p className="text-[#0f0f0f] font-black text-xl tracking-tight">+287%</p>
              <div className="flex items-end gap-0.5 h-7 mt-2">
                {[30,50,35,65,45,80,55,95].map((h,i) => (
                  <div key={i} className="flex-1 rounded-sm" style={{height:`${h}%`, background: i===7 ? '#f97316' : 'rgba(0,0,0,0.08)'}} />
                ))}
              </div>
            </div>

            {/* Badge certifiés */}
            <div className="animate-float2 absolute top-16 left-[-1.5rem] rounded-2xl px-4 py-3 z-10 flex items-center gap-2.5" style={{background:'rgba(255,255,255,0.88)', backdropFilter:'blur(20px)', border:'1px solid rgba(0,0,0,0.07)', boxShadow:'0 12px 40px rgba(0,0,0,0.08)'}}>
              <div className="w-8 h-8 rounded-xl bg-[#f97316] flex items-center justify-center text-white font-black text-xs">5K+</div>
              <div>
                <p className="text-xs font-semibold text-[#0f0f0f]">Talents certifiés</p>
                <p className="text-[10px] text-[#aaaaaa]">France · Europe · US</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

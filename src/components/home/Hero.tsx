"use client"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, TrendingUp, Users, Globe } from "lucide-react"
import { useLang } from "@/lib/lang"

export default function Hero() {
  const { t } = useLang()

  return (
    <section className="relative bg-[#fafaf8] overflow-hidden pt-14">
      <div className="max-w-6xl mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-2 min-h-[92vh] items-center gap-8">

          {/* LEFT — texte */}
          <div className="py-16 lg:py-0">
            <div className="inline-flex items-center gap-2 border border-[#c9993a]/30 bg-[#c9993a]/6 rounded-full px-3.5 py-1.5 mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-[#30d158] animate-pulse" />
              <span className="text-[#c9993a] text-[11px] font-semibold uppercase tracking-wide">{t('hero.badge')}</span>
            </div>

            <h1 className="font-black text-[#0f0f0f] leading-[1.05] tracking-[-0.03em] mb-5" style={{fontSize:'clamp(2rem,4vw,3.2rem)'}}>
              {t('hero.title1')}<br />
              <span className="text-[#c9993a]">{t('hero.title2')}</span>
            </h1>

            <p className="text-[#6b6b6b] text-sm leading-relaxed mb-8 max-w-[400px]">
              {t('hero.sub')}
            </p>

            <div className="flex flex-wrap gap-3 mb-12">
              <Link href="/auth/inscription?role=brand" className="inline-flex items-center gap-2 bg-[#0f0f0f] hover:bg-[#1a1a1a] text-white font-semibold px-6 py-3 rounded-full text-sm transition-all" style={{boxShadow:'0 4px 20px rgba(0,0,0,0.15)'}}>
                {t('hero.brand')} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/auth/inscription?role=influencer" className="inline-flex items-center border border-black/12 hover:border-black/30 text-[#0f0f0f] font-medium px-6 py-3 rounded-full text-sm transition-all bg-white">
                {t('hero.influencer')}
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-8 border-t border-black/8">
              {[
                { value: '5 420', label: t('hero.stat1'), icon: Users },
                { value: '847', label: t('hero.stat2'), icon: TrendingUp },
                { value: '52', label: t('hero.stat3'), icon: Globe },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="font-bold text-xl text-[#0f0f0f] tracking-tight">{value}</p>
                  <p className="text-[#aaaaaa] text-[11px] mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — bannière image éditoriale */}
          <div className="hidden lg:block relative h-[92vh]">
            {/* Image pleine hauteur */}
            <div className="absolute inset-0 overflow-hidden rounded-bl-[3rem]">
              <Image
                src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=900&q=85&auto=format&fit=crop"
                alt="Influencer marketing"
                fill
                className="object-cover object-top"
                priority
                unoptimized
              />
              <div className="absolute inset-0" style={{background:'linear-gradient(180deg, rgba(250,250,248,0.05) 0%, rgba(250,250,248,0) 30%, rgba(0,0,0,0.3) 100%)'}} />
            </div>

            {/* Card flottante ROI */}
            <div className="animate-float absolute bottom-24 left-[-2rem] rounded-2xl p-4 z-10" style={{background:'rgba(255,255,255,0.92)', backdropFilter:'blur(20px)', border:'1px solid rgba(0,0,0,0.07)', boxShadow:'0 20px 60px rgba(0,0,0,0.12)', width:'200px'}}>
              <p className="text-[10px] text-[#aaaaaa] mb-1">ROI moyen</p>
              <p className="text-[#0f0f0f] font-black text-2xl tracking-tight">+287%</p>
              <div className="flex items-end gap-0.5 h-8 mt-2">
                {[30,50,35,65,45,80,55,95].map((h,i) => (
                  <div key={i} className="flex-1 rounded-sm" style={{height:`${h}%`, background: i===7 ? '#c9993a' : '#0f0f0f10'}} />
                ))}
              </div>
            </div>

            {/* Badge certifié */}
            <div className="animate-float2 absolute top-16 left-[-1.5rem] rounded-2xl px-4 py-3 z-10 flex items-center gap-2.5" style={{background:'rgba(255,255,255,0.92)', backdropFilter:'blur(20px)', border:'1px solid rgba(0,0,0,0.07)', boxShadow:'0 12px 40px rgba(0,0,0,0.1)'}}>
              <div className="w-8 h-8 rounded-xl bg-[#c9993a] flex items-center justify-center text-white font-black text-xs">5K+</div>
              <div>
                <p className="text-[11px] font-semibold text-[#0f0f0f]">Talents certifiés</p>
                <p className="text-[10px] text-[#aaaaaa]">France · Europe · US</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

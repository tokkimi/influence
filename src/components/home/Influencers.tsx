"use client"
import Link from 'next/link'
import Image from 'next/image'
import { mockInfluencers } from '@/lib/mock-data'
import { BadgeCheck, ArrowRight, Star } from 'lucide-react'
import { useLang } from '@/lib/lang'

function formatK(n: number) {
  if (n >= 1000000) return `${(n/1000000).toFixed(1)}M`
  if (n >= 1000) return `${(n/1000).toFixed(0)}k`
  return `${n}`
}

export default function Influencers() {
  const { lang } = useLang()
  const list = mockInfluencers.slice(0, 6)

  return (
    <section className="py-28 bg-[#0f0f0f] relative overflow-hidden">
      {/* Subtle orange glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[2px] bg-gradient-to-r from-transparent via-[#c9993a]/40 to-transparent" />

      <div className="relative max-w-5xl mx-auto px-5 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs text-white/30 uppercase tracking-widest mb-2 font-medium">Notre réseau</p>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              {lang === 'fr' ? 'Talents certifiés' : 'Certified Talents'}
            </h2>
          </div>
          <Link href="/auth/inscription?role=brand" className="hidden sm:inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors font-medium">
            {lang === 'fr' ? 'Voir tous' : 'See all'} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {list.map((inf, i) => (
            <div key={inf.id} className="group relative rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300" style={{background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)'}}>

              {/* Photo */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={inf.photo}
                  alt={inf.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Badge certifié */}
                {inf.isVerified && (
                  <div className="absolute top-3 right-3 w-7 h-7 bg-[#0a84ff] rounded-full flex items-center justify-center shadow-lg">
                    <BadgeCheck className="w-4 h-4 text-white" strokeWidth={2.5} />
                  </div>
                )}

                {/* Pro tag */}
                {inf.subscription === 'PRO' && (
                  <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{background:'rgba(201,153,58,0.9)', color:'#fff'}}>
                    <Star className="w-2.5 h-2.5" /> Pro
                  </div>
                )}

                {/* Name on photo */}
                <div className="absolute bottom-3 left-4 right-4">
                  <p className="text-white font-semibold text-sm leading-tight">{inf.name}</p>
                  <p className="text-white/60 text-[11px]">{inf.instagram}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="p-4">
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="text-center rounded-xl py-2" style={{background:'rgba(255,255,255,0.05)'}}>
                    <p className="text-white font-bold text-xs">{formatK(inf.followers)}</p>
                    <p className="text-white/30 text-[9px] mt-0.5">{lang === 'fr' ? 'abonnés' : 'followers'}</p>
                  </div>
                  <div className="text-center rounded-xl py-2" style={{background:'rgba(255,255,255,0.05)'}}>
                    <p className="text-[#30d158] font-bold text-xs">{inf.engagementRate}%</p>
                    <p className="text-white/30 text-[9px] mt-0.5">engage.</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {inf.interests.slice(0,2).map((tag) => (
                    <span key={tag} className="text-[9px] px-2 py-0.5 rounded-full" style={{background:'rgba(255,255,255,0.07)', color:'rgba(255,255,255,0.5)'}}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="sm:hidden mt-6 text-center">
          <Link href="/auth/inscription?role=brand" className="inline-flex items-center gap-1.5 text-xs text-white/40 font-medium">
            {lang === 'fr' ? 'Voir tous les talents' : 'See all talents'} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}

"use client"
import Link from 'next/link'
import Image from 'next/image'
import { BadgeCheck, ArrowRight, Star, ChevronRight } from 'lucide-react'
import { useLang } from '@/lib/lang'

function formatK(n: number) {
  if (n >= 1000000) return `${(n/1000000).toFixed(1)}M`
  if (n >= 1000) return `${Math.round(n/1000)}k`
  return `${n}`
}

const categories = [
  {
    key: 'MICRO',
    label: 'Micro-Influenceurs',
    sub: '1K – 10K abonnés',
    color: '#30d158',
    desc: 'Communautés engagées, taux de conversion élevé, authenticité maximale.',
  },
  {
    key: 'MACRO',
    label: 'Macro-Influenceurs',
    sub: '10K – 500K abonnés',
    color: '#f97316',
    desc: 'Large audience qualifiée, visibilité nationale et internationale.',
  },
  {
    key: 'PERSONALITE',
    label: 'Personnalités',
    sub: '500K+ abonnés',
    color: '#0a84ff',
    desc: 'Stars, experts reconnus et figures publiques à impact massif.',
  },
]

const influencers = [
  { id: '1', name: 'Sophie Martin', handle: '@sophiemartin', photo: 'https://i.pravatar.cc/300?img=47', followers: 85000, engagement: 4.2, category: 'MACRO', verified: true, pro: true, tags: ['Mode', 'Lifestyle'] },
  { id: '2', name: 'Lucas Dubois', handle: '@lucasdubois_fit', photo: 'https://i.pravatar.cc/300?img=11', followers: 145000, engagement: 5.8, category: 'MACRO', verified: true, pro: true, tags: ['Fitness', 'Sport'] },
  { id: '3', name: 'Emma Laurent', handle: '@emmalaurent', photo: 'https://i.pravatar.cc/300?img=32', followers: 320000, engagement: 3.1, category: 'MACRO', verified: true, pro: false, tags: ['Voyage', 'Culture'] },
  { id: '4', name: 'Thomas Bernard', handle: '@thomasbernard', photo: 'https://i.pravatar.cc/300?img=15', followers: 8500, engagement: 6.5, category: 'MICRO', verified: false, pro: false, tags: ['Tech', 'Gaming'] },
  { id: '5', name: 'Camille Petit', handle: '@camillepetit', photo: 'https://i.pravatar.cc/300?img=44', followers: 9200, engagement: 8.9, category: 'MICRO', verified: false, pro: false, tags: ['Beauté', 'DIY'] },
  { id: '6', name: 'Marie Dupont', handle: '@mariedupont', photo: 'https://i.pravatar.cc/300?img=25', followers: 25000, engagement: 4.7, category: 'MACRO', verified: true, pro: true, tags: ['Cuisine', 'Lifestyle'] },
  { id: '7', name: 'Alexandre Roy', handle: '@alexroy', photo: 'https://i.pravatar.cc/300?img=52', followers: 680000, engagement: 2.8, category: 'PERSONALITE', verified: true, pro: true, tags: ['Business', 'Motivation'] },
  { id: '8', name: 'Léa Fontaine', handle: '@leafontaine', photo: 'https://i.pravatar.cc/300?img=29', followers: 1200000, engagement: 3.4, category: 'PERSONALITE', verified: true, pro: true, tags: ['Mode', 'Luxe'] },
]

export default function Influencers() {
  const { lang } = useLang()

  return (
    <section className="py-16 bg-[#0f0f0f] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#f97316]/30 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-5 lg:px-8">

        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-[10px] text-white/30 uppercase tracking-widest mb-2 font-medium">Notre réseau</p>
            <h2 className="text-base font-bold text-white tracking-tight">
              {lang === 'fr' ? 'Talents certifiés' : 'Certified Talents'}
            </h2>
            <div className="w-8 h-0.5 bg-[#f97316] mt-2" />
          </div>
          <Link href="/auth/inscription?role=brand" className="hidden sm:inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition font-medium">
            {lang === 'fr' ? 'Voir tous' : 'See all'} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 3 Categories */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {categories.map(cat => (
            <div key={cat.key} className="rounded-2xl p-4 relative overflow-hidden" style={{background:'rgba(255,255,255,0.04)', border:`1px solid ${cat.color}20`}}>
              <div className="w-1.5 h-1.5 rounded-full mb-3" style={{background: cat.color}} />
              <p className="text-white font-semibold text-xs leading-tight mb-0.5">{cat.label}</p>
              <p className="text-[10px] mb-2" style={{color: cat.color}}>{cat.sub}</p>
              <p className="text-[10px] text-white/30 leading-relaxed hidden sm:block">{cat.desc}</p>
            </div>
          ))}
        </div>

        {/* Horizontal scroll influencers */}
        <div className="relative">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide" style={{scrollSnapType:'x mandatory'}}>
            {influencers.map((inf) => {
              const cat = categories.find(c => c.key === inf.category)
              return (
                <div key={inf.id} className="flex-none w-44 rounded-2xl overflow-hidden group hover:-translate-y-1 transition-all duration-300" style={{background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', scrollSnapAlign:'start'}}>
                  {/* Photo */}
                  <div className="relative h-52 overflow-hidden">
                    <Image src={inf.photo} alt={inf.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                    {inf.verified && (
                      <div className="absolute top-2.5 right-2.5 w-6 h-6 bg-[#0a84ff] rounded-full flex items-center justify-center shadow-lg">
                        <BadgeCheck className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                      </div>
                    )}
                    {inf.pro && (
                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold" style={{background:'rgba(249,115,22,0.9)', color:'#fff'}}>
                        <Star className="w-2 h-2" /> Pro
                      </div>
                    )}
                    {/* Category dot */}
                    <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded-full text-[8px] font-bold" style={{background: `${cat?.color}25`, color: cat?.color, border:`1px solid ${cat?.color}40`}}>
                      {inf.category === 'PERSONALITE' ? 'Perso.' : inf.category}
                    </div>
                    <div className="absolute bottom-3 left-3 right-8">
                      <p className="text-white font-semibold text-xs leading-tight truncate">{inf.name}</p>
                      <p className="text-white/50 text-[10px] truncate">{inf.handle}</p>
                    </div>
                  </div>
                  {/* Stats */}
                  <div className="p-3">
                    <div className="grid grid-cols-2 gap-1.5">
                      <div className="text-center rounded-lg py-1.5" style={{background:'rgba(255,255,255,0.05)'}}>
                        <p className="text-white font-bold text-[11px]">{formatK(inf.followers)}</p>
                        <p className="text-white/30 text-[8px]">abonnés</p>
                      </div>
                      <div className="text-center rounded-lg py-1.5" style={{background:'rgba(255,255,255,0.05)'}}>
                        <p className="text-[#30d158] font-bold text-[11px]">{inf.engagement}%</p>
                        <p className="text-white/30 text-[8px]">engage.</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {inf.tags.slice(0,2).map(tag => (
                        <span key={tag} className="text-[8px] px-1.5 py-0.5 rounded-full" style={{background:'rgba(255,255,255,0.07)', color:'rgba(255,255,255,0.4)'}}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          {/* Fade right */}
          <div className="absolute top-0 right-0 bottom-4 w-16 pointer-events-none bg-gradient-to-l from-[#0f0f0f] to-transparent" />
        </div>

        <div className="mt-6 flex items-center justify-center sm:hidden">
          <Link href="/auth/inscription?role=brand" className="inline-flex items-center gap-1.5 text-xs text-white/40 font-medium">
            {lang === 'fr' ? 'Voir tous les talents' : 'See all talents'} <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}

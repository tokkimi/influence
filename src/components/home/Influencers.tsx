"use client"
import Link from 'next/link'
import { mockInfluencers } from '@/lib/mock-data'
import { Instagram, BadgeCheck, ArrowRight } from 'lucide-react'
import { useLang } from '@/lib/lang'

const gradients = [
  ['#ff6b6b', '#ffa07a'],
  ['#0a84ff', '#30d158'],
  ['#ff9500', '#ff6b6b'],
  ['#64d2ff', '#0a84ff'],
  ['#30d158', '#64d2ff'],
  ['#ffd60a', '#ff9500'],
]

function formatK(n: number) {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`
  if (n >= 1000) return `${(n / 1000).toFixed(0)}k`
  return `${n}`
}

function initials(name: string) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

export default function Influencers() {
  const { lang } = useLang()
  const list = mockInfluencers.slice(0, 6)

  return (
    <section className="py-20 bg-[#080c1a]">
      <div className="max-w-6xl mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-muted text-xs uppercase tracking-widest mb-2">Notre réseau</p>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              {lang === 'fr' ? 'Talents certifiés' : 'Certified Talents'}
            </h2>
          </div>
          <Link href="/auth/inscription?role=brand" className="hidden sm:inline-flex items-center gap-1.5 text-xs text-muted hover:text-white transition-colors">
            {lang === 'fr' ? 'Voir tous' : 'See all'} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Scroll horizontal desktop / grille 2 col mobile */}
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-3">
          {list.map((inf, i) => {
            const [c1, c2] = gradients[i % gradients.length]
            return (
              <div key={inf.id} className="liquid-glass-card rounded-3xl p-5 flex-shrink-0 w-[220px] sm:w-auto hover:bg-white/10 transition-all duration-300">

                {/* Avatar + badge */}
                <div className="relative w-14 h-14 mb-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg"
                    style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}
                  >
                    {initials(inf.name)}
                  </div>
                  {inf.isVerified && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#0a84ff] rounded-full flex items-center justify-center border-2 border-[#080c1a]">
                      <BadgeCheck className="w-3 h-3 text-white" strokeWidth={2.5} />
                    </div>
                  )}
                </div>

                {/* Name + handle */}
                <p className="text-white font-semibold text-sm leading-tight">{inf.name}</p>
                <div className="flex items-center gap-1 mt-0.5 mb-4">
                  <Instagram className="w-3 h-3 text-muted" />
                  <span className="text-faint text-[11px]">{inf.instagram}</span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="liquid-glass rounded-xl px-3 py-2 text-center">
                    <p className="text-white font-bold text-sm">{formatK(inf.followers)}</p>
                    <p className="text-faint text-[10px]">{lang === 'fr' ? 'abonnés' : 'followers'}</p>
                  </div>
                  <div className="liquid-glass rounded-xl px-3 py-2 text-center">
                    <p className="text-[#30d158] font-bold text-sm">{inf.engagementRate}%</p>
                    <p className="text-faint text-[10px]">engagement</p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {inf.interests.slice(0, 2).map((tag) => (
                    <span key={tag} className="liquid-glass text-faint text-[10px] px-2.5 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                  {inf.subscription === 'PRO' && (
                    <span className="text-[10px] px-2.5 py-1 rounded-full font-semibold" style={{background:'rgba(240,192,64,0.12)', color:'#f0c040', border:'1px solid rgba(240,192,64,0.2)'}}>
                      Pro
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Mobile voir tous */}
        <div className="sm:hidden mt-6 text-center">
          <Link href="/auth/inscription?role=brand" className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-white transition-colors">
            {lang === 'fr' ? 'Voir tous les talents' : 'See all talents'} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}

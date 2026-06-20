"use client"
import Link from 'next/link'
import { mockInfluencers } from '@/lib/mock-data'
import { Instagram, BadgeCheck, ArrowRight } from 'lucide-react'
import { useLang } from '@/lib/lang'

const gradients = [
  ['#fda4af','#fb923c'],
  ['#86efac','#34d399'],
  ['#93c5fd','#818cf8'],
  ['#fde68a','#fb923c'],
  ['#c4b5fd','#818cf8'],
  ['#a5f3fc','#34d399'],
]

function formatK(n: number) {
  if (n >= 1000000) return `${(n/1000000).toFixed(1)}M`
  if (n >= 1000) return `${(n/1000).toFixed(0)}k`
  return `${n}`
}
function initials(name: string) {
  return name.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase()
}

export default function Influencers() {
  const { lang } = useLang()
  const list = mockInfluencers.slice(0, 6)

  return (
    <section className="py-24 bg-[#fafaf8]">
      <div className="max-w-5xl mx-auto px-5 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs text-secondary uppercase tracking-widest mb-2">Notre réseau</p>
            <h2 className="text-2xl font-bold text-[#0f0f0f] tracking-tight">
              {lang === 'fr' ? 'Talents certifiés' : 'Certified Talents'}
            </h2>
          </div>
          <Link href="/auth/inscription?role=brand" className="hidden sm:inline-flex items-center gap-1.5 text-xs text-secondary hover:text-[#0f0f0f] transition-colors">
            {lang === 'fr' ? 'Voir tous' : 'See all'} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Desktop grid / Mobile scroll 2 colonnes */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 overflow-x-auto scrollbar-hide sm:overflow-visible">
          {list.map((inf, i) => {
            const [c1, c2] = gradients[i % gradients.length]
            return (
              <div key={inf.id} className="glass-card rounded-2xl p-4 hover:shadow-md transition-all duration-300">

                {/* Avatar + badge certifié */}
                <div className="relative w-12 h-12 mb-3">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-base" style={{background:`linear-gradient(135deg, ${c1}, ${c2})`}}>
                    {initials(inf.name)}
                  </div>
                  {inf.isVerified && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#0a84ff] rounded-full flex items-center justify-center border-2 border-white">
                      <BadgeCheck className="w-3 h-3 text-white" strokeWidth={2.5} />
                    </div>
                  )}
                </div>

                <p className="text-[#0f0f0f] font-semibold text-sm leading-tight">{inf.name}</p>
                <div className="flex items-center gap-1 mt-0.5 mb-3">
                  <Instagram className="w-3 h-3 text-tertiary" />
                  <span className="text-tertiary text-[11px] truncate">{inf.instagram}</span>
                </div>

                <div className="grid grid-cols-2 gap-1.5 mb-3">
                  <div className="bg-black/[0.03] rounded-xl px-2 py-1.5 text-center">
                    <p className="text-[#0f0f0f] font-bold text-xs">{formatK(inf.followers)}</p>
                    <p className="text-tertiary text-[9px]">{lang === 'fr' ? 'abonnés' : 'followers'}</p>
                  </div>
                  <div className="bg-black/[0.03] rounded-xl px-2 py-1.5 text-center">
                    <p className="text-[#30d158] font-bold text-xs">{inf.engagementRate}%</p>
                    <p className="text-tertiary text-[9px]">engage.</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {inf.interests.slice(0,2).map((tag) => (
                    <span key={tag} className="text-[9px] bg-black/[0.04] text-secondary px-2 py-0.5 rounded-full">{tag}</span>
                  ))}
                  {inf.subscription === 'PRO' && (
                    <span className="text-[9px] px-2 py-0.5 rounded-full font-semibold" style={{background:'rgba(201,153,58,0.1)', color:'#c9993a'}}>Pro</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <div className="sm:hidden mt-6 text-center">
          <Link href="/auth/inscription?role=brand" className="inline-flex items-center gap-1.5 text-xs text-secondary">
            {lang === 'fr' ? 'Voir tous les talents' : 'See all talents'} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}

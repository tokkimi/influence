"use client"
import Link from 'next/link'
import { mockInfluencers } from '@/lib/mock-data'
import { Instagram, BadgeCheck, ArrowRight, Star } from 'lucide-react'
import { useLang } from '@/lib/lang'

const gradients = [
  ['#fda4af','#fb923c'],
  ['#86efac','#34d399'],
  ['#93c5fd','#818cf8'],
  ['#fde68a','#fb923c'],
  ['#a5f3fc','#34d399'],
  ['#f9a8d4','#c084fc'],
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
    <section className="py-28 bg-[#f8f7f4] relative overflow-hidden">
      {/* Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="animate-blob absolute top-[-5%] right-[-5%] w-[400px] h-[400px] rounded-full opacity-30" style={{background:'radial-gradient(circle, #fde8c8 0%, transparent 70%)'}} />
        <div className="animate-blob2 absolute bottom-[-5%] left-[-5%] w-[350px] h-[350px] rounded-full opacity-25" style={{background:'radial-gradient(circle, #dbeafe 0%, transparent 70%)'}} />
      </div>

      <div className="relative max-w-5xl mx-auto px-5 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs text-secondary uppercase tracking-widest mb-2 font-medium">Notre réseau</p>
            <h2 className="text-2xl font-bold text-[#0f0f0f] tracking-tight">
              {lang === 'fr' ? 'Talents certifiés' : 'Certified Talents'}
            </h2>
          </div>
          <Link href="/auth/inscription?role=brand" className="hidden sm:inline-flex items-center gap-1.5 text-xs text-secondary hover:text-[#0f0f0f] transition-colors font-medium">
            {lang === 'fr' ? 'Voir tous' : 'See all'} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {list.map((inf, i) => {
            const [c1, c2] = gradients[i % gradients.length]
            return (
              <div key={inf.id} className="group glass-card rounded-2xl p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

                {/* Avatar */}
                <div className="relative w-14 h-14 mb-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg" style={{background:`linear-gradient(135deg, ${c1}, ${c2})`}}>
                    {initials(inf.name)}
                  </div>
                  {inf.isVerified && (
                    <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 bg-[#0a84ff] rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                      <BadgeCheck className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                    </div>
                  )}
                </div>

                <p className="text-[#0f0f0f] font-semibold text-sm leading-tight">{inf.name}</p>
                <div className="flex items-center gap-1 mt-0.5 mb-3">
                  <Instagram className="w-3 h-3 text-tertiary" />
                  <span className="text-tertiary text-[11px] truncate">{inf.instagram}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="bg-black/[0.04] rounded-xl px-2 py-2 text-center">
                    <p className="text-[#0f0f0f] font-bold text-xs">{formatK(inf.followers)}</p>
                    <p className="text-tertiary text-[9px] mt-0.5">{lang === 'fr' ? 'abonnés' : 'followers'}</p>
                  </div>
                  <div className="bg-black/[0.04] rounded-xl px-2 py-2 text-center">
                    <p className="text-[#30d158] font-bold text-xs">{inf.engagementRate}%</p>
                    <p className="text-tertiary text-[9px] mt-0.5">engage.</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {inf.interests.slice(0,2).map((tag) => (
                    <span key={tag} className="text-[9px] bg-black/[0.05] text-secondary px-2 py-0.5 rounded-full">{tag}</span>
                  ))}
                  {inf.subscription === 'PRO' && (
                    <span className="text-[9px] px-2 py-0.5 rounded-full font-semibold flex items-center gap-0.5" style={{background:'rgba(201,153,58,0.1)', color:'#c9993a'}}>
                      <Star className="w-2 h-2" /> Pro
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <div className="sm:hidden mt-6 text-center">
          <Link href="/auth/inscription?role=brand" className="inline-flex items-center gap-1.5 text-xs text-secondary font-medium">
            {lang === 'fr' ? 'Voir tous les talents' : 'See all talents'} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}

"use client"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, TrendingUp, Users, Globe, BadgeCheck, Play } from "lucide-react"
import { useLang } from "@/lib/lang"

const avatars = [
  { initials: 'SM', g: ['#f9a8d4','#fb923c'], photo: 'https://i.pravatar.cc/80?img=47' },
  { initials: 'LD', g: ['#86efac','#34d399'], photo: 'https://i.pravatar.cc/80?img=11' },
  { initials: 'EL', g: ['#93c5fd','#818cf8'], photo: 'https://i.pravatar.cc/80?img=32' },
  { initials: 'TC', g: ['#fde68a','#fb923c'], photo: 'https://i.pravatar.cc/80?img=15' },
]

export default function Hero() {
  const { t } = useLang()

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0a0a0a]">

      {/* ── BANNIÈRE IMAGE PLEIN ÉCRAN ── */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=1920&q=80&auto=format&fit=crop"
          alt="Influence marketing"
          fill
          className="object-cover object-center"
          priority
          unoptimized
        />
        {/* Overlay dégradé : noir fort en bas/gauche, transparent en haut/droite */}
        <div className="absolute inset-0" style={{background:'linear-gradient(135deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.75) 40%, rgba(0,0,0,0.35) 70%, rgba(0,0,0,0.15) 100%)'}} />
        {/* Grain subtil */}
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundSize:'128px'}} />
      </div>

      {/* ── CONTENU ── */}
      <div className="relative max-w-6xl mx-auto px-5 lg:px-8 pt-32 pb-20 min-h-screen flex flex-col justify-center">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Texte */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 animate-fade-up" style={{background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.15)', backdropFilter:'blur(12px)'}}>
              <div className="w-1.5 h-1.5 rounded-full bg-[#30d158] animate-pulse" />
              <span className="text-white/70 text-xs font-medium">{t('hero.badge')}</span>
            </div>

            <h1 className="animate-fade-up-1 font-black text-white leading-[1.03] tracking-[-0.03em] mb-6" style={{fontSize:'clamp(2.6rem, 5.5vw, 4.2rem)'}}>
              {t('hero.title1')}
              <br />
              <span style={{color:'#c9993a'}}>{t('hero.title2')}</span>
            </h1>

            <p className="animate-fade-up-2 text-white/55 text-sm leading-relaxed mb-10 max-w-[380px]">
              {t('hero.sub')}
            </p>

            <div className="animate-fade-up-3 flex flex-wrap gap-3 mb-14">
              <Link href="/auth/inscription?role=brand" className="inline-flex items-center gap-2 font-semibold px-7 py-3.5 rounded-full text-sm transition-all" style={{background:'#c9993a', color:'#fff', boxShadow:'0 8px 30px rgba(201,153,58,0.4)'}}>
                {t('hero.brand')} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/auth/inscription?role=influencer" className="inline-flex items-center gap-2 font-medium px-7 py-3.5 rounded-full text-sm transition-all text-white" style={{background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.2)', backdropFilter:'blur(12px)'}}>
                <Play className="w-3.5 h-3.5" /> {t('hero.influencer')}
              </Link>
            </div>

            {/* Stats */}
            <div className="animate-fade-up-3 flex gap-10 pt-8 border-t" style={{borderColor:'rgba(255,255,255,0.1)'}}>
              {[
                { icon: Users, value: '5 420', label: t('hero.stat1') },
                { icon: TrendingUp, value: '847', label: t('hero.stat2') },
                { icon: Globe, value: '52', label: t('hero.stat3') },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label}>
                  <p className="text-white font-bold text-2xl tracking-tight">{value}</p>
                  <p className="text-white/35 text-xs mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Cards visuelles */}
          <div className="hidden lg:block relative h-[500px]">

            {/* ROI card */}
            <div className="animate-float absolute top-0 right-0 w-68 rounded-3xl p-6" style={{width:'280px', background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.15)', backdropFilter:'blur(32px)'}}>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-white/40 text-xs mb-1">ROI moyen</p>
                  <p className="text-white font-bold text-3xl tracking-tight">+287%</p>
                </div>
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{background:'rgba(201,153,58,0.2)'}}>
                  <TrendingUp className="w-5 h-5 text-[#c9993a]" />
                </div>
              </div>
              <div className="flex items-end gap-1.5 h-16 mb-3">
                {[28,45,32,58,42,72,50,85,62,94].map((h, i) => (
                  <div key={i} className="flex-1 rounded-sm" style={{height:`${h}%`, background: i >= 7 ? '#c9993a' : 'rgba(255,255,255,0.12)'}} />
                ))}
              </div>
              <p className="text-xs text-white/30">124 campagnes cette semaine</p>
            </div>

            {/* Talent card avec photos */}
            <div className="animate-float2 absolute top-52 left-0 rounded-3xl p-5" style={{width:'250px', background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.15)', backdropFilter:'blur(32px)'}}>
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-semibold text-white">Talents certifiés</p>
                <span className="text-[10px] text-[#30d158] font-medium">● Live</span>
              </div>
              <div className="space-y-3">
                {avatars.slice(0,3).map((a, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <img src={a.photo} alt="" className="w-9 h-9 rounded-2xl object-cover flex-shrink-0" />
                    <div className="flex-1">
                      <div className="h-2 rounded-full mb-1.5" style={{background:'rgba(255,255,255,0.12)'}} />
                      <div className="h-1.5 rounded-full w-2/3" style={{background:'rgba(255,255,255,0.07)'}} />
                    </div>
                    <BadgeCheck className="w-4 h-4 text-[#0a84ff] flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            {/* Avatars stack en bas */}
            <div className="animate-float absolute bottom-10 right-6 rounded-2xl p-4 flex items-center gap-3" style={{background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.15)', backdropFilter:'blur(20px)'}}>
              <div className="flex -space-x-2">
                {avatars.map((a, i) => (
                  <img key={i} src={a.photo} alt="" className="w-8 h-8 rounded-full object-cover border-2" style={{borderColor:'rgba(255,255,255,0.2)'}} />
                ))}
              </div>
              <div>
                <p className="text-white text-xs font-semibold">Paiement validé</p>
                <p className="text-white/35 text-[11px]">2 400 € · il y a 2 min</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-up-3">
        <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent" />
        <p className="text-white/25 text-[10px] uppercase tracking-widest">Scroll</p>
      </div>
    </section>
  )
}

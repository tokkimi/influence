"use client"
import Link from "next/link"
import { ArrowRight, TrendingUp, Users, Globe, CheckCircle2, Sparkles, Star } from "lucide-react"
import { useLang } from "@/lib/lang"

export default function Hero() {
  const { t } = useLang()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#080c1a]">

      {/* Colorful depth blobs — what makes glass look like glass */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-5%] right-[-5%] w-[700px] h-[700px] rounded-full" style={{background:'radial-gradient(circle, rgba(20,80,160,0.5) 0%, transparent 65%)'}} />
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full" style={{background:'radial-gradient(circle, rgba(10,80,80,0.45) 0%, transparent 65%)'}} />
        <div className="absolute top-[40%] left-[35%] w-[500px] h-[500px] rounded-full" style={{background:'radial-gradient(circle, rgba(80,20,120,0.2) 0%, transparent 65%)'}} />
        <div className="absolute top-[15%] left-[5%] w-[300px] h-[300px] rounded-full" style={{background:'radial-gradient(circle, rgba(180,120,20,0.15) 0%, transparent 65%)'}} />
      </div>

      <div className="relative max-w-6xl mx-auto px-5 lg:px-8 pt-24 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left — text */}
          <div>
            <div className="inline-flex items-center gap-2 liquid-glass rounded-full px-4 py-2 mb-8">
              <div className="w-2 h-2 bg-[#f0c040] rounded-full animate-pulse" />
              <span className="text-white/60 text-xs font-medium tracking-wide">{t('hero.badge')}</span>
            </div>

            <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.08] tracking-tight mb-5">
              {t('hero.title1')}
              <br />
              <span style={{background:'linear-gradient(135deg, #f0c040 0%, #f4a638 50%, #e87040 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text'}}>
                {t('hero.title2')}
              </span>
            </h1>

            <p className="text-muted text-lg leading-relaxed mb-10 max-w-md">
              {t('hero.sub')}
            </p>

            <div className="flex flex-wrap gap-3 mb-12">
              <Link href="/auth/inscription?role=brand" className="inline-flex items-center gap-2 liquid-glass-strong text-white font-semibold px-6 py-3 rounded-2xl text-sm transition-all hover:bg-white/15 border border-white/20">
                {t('hero.brand')} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/auth/inscription?role=influencer" className="inline-flex items-center gap-2 liquid-glass text-white/75 font-medium px-6 py-3 rounded-2xl text-sm transition-all hover:text-white hover:bg-white/10">
                {t('hero.influencer')}
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8">
              {[
                { icon: Users, value: '5 420', label: t('hero.stat1') },
                { icon: TrendingUp, value: '847', label: t('hero.stat2') },
                { icon: Globe, value: '52', label: t('hero.stat3') },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label}>
                  <p className="text-white font-bold text-xl leading-none">{value}</p>
                  <p className="text-faint text-xs mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — floating glass dashboard mockup */}
          <div className="relative hidden lg:block">

            {/* Main card */}
            <div className="liquid-glass-card rounded-3xl p-6 animate-float">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-faint text-xs mb-1">Campagnes actives</p>
                  <p className="text-white font-bold text-2xl">24</p>
                </div>
                <div className="w-10 h-10 rounded-2xl liquid-glass flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-[#f0c040]" />
                </div>
              </div>
              {/* Mini chart bars */}
              <div className="flex items-end gap-1.5 h-16 mb-4">
                {[40,65,45,80,60,90,75,95,70,85].map((h, i) => (
                  <div key={i} className="flex-1 rounded-sm" style={{height:`${h}%`, background: i >= 7 ? 'rgba(240,192,64,0.8)' : 'rgba(255,255,255,0.1)'}} />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#30d158] rounded-full" />
                <span className="text-faint text-xs">+34% cette semaine</span>
              </div>
            </div>

            {/* Floating influencer card */}
            <div className="liquid-glass-card rounded-2xl p-4 absolute -left-8 top-1/3 w-52 animate-float-delay">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#f0c040] to-[#e87040] flex items-center justify-center text-xs font-bold text-white flex-shrink-0">SM</div>
                <div>
                  <p className="text-white text-xs font-semibold">Sofia Martini</p>
                  <p className="text-faint text-[10px]">280k abonnés</p>
                </div>
              </div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 text-[#f0c040] fill-[#f0c040]" />)}
              </div>
            </div>

            {/* Floating notification */}
            <div className="liquid-glass-card rounded-2xl p-4 absolute -right-4 bottom-8 w-56">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#30d158]/15 border border-[#30d158]/30 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-[#30d158]" />
                </div>
                <div>
                  <p className="text-white text-xs font-semibold">Paiement validé</p>
                  <p className="text-faint text-[10px]">2 400€ · il y a 3 min</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

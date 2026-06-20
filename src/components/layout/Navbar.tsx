"use client"
import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { useLang } from "@/lib/lang"

export function LogoMark({ dark = false }: { dark?: boolean }) {
  const textColor = dark ? '#ffffff' : '#0f0f0f'
  return (
    <div className="flex flex-col leading-none select-none">
      <div className="flex items-center" style={{gap:'1px'}}>
        <span style={{fontWeight:900, fontSize:'1.15rem', letterSpacing:'-0.06em', color: textColor, lineHeight:1}}>D</span>
        <div className="rounded-full bg-[#c9993a] mx-px" style={{width:'7px', height:'7px', marginBottom:'2px', flexShrink:0}} />
        <span style={{fontWeight:900, fontSize:'1.15rem', letterSpacing:'-0.06em', color: textColor, lineHeight:1}}>T</span>
      </div>
      <span style={{fontSize:'6.5px', fontWeight:700, letterSpacing:'0.22em', color: dark ? 'rgba(255,255,255,0.5)' : '#6b6b6b', textTransform:'uppercase', marginTop:'1px'}}>The Talents</span>
    </div>
  )
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { lang, setLang, t } = useLang()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
      <div className="max-w-6xl mx-auto px-5 lg:px-8">
        <div className="flex justify-between items-center h-14">
          <Link href="/"><LogoMark /></Link>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
              className="text-xs font-medium text-secondary hover:text-[#0f0f0f] border border-black/10 hover:border-black/25 rounded-full px-3 py-1.5 transition-all"
            >
              {lang === 'fr' ? 'EN' : 'FR'}
            </button>
            <Link href="/auth/connexion" className="text-sm text-secondary hover:text-[#0f0f0f] px-4 py-2 font-medium transition-all">
              {t('nav.login')}
            </Link>
            <Link href="/auth/inscription" className="text-sm bg-[#0f0f0f] hover:bg-[#222] text-white px-5 py-2 rounded-full font-medium transition-colors">
              {t('nav.signup')}
            </Link>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-secondary p-1">
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-black/5">
            <button onClick={() => { setLang(lang === 'fr' ? 'en' : 'fr'); setIsOpen(false) }} className="w-full text-xs text-secondary border border-black/10 rounded-full py-2">
              {lang === 'fr' ? 'Switch to English' : 'Passer en Français'}
            </button>
            <Link href="/auth/connexion" className="block text-center text-secondary border border-black/10 px-4 py-2.5 rounded-xl text-sm" onClick={() => setIsOpen(false)}>{t('nav.login')}</Link>
            <Link href="/auth/inscription" className="block text-center bg-[#0f0f0f] text-white px-4 py-2.5 rounded-xl text-sm font-medium" onClick={() => setIsOpen(false)}>{t('nav.signup')}</Link>
          </div>
        )}
      </div>
    </nav>
  )
}

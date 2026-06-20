"use client"
import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { useLang } from "@/lib/lang"

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 group">
      {/* Single luminous dot logo */}
      <div className="relative w-7 h-7 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-[#0f0f0f] opacity-10 scale-150 group-hover:opacity-20 transition-all duration-500" />
        <div className="w-4 h-4 rounded-full bg-[#0f0f0f] group-hover:scale-110 transition-transform duration-300" />
        <div className="absolute w-1.5 h-1.5 rounded-full bg-[#c9993a] top-0.5 right-0.5 animate-pulse-dot" />
      </div>
      <span className="font-semibold text-[15px] tracking-[-0.01em] text-[#0f0f0f]">Dot The Talents</span>
    </Link>
  )
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { lang, setLang, t } = useLang()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
      <div className="max-w-6xl mx-auto px-5 lg:px-8">
        <div className="flex justify-between items-center h-14">
          <Logo />

          <div className="hidden md:flex items-center gap-7">
            {[
              { href: '/comment-ca-marche', label: t('nav.how') },
              { href: '/tarifs', label: t('nav.pricing') },
              { href: '/faq', label: 'FAQ' },
            ].map(l => (
              <Link key={l.href} href={l.href} className="text-sm text-secondary hover:text-[#0f0f0f] transition-colors">{l.label}</Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
              className="text-xs font-medium text-secondary hover:text-[#0f0f0f] border border-black/10 hover:border-black/25 rounded-full px-3 py-1.5 transition-all"
            >
              {lang === 'fr' ? 'EN' : 'FR'}
            </button>
            <Link href="/auth/connexion" className="text-sm text-secondary hover:text-[#0f0f0f] px-3 py-1.5 transition-all">
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
          <div className="md:hidden py-4 space-y-1 border-t border-black/5">
            <Link href="/comment-ca-marche" className="block text-secondary py-2.5 px-2 text-sm hover:text-[#0f0f0f]" onClick={() => setIsOpen(false)}>{t('nav.how')}</Link>
            <Link href="/tarifs" className="block text-secondary py-2.5 px-2 text-sm hover:text-[#0f0f0f]" onClick={() => setIsOpen(false)}>{t('nav.pricing')}</Link>
            <Link href="/faq" className="block text-secondary py-2.5 px-2 text-sm hover:text-[#0f0f0f]" onClick={() => setIsOpen(false)}>FAQ</Link>
            <div className="flex flex-col gap-2 pt-3 border-t border-black/5">
              <button onClick={() => { setLang(lang === 'fr' ? 'en' : 'fr'); setIsOpen(false) }} className="text-xs text-secondary border border-black/10 rounded-full py-2">
                {lang === 'fr' ? 'Switch to English' : 'Passer en Français'}
              </button>
              <Link href="/auth/connexion" className="text-center text-secondary border border-black/10 px-4 py-2.5 rounded-xl text-sm" onClick={() => setIsOpen(false)}>{t('nav.login')}</Link>
              <Link href="/auth/inscription" className="text-center bg-[#0f0f0f] text-white px-4 py-2.5 rounded-xl text-sm font-medium" onClick={() => setIsOpen(false)}>{t('nav.signup')}</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

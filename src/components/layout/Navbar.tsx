"use client"
import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { useLang } from "@/lib/lang"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { lang, setLang, t } = useLang()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/6">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg glass-strong flex items-center justify-center border border-violet-400/30">
              <span className="text-violet-300 font-bold text-[11px] tracking-widest">DTT</span>
            </div>
            <span className="font-semibold text-white text-[15px] tracking-tight">Dot The Talents</span>
          </Link>

          {/* Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/comment-ca-marche" className="text-sm text-muted hover:text-white transition-colors">{t('nav.how')}</Link>
            <Link href="/tarifs" className="text-sm text-muted hover:text-white transition-colors">{t('nav.pricing')}</Link>
            <Link href="/faq" className="text-sm text-muted hover:text-white transition-colors">FAQ</Link>
          </div>

          {/* Right */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
              className="text-xs font-medium text-muted hover:text-white border border-white/10 hover:border-white/25 rounded-full px-3 py-1.5 transition-all"
            >
              {lang === 'fr' ? 'EN' : 'FR'}
            </button>
            <Link href="/auth/connexion" className="text-sm text-muted hover:text-white px-4 py-2 rounded-lg hover:bg-white/5 transition-all">
              {t('nav.login')}
            </Link>
            <Link href="/auth/inscription" className="text-sm bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              {t('nav.signup')}
            </Link>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-muted p-1">
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 space-y-1 border-t border-white/6">
            <Link href="/comment-ca-marche" className="block text-muted hover:text-white py-2 px-2 text-sm rounded-lg hover:bg-white/5" onClick={() => setIsOpen(false)}>{t('nav.how')}</Link>
            <Link href="/tarifs" className="block text-muted hover:text-white py-2 px-2 text-sm rounded-lg hover:bg-white/5" onClick={() => setIsOpen(false)}>{t('nav.pricing')}</Link>
            <Link href="/faq" className="block text-muted hover:text-white py-2 px-2 text-sm rounded-lg hover:bg-white/5" onClick={() => setIsOpen(false)}>FAQ</Link>
            <div className="flex flex-col gap-2 pt-3 border-t border-white/6">
              <button onClick={() => { setLang(lang === 'fr' ? 'en' : 'fr'); setIsOpen(false) }} className="text-center text-xs text-muted border border-white/10 rounded-full py-2">
                {lang === 'fr' ? 'Switch to English' : 'Passer en Français'}
              </button>
              <Link href="/auth/connexion" className="text-center text-muted border border-white/10 px-4 py-2 rounded-lg text-sm" onClick={() => setIsOpen(false)}>{t('nav.login')}</Link>
              <Link href="/auth/inscription" className="text-center bg-violet-600 text-white px-4 py-2 rounded-lg text-sm font-medium" onClick={() => setIsOpen(false)}>{t('nav.signup')}</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

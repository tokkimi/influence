"use client"
import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { useLang } from "@/lib/lang"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { lang, setLang, t } = useLang()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/98 backdrop-blur-md border-b border-gray-100/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9">
              <div className="absolute inset-0 bg-gradient-to-br from-ink-700 to-ink-500 rounded-xl rotate-3 group-hover:rotate-6 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-br from-ink-600 to-ink-800 rounded-xl flex items-center justify-center">
                <span className="text-gold-400 font-bold text-xs tracking-wider">DTT</span>
              </div>
            </div>
            <div className="leading-tight">
              <span className="font-display font-bold text-lg text-ink-900 block leading-none">Dot The Talents</span>
              <span className="text-[10px] text-ink-400 tracking-widest uppercase">Influence Platform</span>
            </div>
          </Link>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/comment-ca-marche" className="text-sm text-gray-600 hover:text-ink-700 font-medium transition-colors">{t('nav.how')}</Link>
            <Link href="/tarifs" className="text-sm text-gray-600 hover:text-ink-700 font-medium transition-colors">{t('nav.pricing')}</Link>
            <Link href="/faq" className="text-sm text-gray-600 hover:text-ink-700 font-medium transition-colors">FAQ</Link>
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            {/* Lang toggle */}
            <button
              onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
              className="text-xs font-semibold text-gray-500 hover:text-ink-700 border border-gray-200 hover:border-ink-300 rounded-full px-3 py-1.5 transition-all"
            >
              {lang === 'fr' ? 'EN' : 'FR'}
            </button>
            <Link href="/auth/connexion" className="text-sm text-ink-700 border border-ink-200 hover:bg-ink-50 px-4 py-2 rounded-lg font-medium transition-colors">
              {t('nav.login')}
            </Link>
            <Link href="/auth/inscription" className="text-sm bg-ink-700 text-white hover:bg-ink-800 px-4 py-2 rounded-lg font-medium transition-colors shadow-ink">
              {t('nav.signup')}
            </Link>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-600 p-1">
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-gray-100">
            <Link href="/comment-ca-marche" className="block text-gray-600 py-2 text-sm" onClick={() => setIsOpen(false)}>{t('nav.how')}</Link>
            <Link href="/tarifs" className="block text-gray-600 py-2 text-sm" onClick={() => setIsOpen(false)}>{t('nav.pricing')}</Link>
            <Link href="/faq" className="block text-gray-600 py-2 text-sm" onClick={() => setIsOpen(false)}>FAQ</Link>
            <div className="flex flex-col gap-2 pt-3 border-t border-gray-100">
              <button onClick={() => { setLang(lang === 'fr' ? 'en' : 'fr'); setIsOpen(false) }} className="text-center text-xs font-semibold text-gray-500 border border-gray-200 rounded-full py-2">
                {lang === 'fr' ? 'Switch to English' : 'Passer en Français'}
              </button>
              <Link href="/auth/connexion" className="text-center text-ink-700 border border-ink-200 px-4 py-2 rounded-lg text-sm font-medium" onClick={() => setIsOpen(false)}>{t('nav.login')}</Link>
              <Link href="/auth/inscription" className="text-center bg-ink-700 text-white px-4 py-2 rounded-lg text-sm font-medium" onClick={() => setIsOpen(false)}>{t('nav.signup')}</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

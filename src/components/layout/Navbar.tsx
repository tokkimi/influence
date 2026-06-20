"use client"
import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { useLang } from "@/lib/lang"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { lang, setLang, t } = useLang()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
      <div className="max-w-6xl mx-auto px-5 lg:px-8">
        <div className="flex justify-between items-center h-14">

          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#1d1d1f] flex items-center justify-center">
              <span className="text-white font-bold text-[10px] tracking-widest">DTT</span>
            </div>
            <span className="font-semibold text-[#1d1d1f] text-[15px] tracking-tight">Dot The Talents</span>
          </Link>

          <div className="hidden md:flex items-center gap-7">
            <Link href="/comment-ca-marche" className="text-sm text-secondary hover:text-[#1d1d1f] transition-colors">{t('nav.how')}</Link>
            <Link href="/tarifs" className="text-sm text-secondary hover:text-[#1d1d1f] transition-colors">{t('nav.pricing')}</Link>
            <Link href="/faq" className="text-sm text-secondary hover:text-[#1d1d1f] transition-colors">FAQ</Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
              className="text-xs font-medium text-secondary hover:text-[#1d1d1f] px-3 py-1.5 rounded-full border border-black/10 hover:border-black/25 transition-all"
            >
              {lang === 'fr' ? 'EN' : 'FR'}
            </button>
            <Link href="/auth/connexion" className="text-sm text-secondary hover:text-[#1d1d1f] px-3 py-1.5 rounded-lg hover:bg-black/5 transition-all">
              {t('nav.login')}
            </Link>
            <Link href="/auth/inscription" className="text-sm bg-[#1d1d1f] hover:bg-black text-white px-4 py-2 rounded-full font-medium transition-colors">
              {t('nav.signup')}
            </Link>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-secondary p-1">
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 space-y-1 border-t border-black/6">
            <Link href="/comment-ca-marche" className="block text-secondary py-2.5 px-2 text-sm rounded-xl hover:bg-black/4" onClick={() => setIsOpen(false)}>{t('nav.how')}</Link>
            <Link href="/tarifs" className="block text-secondary py-2.5 px-2 text-sm rounded-xl hover:bg-black/4" onClick={() => setIsOpen(false)}>{t('nav.pricing')}</Link>
            <Link href="/faq" className="block text-secondary py-2.5 px-2 text-sm rounded-xl hover:bg-black/4" onClick={() => setIsOpen(false)}>FAQ</Link>
            <div className="flex flex-col gap-2 pt-3 border-t border-black/6">
              <button onClick={() => { setLang(lang === 'fr' ? 'en' : 'fr'); setIsOpen(false) }} className="text-xs text-secondary border border-black/10 rounded-full py-2">
                {lang === 'fr' ? 'Switch to English' : 'Passer en Français'}
              </button>
              <Link href="/auth/connexion" className="text-center text-secondary border border-black/10 px-4 py-2.5 rounded-xl text-sm" onClick={() => setIsOpen(false)}>{t('nav.login')}</Link>
              <Link href="/auth/inscription" className="text-center bg-[#1d1d1f] text-white px-4 py-2.5 rounded-xl text-sm font-medium" onClick={() => setIsOpen(false)}>{t('nav.signup')}</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

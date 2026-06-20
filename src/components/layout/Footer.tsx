"use client"
import Link from "next/link"
import { Instagram, Twitter, Linkedin } from "lucide-react"
import { useLang } from "@/lib/lang"

export default function Footer() {
  const { t } = useLang()

  return (
    <footer className="bg-ink-950 text-white/50">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-9 h-9">
                <div className="absolute inset-0 bg-gradient-to-br from-ink-600 to-ink-800 rounded-xl flex items-center justify-center border border-white/10">
                  <span className="text-gold-400 font-bold text-xs tracking-wider">DTT</span>
                </div>
              </div>
              <span className="font-display font-bold text-lg text-white">Dot The Talents</span>
            </div>
            <p className="text-sm leading-relaxed mb-5">{t('footer.desc')}</p>
            <div className="flex gap-3">
              <a href="#" className="hover:text-white transition-colors"><Instagram size={18} /></a>
              <a href="#" className="hover:text-white transition-colors"><Twitter size={18} /></a>
              <a href="#" className="hover:text-white transition-colors"><Linkedin size={18} /></a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Platform</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/comment-ca-marche" className="hover:text-white transition-colors">{t('nav.how')}</Link></li>
              <li><Link href="/tarifs" className="hover:text-white transition-colors">{t('nav.pricing')}</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/auth/inscription" className="hover:text-white transition-colors">{t('nav.signup')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Légal</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/cgv" className="hover:text-white transition-colors">CGV</Link></li>
              <li><Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Mentions légales</a></li>
              <li><a href="#" className="hover:text-white transition-colors">RGPD</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li>contact@dotthetalents.com</li>
              <li>Paris, France 🇫🇷</li>
              <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Presse</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/8 pt-8 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-xs">© 2024 Dot The Talents. {t('footer.rights')}</p>
          <p className="text-xs">Made with ❤️ in France</p>
        </div>
      </div>
    </footer>
  )
}

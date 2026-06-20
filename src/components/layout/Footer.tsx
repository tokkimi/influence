"use client"
import Link from "next/link"
import { Instagram, Twitter, Linkedin } from "lucide-react"
import { useLang } from "@/lib/lang"

export default function Footer() {
  const { t } = useLang()

  return (
    <footer className="bg-[#07071a] border-t border-white/6 text-white/40">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-7 h-7 rounded-lg glass-strong flex items-center justify-center border border-violet-400/25">
                <span className="text-violet-300 font-bold text-[10px] tracking-wider">DTT</span>
              </div>
              <span className="font-semibold text-white/80 text-sm">Dot The Talents</span>
            </div>
            <p className="text-sm leading-relaxed mb-5">{t('footer.desc')}</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors"><Instagram size={16} /></a>
              <a href="#" className="hover:text-white transition-colors"><Twitter size={16} /></a>
              <a href="#" className="hover:text-white transition-colors"><Linkedin size={16} /></a>
            </div>
          </div>

          <div>
            <h3 className="text-white/60 font-medium mb-4 text-xs uppercase tracking-widest">Platform</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/comment-ca-marche" className="hover:text-white transition-colors">{t('nav.how')}</Link></li>
              <li><Link href="/tarifs" className="hover:text-white transition-colors">{t('nav.pricing')}</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/auth/inscription" className="hover:text-white transition-colors">{t('nav.signup')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white/60 font-medium mb-4 text-xs uppercase tracking-widest">Légal</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/cgv" className="hover:text-white transition-colors">CGV</Link></li>
              <li><Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Mentions légales</a></li>
              <li><a href="#" className="hover:text-white transition-colors">RGPD</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white/60 font-medium mb-4 text-xs uppercase tracking-widest">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li>contact@dotthetalents.com</li>
              <li>Paris, France</li>
              <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Presse</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/6 pt-8 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-xs">© 2024 Dot The Talents. {t('footer.rights')}</p>
          <p className="text-xs">Made with ❤️ in France</p>
        </div>
      </div>
    </footer>
  )
}

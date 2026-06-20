"use client"
import Link from "next/link"
import { Instagram, Twitter, Linkedin } from "lucide-react"
import { useLang } from "@/lib/lang"

export default function Footer() {
  const { t } = useLang()

  return (
    <footer className="bg-[#050810] border-t border-white/5 text-white/30">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-7 h-7 rounded-lg liquid-glass flex items-center justify-center border border-white/15">
                <span className="text-white font-bold text-[10px] tracking-widest">DTT</span>
              </div>
              <span className="font-semibold text-white/70 text-sm">Dot The Talents</span>
            </div>
            <p className="text-sm leading-relaxed mb-5">{t('footer.desc')}</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors"><Instagram size={15} /></a>
              <a href="#" className="hover:text-white transition-colors"><Twitter size={15} /></a>
              <a href="#" className="hover:text-white transition-colors"><Linkedin size={15} /></a>
            </div>
          </div>

          {[
            { title: 'Platform', links: [
              { href: '/comment-ca-marche', label: t('nav.how') },
              { href: '/tarifs', label: t('nav.pricing') },
              { href: '/faq', label: 'FAQ' },
              { href: '/auth/inscription', label: t('nav.signup') },
            ]},
            { title: 'Légal', links: [
              { href: '/cgv', label: 'CGV' },
              { href: '/cookies', label: 'Cookies' },
              { href: '#', label: 'Mentions légales' },
              { href: '#', label: 'RGPD' },
            ]},
            { title: 'Contact', links: [
              { href: '#', label: 'contact@dotthetalents.com' },
              { href: '#', label: 'Paris, France' },
              { href: '#', label: 'Support' },
              { href: '#', label: 'Presse' },
            ]},
          ].map(col => (
            <div key={col.title}>
              <h3 className="text-white/40 font-medium mb-4 text-[11px] uppercase tracking-widest">{col.title}</h3>
              <ul className="space-y-3">
                {col.links.map(l => (
                  <li key={l.label}><Link href={l.href} className="text-sm hover:text-white transition-colors">{l.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-xs">© 2024 Dot The Talents. {t('footer.rights')}</p>
          <p className="text-xs">Made with ❤️ in France</p>
        </div>
      </div>
    </footer>
  )
}

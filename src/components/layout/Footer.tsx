"use client"
import Link from "next/link"
import { Instagram, Twitter, Linkedin } from "lucide-react"
import { useLang } from "@/lib/lang"

export default function Footer() {
  const { t } = useLang()
  return (
    <footer className="bg-[#fafaf8] border-t border-black/6 text-secondary">
      <div className="max-w-5xl mx-auto px-5 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="flex items-center gap-0.5">
                <div className="w-2 h-2 rounded-full bg-[#0f0f0f]" />
                <div className="w-2 h-2 rounded-full bg-[#c9993a]" />
                <div className="w-2 h-2 rounded-full bg-[#0f0f0f] opacity-40" />
              </div>
              <span className="font-display font-bold text-sm text-[#0f0f0f]">Dot The Talents</span>
            </div>
            <p className="text-sm leading-relaxed mb-5">{t('footer.desc')}</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-[#0f0f0f] transition-colors"><Instagram size={15} /></a>
              <a href="#" className="hover:text-[#0f0f0f] transition-colors"><Twitter size={15} /></a>
              <a href="#" className="hover:text-[#0f0f0f] transition-colors"><Linkedin size={15} /></a>
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
              <h3 className="text-[#0f0f0f] font-medium mb-4 text-[11px] uppercase tracking-widest">{col.title}</h3>
              <ul className="space-y-3">
                {col.links.map(l => (
                  <li key={l.label}><Link href={l.href} className="text-sm hover:text-[#0f0f0f] transition-colors">{l.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-black/6 pt-8 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-xs">© 2024 Dot The Talents. {t('footer.rights')}</p>
          <p className="text-xs">Made with ❤️ in France</p>
        </div>
      </div>
    </footer>
  )
}

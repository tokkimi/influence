"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Info, Tag, HelpCircle, LogIn } from "lucide-react"
import { useLang } from "@/lib/lang"

export default function BottomNav() {
  const pathname = usePathname()
  const { t } = useLang()

  const items = [
    { href: '/', icon: Home, label: 'Accueil' },
    { href: '/comment-ca-marche', icon: Info, label: t('nav.how') },
    { href: '/tarifs', icon: Tag, label: t('nav.pricing') },
    { href: '/faq', icon: HelpCircle, label: 'FAQ' },
    { href: '/auth/connexion', icon: LogIn, label: t('nav.login') },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 pb-safe md:hidden glass-bottom">
      <div className="flex items-center justify-around px-2 py-2">
        {items.map(({ href, icon: Icon, label }) => {
          const active = pathname === href
          return (
            <Link key={href} href={href} className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all">
              <Icon
                size={22}
                className={active ? 'text-[#ff2d55]' : 'text-[#aeaeb2]'}
                strokeWidth={active ? 2.5 : 1.8}
              />
              <span className={`text-[10px] font-medium leading-none ${active ? 'text-[#ff2d55]' : 'text-[#aeaeb2]'}`}>
                {label.length > 8 ? label.slice(0, 7) + '…' : label}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

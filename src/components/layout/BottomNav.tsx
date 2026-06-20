"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Info, Tag, HelpCircle, LogIn } from "lucide-react"
import { useLang } from "@/lib/lang"

export default function BottomNav() {
  const pathname = usePathname()
  const { t } = useLang()

  // Hide on dashboard routes
  if (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/marque') ||
    pathname.startsWith('/influenceur')
  ) return null

  const items = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/comment-ca-marche', icon: Info, label: 'Guide' },
    { href: '/tarifs', icon: Tag, label: t('nav.pricing') },
    { href: '/faq', icon: HelpCircle, label: 'FAQ' },
    { href: '/auth/connexion', icon: LogIn, label: t('nav.login') },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden" style={{background:'rgba(255,255,255,0.9)', backdropFilter:'blur(20px) saturate(180%)', borderTop:'1px solid rgba(0,0,0,0.08)'}}>
      <div className="flex items-center justify-around px-2 py-2">
        {items.map(({ href, icon: Icon, label }) => {
          const active = pathname === href
          return (
            <Link key={href} href={href} className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-2xl transition-all">
              <Icon
                size={19}
                className={active ? 'text-[#f97316]' : 'text-[#0f0f0f]/40'}
                strokeWidth={active ? 2.5 : 1.8}
              />
              <span className={`text-[10px] font-medium ${active ? 'text-[#f97316]' : 'text-[#0f0f0f]/40'}`}>
                {label}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

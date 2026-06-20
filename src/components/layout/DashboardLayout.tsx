'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard, PlusCircle, List, Wallet, User,
  Users, Building2, Mail, Search, ArrowLeftRight,
  LogOut, CheckSquare, Briefcase
} from 'lucide-react'

interface NavItem { href: string; label: string; icon: React.ElementType }

function BrandNav(): NavItem[] {
  return [
    { href: '/marque/tableau-de-bord', label: 'Tableau de bord', icon: LayoutDashboard },
    { href: '/marque/nouvelle-campagne', label: 'Nouvelle campagne', icon: PlusCircle },
    { href: '/marque/campagnes', label: 'Mes campagnes', icon: List },
    { href: '/marque/portefeuille', label: 'Portefeuille', icon: Wallet },
    { href: '/marque/profil', label: 'Mon profil', icon: User },
  ]
}

function InfluencerNav(): NavItem[] {
  return [
    { href: '/influenceur/tableau-de-bord', label: 'Tableau de bord', icon: LayoutDashboard },
    { href: '/influenceur/propositions', label: 'Propositions', icon: CheckSquare },
    { href: '/influenceur/missions', label: 'Mes missions', icon: Briefcase },
    { href: '/influenceur/portefeuille', label: 'Portefeuille', icon: Wallet },
    { href: '/influenceur/profil', label: 'Mon profil', icon: User },
  ]
}

function AdminNav(): NavItem[] {
  return [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/influenceurs', label: 'Influenceurs', icon: Users },
    { href: '/admin/marques', label: 'Marques', icon: Building2 },
    { href: '/admin/campagnes', label: 'Campagnes', icon: List },
    { href: '/admin/transactions', label: 'Transactions', icon: ArrowLeftRight },
    { href: '/admin/newsletter', label: 'Newsletter', icon: Mail },
    { href: '/admin/seo', label: 'SEO', icon: Search },
  ]
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()
  const pathname = usePathname()
  const role = (session?.user as { role?: string })?.role

  const navItems = role === 'ADMIN' ? AdminNav() : role === 'BRAND' ? BrandNav() : InfluencerNav()
  const roleLabel = role === 'ADMIN' ? 'Admin' : role === 'BRAND' ? 'Marque' : 'Influenceur'

  return (
    <div className="min-h-screen flex bg-[#f8f7f4]">
      {/* Sidebar */}
      <aside className="w-60 bg-[#0f0f0f] flex flex-col fixed inset-y-0 left-0 z-30">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-white/8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-6 h-6 flex items-center justify-center">
              <div className="w-3.5 h-3.5 rounded-full bg-white group-hover:scale-110 transition-transform" />
              <div className="absolute w-1.5 h-1.5 rounded-full bg-[#c9993a] top-0 right-0" />
            </div>
            <span className="font-semibold text-sm text-white tracking-[-0.01em]">Dot The Talents</span>
          </Link>
          <div className="mt-3 inline-flex items-center text-[10px] font-medium px-2.5 py-1 rounded-full" style={{background:'rgba(201,153,58,0.15)', color:'#c9993a'}}>
            {roleLabel}
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 overflow-y-auto">
          <ul className="space-y-0.5">
            {navItems.map((item) => {
              const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                      active
                        ? 'bg-white/10 text-white'
                        : 'text-white/50 hover:bg-white/6 hover:text-white/80'
                    )}
                  >
                    <item.icon className={cn('w-4 h-4 flex-shrink-0', active ? 'text-[#c9993a]' : '')} />
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* User + logout */}
        <div className="p-4 border-t border-white/8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              {session?.user?.name?.[0] || '?'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{session?.user?.name}</p>
              <p className="text-xs text-white/40 truncate">{session?.user?.email}</p>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="w-full flex items-center gap-2 text-sm text-white/40 hover:text-white transition px-3 py-2 rounded-lg hover:bg-white/6"
          >
            <LogOut className="w-4 h-4" />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 ml-60 p-8 min-h-screen">
        {children}
      </main>
    </div>
  )
}

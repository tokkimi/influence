'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard, PlusCircle, List, Wallet, User, MessageCircle,
  Users, Building2, BarChart3, Mail, Search, ArrowLeftRight, Settings,
  ChevronLeft, LogOut, CheckSquare, Briefcase
} from 'lucide-react'

interface NavItem { href: string; label: string; icon: React.ElementType }

function BrandNav() {
  return [
    { href: '/marque/tableau-de-bord', label: 'Tableau de bord', icon: LayoutDashboard },
    { href: '/marque/nouvelle-campagne', label: 'Nouvelle campagne', icon: PlusCircle },
    { href: '/marque/campagnes', label: 'Mes campagnes', icon: List },
    { href: '/marque/portefeuille', label: 'Portefeuille', icon: Wallet },
    { href: '/marque/profil', label: 'Mon profil', icon: User },
  ]
}

function InfluencerNav() {
  return [
    { href: '/influenceur/tableau-de-bord', label: 'Tableau de bord', icon: LayoutDashboard },
    { href: '/influenceur/propositions', label: 'Propositions', icon: CheckSquare },
    { href: '/influenceur/missions', label: 'Mes missions', icon: Briefcase },
    { href: '/influenceur/portefeuille', label: 'Portefeuille', icon: Wallet },
    { href: '/influenceur/profil', label: 'Mon profil', icon: User },
  ]
}

function AdminNav() {
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

  const navItems: NavItem[] = role === 'ADMIN' ? AdminNav() : role === 'BRAND' ? BrandNav() : InfluencerNav()

  const roleLabel = role === 'ADMIN' ? 'Administration' : role === 'BRAND' ? 'Espace Marque' : 'Espace Influenceur'
  const roleColor = role === 'ADMIN' ? 'bg-red-600' : role === 'BRAND' ? 'bg-purple-700' : 'bg-yellow-600'

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col fixed inset-y-0 left-0 z-30">
        {/* Logo */}
        <div className="p-5 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-700 to-yellow-500 flex items-center justify-center">
              <span className="text-white font-bold text-xs">DTT</span>
            </div>
            <span className="font-display font-bold text-sm text-purple-900">Dot The Talents</span>
          </Link>
          <div className={`mt-3 inline-flex items-center text-white text-xs font-medium px-2 py-1 rounded-full ${roleColor}`}>
            {roleLabel}
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                      active
                        ? 'bg-purple-50 text-purple-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    )}
                  >
                    <item.icon className={cn('w-4 h-4', active ? 'text-purple-600' : 'text-gray-400')} />
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* User + logout */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-sm">
              {session?.user?.name?.[0] || '?'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{session?.user?.name}</p>
              <p className="text-xs text-gray-400 truncate">{session?.user?.email}</p>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="w-full flex items-center gap-2 text-sm text-gray-500 hover:text-red-600 transition px-3 py-2 rounded-lg hover:bg-red-50"
          >
            <LogOut className="w-4 h-4" />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  )
}

"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { LayoutDashboard, Megaphone, PlusCircle, Wallet, User, LogOut, Star, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/marque/tableau-de-bord", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/marque/nouvelle-campagne", label: "Nouvelle campagne", icon: PlusCircle },
  { href: "/marque/campagnes", label: "Mes campagnes", icon: Megaphone },
  { href: "/marque/portefeuille", label: "Portefeuille", icon: Wallet },
  { href: "/marque/profil", label: "Profil", icon: User },
]

export default function BrandSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col">
      <div className="p-6 border-b border-gray-100">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-800 to-purple-600 rounded-lg flex items-center justify-center">
            <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
          </div>
          <span className="font-bold text-purple-800">Dot The Talents</span>
        </Link>
        <div className="mt-3 text-xs text-gray-500 bg-amber-50 text-amber-700 rounded-md px-2 py-1 inline-block font-medium">
          Espace Marque
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-purple-50 text-purple-800"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon className={cn("w-5 h-5", active ? "text-purple-800" : "text-gray-400")} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors w-full"
        >
          <LogOut className="w-5 h-5 text-gray-400" />
          Déconnexion
        </button>
      </div>
    </aside>
  )
}

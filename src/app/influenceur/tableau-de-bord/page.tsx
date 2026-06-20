import { formatCurrency, formatNumber } from '@/lib/utils'
import { mockProposals } from '@/lib/mock-data'
import Link from 'next/link'
import { Wallet, Star, Briefcase, TrendingUp, ArrowRight } from 'lucide-react'

export default function InfluenceurDashboard() {
  const balance = 1250
  const proposals = mockProposals?.filter((p: { status: string }) => p.status === 'PENDING') || []

  const stats = [
    { label: 'Portefeuille', value: formatCurrency(balance), icon: Wallet, color: 'text-purple-700', bg: 'bg-purple-50' },
    { label: 'Propositions', value: '2', icon: Star, color: 'text-yellow-700', bg: 'bg-yellow-50' },
    { label: 'Missions actives', value: '1', icon: Briefcase, color: 'text-blue-700', bg: 'bg-blue-50' },
    { label: 'Revenus ce mois', value: formatCurrency(400), icon: TrendingUp, color: 'text-green-700', bg: 'bg-green-50' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="text-gray-500">Bienvenue, Marie Dupont 👋</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100">
            <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Propositions en attente */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-semibold text-gray-900">Propositions en attente</h2>
          <Link href="/influenceur/propositions" className="text-sm text-purple-700 hover:underline flex items-center gap-1">
            Voir tout <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="space-y-3">
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <p className="font-medium text-gray-900">Lancement Rouge à Lèvres Collection Automne</p>
              <span className="text-green-600 font-semibold">{formatCurrency(800)}</span>
            </div>
            <p className="text-sm text-gray-500 mb-3">L&apos;Oréal Paris · Beauté · France</p>
            <div className="flex gap-2">
              <Link href="/influenceur/propositions" className="bg-purple-700 text-white px-4 py-1.5 rounded-full text-xs font-medium hover:bg-purple-800 transition">
                Voir le brief
              </Link>
            </div>
          </div>
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <p className="font-medium text-gray-900">Campagne Running Hiver 2024</p>
              <span className="text-green-600 font-semibold">{formatCurrency(400)}</span>
            </div>
            <p className="text-sm text-gray-500 mb-3">Nike France · Sport · France</p>
            <div className="flex gap-2">
              <Link href="/influenceur/propositions" className="bg-purple-700 text-white px-4 py-1.5 rounded-full text-xs font-medium hover:bg-purple-800 transition">
                Voir le brief
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick access */}
      <div className="grid md:grid-cols-2 gap-4">
        <Link href="/influenceur/profil" className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition group">
          <p className="font-semibold text-gray-900 mb-1 group-hover:text-purple-700">Compléter mon profil →</p>
          <p className="text-sm text-gray-400">Plus votre profil est complet, plus vous recevez de propositions</p>
        </Link>
        <Link href="/influenceur/portefeuille" className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition group">
          <p className="font-semibold text-gray-900 mb-1 group-hover:text-purple-700">Mon portefeuille →</p>
          <p className="text-sm text-gray-400">Solde disponible : {formatCurrency(balance)}</p>
        </Link>
      </div>
    </div>
  )
}

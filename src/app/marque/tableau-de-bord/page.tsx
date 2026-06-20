import { mockCampaigns, mockInfluencers } from '@/lib/mock-data'
import { formatCurrency, formatNumber } from '@/lib/utils'
import { TrendingUp, Users, Wallet, BarChart3, Plus, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function MarqueDashboard() {
  const myCampaigns = mockCampaigns.filter(c => c.brandProfileId === 'brand-1')
  const activeCampaigns = myCampaigns.filter(c => c.status === 'ACTIVE')
  const balance = 3200

  const stats = [
    { label: 'Portefeuille', value: formatCurrency(balance), icon: Wallet, color: 'text-purple-700', bg: 'bg-purple-50' },
    { label: 'Campagnes actives', value: activeCampaigns.length.toString(), icon: BarChart3, color: 'text-blue-700', bg: 'bg-blue-50' },
    { label: 'Influenceurs assignés', value: '3', icon: Users, color: 'text-green-700', bg: 'bg-green-50' },
    { label: 'ROI moyen', value: '+287%', icon: TrendingUp, color: 'text-yellow-700', bg: 'bg-yellow-50' },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="text-gray-500">Bienvenue, Maison Élégance 👋</p>
        </div>
        <Link
          href="/marque/nouvelle-campagne"
          className="inline-flex items-center gap-2 bg-purple-700 text-white px-5 py-2.5 rounded-full font-medium hover:bg-purple-800 transition text-sm"
        >
          <Plus className="w-4 h-4" />
          Nouvelle campagne
        </Link>
      </div>

      {/* Stats */}
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

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Campaigns */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-gray-900">Mes campagnes</h2>
            <Link href="/marque/campagnes" className="text-sm text-purple-700 hover:underline flex items-center gap-1">
              Voir tout <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {myCampaigns.map(camp => (
              <div key={camp.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-medium text-sm text-gray-900">{camp.title}</p>
                  <p className="text-xs text-gray-400">{camp.influencersCount} influenceurs · Budget restant: {formatCurrency(camp.budgetRemaining)}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  camp.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {camp.status === 'ACTIVE' ? 'Active' : 'En attente'}
                </span>
              </div>
            ))}
            {myCampaigns.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-6">Aucune campagne. Créez votre première campagne !</p>
            )}
          </div>
        </div>

        {/* Influenceurs assignés */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-gray-900">Influenceurs assignés</h2>
          </div>
          <div className="space-y-3">
            {mockInfluencers.slice(0, 3).map(inf => (
              <div key={inf.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <img src={inf.photo} alt={inf.name} className="w-10 h-10 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-gray-900">{inf.name}</p>
                  <p className="text-xs text-gray-400">{formatNumber(inf.followers)} abonnés · {inf.engagementRate}%</p>
                </div>
                <Link href={`/chat/demo`} className="text-xs text-purple-700 font-medium hover:underline">
                  Chat
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

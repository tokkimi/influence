import { formatCurrency, formatNumber } from '@/lib/utils'
import { mockInfluencers, mockCampaigns } from '@/lib/mock-data'
import { Users, Building2, BarChart3, DollarSign, TrendingUp, Clock } from 'lucide-react'

export default function AdminDashboard() {
  const stats = [
    { label: 'Influenceurs', value: '5 420', sub: '+42 ce mois', icon: Users, color: 'text-purple-700', bg: 'bg-purple-50' },
    { label: 'Marques', value: '847', sub: '+12 ce mois', icon: Building2, color: 'text-blue-700', bg: 'bg-blue-50' },
    { label: 'Campagnes actives', value: '156', sub: '23 en attente', icon: BarChart3, color: 'text-green-700', bg: 'bg-green-50' },
    { label: 'Revenus plateforme', value: '42 800€', sub: '+18% vs mois dernier', icon: DollarSign, color: 'text-yellow-700', bg: 'bg-yellow-50' },
  ]

  const recentCampaigns = mockCampaigns.slice(0, 5)

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Administration</h1>
        <p className="text-gray-500">Vue d&apos;ensemble de la plateforme Dot The Talents</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100">
            <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-xs text-gray-400 mt-1">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent campaigns */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-900 mb-5">Campagnes récentes</h2>
          <div className="space-y-3">
            {recentCampaigns.map(camp => (
              <div key={camp.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-medium text-sm text-gray-900 line-clamp-1">{camp.title}</p>
                  <p className="text-xs text-gray-400">{camp.brandName} · {formatCurrency(camp.budget)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${camp.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {camp.status === 'ACTIVE' ? 'Active' : 'En attente'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent influencers */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-900 mb-5">Influenceurs récents</h2>
          <div className="space-y-3">
            {mockInfluencers.slice(0, 5).map(inf => (
              <div key={inf.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <img src={inf.photo} alt={inf.name} className="w-9 h-9 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-gray-900">{inf.name}</p>
                  <p className="text-xs text-gray-400">{formatNumber(inf.followers)} abonnés · {inf.category}</p>
                </div>
                <div className="flex items-center gap-1">
                  {inf.isVerified ? (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Vérifié</span>
                  ) : (
                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">En attente</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

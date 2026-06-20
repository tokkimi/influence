import { mockCampaigns } from '@/lib/mock-data'
import { formatCurrency } from '@/lib/utils'
import Link from 'next/link'
import { Plus, Users, Calendar } from 'lucide-react'

export default function CampagnesPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Mes campagnes</h1>
        <Link href="/marque/nouvelle-campagne" className="inline-flex items-center gap-2 bg-purple-700 text-white px-5 py-2.5 rounded-full font-medium hover:bg-purple-800 transition text-sm">
          <Plus className="w-4 h-4" />
          Nouvelle campagne
        </Link>
      </div>

      <div className="space-y-4">
        {mockCampaigns.map(camp => (
          <div key={camp.id} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">{camp.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{camp.description}</p>
              </div>
              <span className={`text-xs px-3 py-1 rounded-full font-medium flex-shrink-0 ml-4 ${
                camp.status === 'ACTIVE' ? 'bg-green-100 text-green-700' :
                camp.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                'bg-gray-100 text-gray-600'
              }`}>
                {camp.status === 'ACTIVE' ? '🟢 Active' : camp.status === 'PENDING' ? '🟡 En attente' : camp.status}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-400">Budget total</p>
                <p className="font-semibold text-gray-900">{formatCurrency(camp.budget)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Budget restant</p>
                <p className="font-semibold text-green-600">{formatCurrency(camp.budgetRemaining)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Influenceurs</p>
                <p className="font-semibold text-gray-900">{camp.influencersCount}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Code promo</p>
                <p className="font-semibold text-gray-900">{camp.promoCode || '—'}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {camp.startDate} → {camp.endDate}</span>
                <span>{camp.targetCategory} · {camp.targetCountries?.join(', ')}</span>
              </div>
              <Link href={`/marque/campagnes/${camp.id}`} className="text-sm text-purple-700 font-medium hover:underline">
                Voir détails →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

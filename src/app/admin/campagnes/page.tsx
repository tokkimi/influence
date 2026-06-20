import { mockCampaigns, mockInfluencers } from '@/lib/mock-data'
import { formatCurrency } from '@/lib/utils'
import Link from 'next/link'
import { Eye } from 'lucide-react'

export default function AdminCampagnes() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Campagnes</h1>
        <p className="text-gray-500">{mockCampaigns.length} campagnes</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <tr>
              <th className="text-left px-4 py-3">Campagne</th>
              <th className="text-left px-4 py-3">Marque</th>
              <th className="text-left px-4 py-3">Budget</th>
              <th className="text-left px-4 py-3">Influenceurs</th>
              <th className="text-left px-4 py-3">Statut</th>
              <th className="text-left px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {mockCampaigns.map(camp => (
              <tr key={camp.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <p className="font-medium text-sm text-gray-900">{camp.title}</p>
                  <p className="text-xs text-gray-400">{camp.startDate} → {camp.endDate}</p>
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">{camp.brandName}</td>
                <td className="px-4 py-3">
                  <p className="text-sm font-medium text-gray-900">{formatCurrency(camp.budget)}</p>
                  <p className="text-xs text-gray-400">Restant: {formatCurrency(camp.budgetRemaining)}</p>
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">{camp.influencersCount}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    camp.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>{camp.status === 'ACTIVE' ? 'Active' : 'En attente'}</span>
                </td>
                <td className="px-4 py-3">
                  <Link href={`/admin/campagnes/${camp.id}`} className="p-1.5 hover:bg-gray-100 rounded-lg transition inline-block">
                    <Eye className="w-4 h-4 text-gray-500" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

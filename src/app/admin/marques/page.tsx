import { Eye, CheckCircle } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

const brands = [
  { id: 'b1', name: 'L\'Oréal Paris', sector: 'Beauté', campaigns: 3, totalSpent: 15000, isVerified: true, createdAt: '12/01/2024' },
  { id: 'b2', name: 'Nike France', sector: 'Sport', campaigns: 2, totalSpent: 25000, isVerified: true, createdAt: '08/03/2024' },
  { id: 'b3', name: 'Maison Élégance', sector: 'Mode', campaigns: 1, totalSpent: 5000, isVerified: true, createdAt: '01/10/2024' },
  { id: 'b4', name: 'TechStart', sector: 'Tech', campaigns: 0, totalSpent: 0, isVerified: false, createdAt: '15/11/2024' },
]

export default function AdminMarques() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Marques</h1>
        <p className="text-gray-500">{brands.length} marques inscrites</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <tr>
              <th className="text-left px-4 py-3">Marque</th>
              <th className="text-left px-4 py-3">Secteur</th>
              <th className="text-left px-4 py-3">Campagnes</th>
              <th className="text-left px-4 py-3">Total dépensé</th>
              <th className="text-left px-4 py-3">Statut</th>
              <th className="text-left px-4 py-3">Inscrit le</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {brands.map(b => (
              <tr key={b.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-xs">
                      {b.name.split(' ').map(w => w[0]).join('').slice(0,2)}
                    </div>
                    <span className="font-medium text-sm text-gray-900">{b.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{b.sector}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{b.campaigns}</td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{formatCurrency(b.totalSpent)}</td>
                <td className="px-4 py-3">
                  {b.isVerified ? (
                    <span className="flex items-center gap-1 text-xs text-green-600"><CheckCircle className="w-3 h-3" />Actif</span>
                  ) : (
                    <span className="text-xs text-yellow-600">En attente</span>
                  )}
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">{b.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

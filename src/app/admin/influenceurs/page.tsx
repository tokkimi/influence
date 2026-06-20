'use client'

import { useState } from 'react'
import { mockInfluencers } from '@/lib/mock-data'
import { formatNumber } from '@/lib/utils'
import { CheckCircle, XCircle, Trash2, Eye, Search } from 'lucide-react'

export default function AdminInfluenceurs() {
  const [influencers, setInfluencers] = useState(mockInfluencers.map(i => ({...i})))
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('ALL')

  const certify = (id: string) => setInfluencers(prev => prev.map(i => i.id === id ? {...i, isVerified: true} : i))
  const deactivate = (id: string) => setInfluencers(prev => prev.map(i => i.id === id ? {...i, isActive: false} : i))
  const remove = (id: string) => setInfluencers(prev => prev.filter(i => i.id !== id))

  const filtered = influencers.filter(i => {
    const matchSearch = i.name.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'ALL' || (filter === 'VERIFIED' && i.isVerified) || (filter === 'PENDING' && !i.isVerified)
    return matchSearch && matchFilter
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Influenceurs</h1>
          <p className="text-gray-500">{influencers.length} profils au total</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {/* Filters */}
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Rechercher un influenceur..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            />
          </div>
          <div className="flex gap-2">
            {['ALL', 'VERIFIED', 'PENDING'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition ${filter === f ? 'bg-purple-700 text-white' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                {f === 'ALL' ? 'Tous' : f === 'VERIFIED' ? 'Certifiés' : 'En attente'}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <tr>
                <th className="text-left px-4 py-3">Influenceur</th>
                <th className="text-left px-4 py-3">Catégorie</th>
                <th className="text-left px-4 py-3">Abonnés</th>
                <th className="text-left px-4 py-3">Engagement</th>
                <th className="text-left px-4 py-3">Statut</th>
                <th className="text-left px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(inf => (
                <tr key={inf.id} className={`hover:bg-gray-50 ${!inf.isActive ? 'opacity-50' : ''}`}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={inf.photo} alt={inf.name} className="w-9 h-9 rounded-full object-cover" />
                      <div>
                        <p className="font-medium text-sm text-gray-900">{inf.name}</p>
                        <p className="text-xs text-gray-400">{inf.country}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      inf.category === 'INTERNATIONAL' ? 'bg-purple-100 text-purple-700' :
                      inf.category === 'MACRO' ? 'bg-blue-100 text-blue-700' :
                      'bg-green-100 text-green-700'
                    }`}>{inf.category}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">{formatNumber(inf.followers)}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{inf.engagementRate}%</td>
                  <td className="px-4 py-3">
                    {inf.isVerified ? (
                      <span className="flex items-center gap-1 text-xs text-green-600"><CheckCircle className="w-3 h-3" />Certifié</span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs text-yellow-600"><XCircle className="w-3 h-3" />En attente</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <a href={`/influenceur/${inf.id}`} target="_blank" className="p-1.5 hover:bg-gray-100 rounded-lg transition" title="Voir profil">
                        <Eye className="w-4 h-4 text-gray-500" />
                      </a>
                      {!inf.isVerified && (
                        <button onClick={() => certify(inf.id)} className="p-1.5 hover:bg-green-50 rounded-lg transition text-green-600" title="Certifier">
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                      <button onClick={() => deactivate(inf.id)} className="p-1.5 hover:bg-yellow-50 rounded-lg transition text-yellow-600" title="Exclure">
                        <XCircle className="w-4 h-4" />
                      </button>
                      <button onClick={() => remove(inf.id)} className="p-1.5 hover:bg-red-50 rounded-lg transition text-red-500" title="Supprimer">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

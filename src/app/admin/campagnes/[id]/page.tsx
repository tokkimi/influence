'use client'

import { useState } from 'react'
import { mockCampaigns, mockInfluencers } from '@/lib/mock-data'
import { formatCurrency, formatNumber } from '@/lib/utils'
import { CheckCircle, XCircle, UserPlus } from 'lucide-react'
import Link from 'next/link'

export default function AdminCampagneDetail({ params }: { params: { id: string } }) {
  const camp = mockCampaigns.find(c => c.id === params.id) || mockCampaigns[0]
  const [assignments, setAssignments] = useState<Record<string, 'assigned' | 'excluded' | null>>({})

  const assign = (id: string) => setAssignments(a => ({...a, [id]: 'assigned'}))
  const exclude = (id: string) => setAssignments(a => ({...a, [id]: 'excluded'}))

  // Matching influencers based on campaign category
  const matchingInfluencers = mockInfluencers.filter(
    i => !camp.targetCategory || i.category === camp.targetCategory
  )

  return (
    <div>
      <Link href="/admin/campagnes" className="text-sm text-purple-700 hover:underline mb-4 block">← Retour aux campagnes</Link>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{camp.title}</h1>
            <p className="text-gray-500">{camp.brandName}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${camp.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
            {camp.status === 'ACTIVE' ? '🟢 Active' : '🟡 En attente'}
          </span>
        </div>
        <p className="text-gray-600 mb-4">{camp.description}</p>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div><p className="text-gray-400">Budget</p><p className="font-semibold">{formatCurrency(camp.budget)}</p></div>
          <div><p className="text-gray-400">Budget restant</p><p className="font-semibold text-green-600">{formatCurrency(camp.budgetRemaining)}</p></div>
          <div><p className="text-gray-400">Catégorie cible</p><p className="font-semibold">{camp.targetCategory || 'Toutes'}</p></div>
          <div><p className="text-gray-400">Code promo</p><p className="font-semibold">{camp.promoCode || '—'}</p></div>
          <div><p className="text-gray-400">Pays</p><p className="font-semibold">{camp.targetCountries?.join(', ') || '—'}</p></div>
          <div><p className="text-gray-400">Validation</p><p className="font-semibold">{camp.autoAssign ? '🤖 Auto' : '✋ Manuelle'}</p></div>
        </div>
      </div>

      {/* Matching influencers */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="font-semibold text-gray-900 mb-2">Profils correspondants ({matchingInfluencers.length})</h2>
        <p className="text-sm text-gray-500 mb-5">Sélectionnez les influenceurs à missionner pour cette campagne</p>

        <div className="space-y-3">
          {matchingInfluencers.map(inf => {
            const status = assignments[inf.id]
            return (
              <div key={inf.id} className={`flex items-center gap-4 p-4 rounded-xl border transition ${
                status === 'assigned' ? 'bg-green-50 border-green-200' :
                status === 'excluded' ? 'bg-gray-50 border-gray-200 opacity-50' :
                'border-gray-100 hover:border-purple-200'
              }`}>
                <img src={inf.photo} alt={inf.name} className="w-12 h-12 rounded-full object-cover" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{inf.name}</p>
                  <p className="text-xs text-gray-500">{formatNumber(inf.followers)} abonnés · {inf.engagementRate}% · {inf.country}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {(inf.interests as string[]).slice(0,3).map((i, idx) => (
                      <span key={idx} className="text-xs bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full">{i}</span>
                    ))}
                  </div>
                </div>
                <p className="text-sm font-semibold text-gray-700 text-right">
                  {inf.ratePost}€<br />
                  <span className="text-xs text-gray-400 font-normal">par post</span>
                </p>
                <div className="flex gap-2">
                  {status === 'assigned' ? (
                    <span className="text-xs bg-green-100 text-green-700 px-3 py-1.5 rounded-full font-medium flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />Missionné
                    </span>
                  ) : status === 'excluded' ? (
                    <span className="text-xs bg-gray-100 text-gray-500 px-3 py-1.5 rounded-full font-medium">Exclu</span>
                  ) : (
                    <>
                      <button onClick={() => assign(inf.id)} className="flex items-center gap-1 bg-purple-700 text-white px-3 py-1.5 rounded-full text-xs font-medium hover:bg-purple-800 transition">
                        <UserPlus className="w-3 h-3" />
                        Missionner
                      </button>
                      <button onClick={() => exclude(inf.id)} className="flex items-center gap-1 border border-gray-200 text-gray-500 px-3 py-1.5 rounded-full text-xs font-medium hover:bg-gray-50 transition">
                        <XCircle className="w-3 h-3" />
                        Exclure
                      </button>
                    </>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {Object.values(assignments).some(v => v === 'assigned') && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
            <p className="text-green-800 font-medium text-sm">
              ✅ {Object.values(assignments).filter(v => v === 'assigned').length} influenceur(s) missionné(s). Les briefs sont envoyés automatiquement.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

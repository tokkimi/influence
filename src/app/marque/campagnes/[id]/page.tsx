import { mockCampaigns, mockInfluencers } from '@/lib/mock-data'
import { formatCurrency, formatNumber } from '@/lib/utils'
import Link from 'next/link'
import { MessageCircle, CheckCircle, XCircle } from 'lucide-react'

export default function CampagneDetail({ params }: { params: { id: string } }) {
  const camp = mockCampaigns.find(c => c.id === params.id) || mockCampaigns[0]
  const assignedInfluencers = mockInfluencers.slice(0, camp.influencersCount || 2)

  return (
    <div>
      <div className="mb-6">
        <Link href="/marque/campagnes" className="text-sm text-orange-500 hover:underline mb-2 block">← Retour aux campagnes</Link>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">{camp.title}</h1>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${camp.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
            {camp.status === 'ACTIVE' ? '🟢 Active' : '🟡 En attente'}
          </span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-[rgba(255,255,255,0.05)] rounded-2xl border border-white/8 p-6">
          <h2 className="font-semibold text-white mb-4">Détails de la campagne</h2>
          <p className="text-white/55 mb-4">{camp.description}</p>
          <div className="grid grid-cols-2 gap-4">
            <div><p className="text-xs text-white/30">Budget total</p><p className="font-semibold">{formatCurrency(camp.budget)}</p></div>
            <div><p className="text-xs text-white/30">Budget restant</p><p className="font-semibold text-green-600">{formatCurrency(camp.budgetRemaining)}</p></div>
            <div><p className="text-xs text-white/30">Dates</p><p className="font-semibold text-sm">{camp.startDate} → {camp.endDate}</p></div>
            <div><p className="text-xs text-white/30">Code promo</p><p className="font-semibold">{camp.promoCode || '—'}</p></div>
            <div><p className="text-xs text-white/30">Catégorie cible</p><p className="font-semibold">{camp.targetCategory || 'Toutes'}</p></div>
            <div><p className="text-xs text-white/30">Validation</p><p className="font-semibold">{camp.autoAssign ? '🤖 Automatique' : '✋ Manuelle'}</p></div>
          </div>
        </div>
        <div className="bg-[rgba(255,255,255,0.05)] rounded-2xl border border-white/8 p-6">
          <h2 className="font-semibold text-white mb-4">Progression du budget</h2>
          <div className="mb-3">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-white/40">Utilisé</span>
              <span className="font-medium">{Math.round(((camp.budget - camp.budgetRemaining) / camp.budget) * 100)}%</span>
            </div>
            <div className="w-full bg-white/6 rounded-full h-3">
              <div
                className="bg-orange-500 h-3 rounded-full"
                style={{ width: `${((camp.budget - camp.budgetRemaining) / camp.budget) * 100}%` }}
              />
            </div>
          </div>
          <p className="text-sm text-white/40">{formatCurrency(camp.budget - camp.budgetRemaining)} sur {formatCurrency(camp.budget)}</p>
        </div>
      </div>

      {/* Influenceurs */}
      <div className="bg-[rgba(255,255,255,0.05)] rounded-2xl border border-white/8 p-6">
        <h2 className="font-semibold text-white mb-5">Influenceurs assignés ({assignedInfluencers.length})</h2>
        <div className="space-y-3">
          {assignedInfluencers.map(inf => (
            <div key={inf.id} className="flex items-center gap-4 p-4 bg-white/3 rounded-xl">
              <img src={inf.photo} alt={inf.name} className="w-12 h-12 rounded-full object-cover" />
              <div className="flex-1">
                <p className="font-medium text-white">{inf.name}</p>
                <p className="text-xs text-white/40">{formatNumber(inf.followers)} abonnés · {inf.engagementRate}% engagement · {inf.country}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Accepté</span>
                <Link href="/chat/demo" className="flex items-center gap-1 text-xs text-orange-500 font-medium hover:underline">
                  <MessageCircle className="w-3 h-3" />
                  Chat
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

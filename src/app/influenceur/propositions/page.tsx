'use client'

import { useState } from 'react'
import { formatCurrency } from '@/lib/utils'
import { Check, X, FileText } from 'lucide-react'

const proposals = [
  {
    id: 'prop_1',
    campaignTitle: "Lancement Rouge à Lèvres Collection Automne",
    brandName: "L'Oréal Paris",
    brandLogo: "LO",
    payment: 800,
    status: 'PENDING',
    promoCode: 'LOREAL20',
    websiteUrl: 'https://loreal.fr',
    description: 'Nous recherchons des créateurs de contenu beauté pour promouvoir notre nouvelle collection de rouges à lèvres automne/hiver 2024. 1 post Instagram + 3 stories minimum.',
    deadline: '30/11/2024',
  },
  {
    id: 'prop_2',
    campaignTitle: "Campagne Running Hiver 2024",
    brandName: "Nike France",
    brandLogo: "NK",
    payment: 400,
    status: 'PENDING',
    promoCode: 'NIKE15',
    websiteUrl: 'https://nike.fr',
    description: 'Mise en avant de la nouvelle collection running Nike pour l\'hiver. 1 Reel Instagram minimum + story avec lien swipe-up.',
    deadline: '31/12/2024',
  },
  {
    id: 'prop_3',
    campaignTitle: "Campagne Mode Automne",
    brandName: "Maison Élégance",
    brandLogo: "ME",
    payment: 400,
    status: 'ACCEPTED',
    promoCode: 'MAISON10',
    websiteUrl: 'https://maison-elegance.fr',
    description: 'Campagne de mise en avant de la collection automne.',
    deadline: '15/12/2024',
  },
]

export default function PropositionsPage() {
  const [statuses, setStatuses] = useState<Record<string, string>>(
    Object.fromEntries(proposals.map(p => [p.id, p.status]))
  )
  const [selected, setSelected] = useState<string | null>(null)

  const accept = (id: string) => setStatuses(s => ({...s, [id]: 'ACCEPTED'}))
  const reject = (id: string) => setStatuses(s => ({...s, [id]: 'REJECTED'}))

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Propositions de campagnes</h1>

      <div className="space-y-4">
        {proposals.map(p => {
          const status = statuses[p.id]
          return (
            <div key={p.id} className={`bg-white rounded-2xl border p-6 transition ${
              status === 'PENDING' ? 'border-yellow-200' : status === 'ACCEPTED' ? 'border-green-200' : 'border-gray-100 opacity-60'
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-sm">
                    {p.brandLogo}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{p.campaignTitle}</p>
                    <p className="text-sm text-gray-500">{p.brandName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-green-600">{formatCurrency(p.payment)}</p>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                    status === 'ACCEPTED' ? 'bg-green-100 text-green-700' :
                    'bg-gray-100 text-gray-500'
                  }`}>
                    {status === 'PENDING' ? '⏳ En attente' : status === 'ACCEPTED' ? '✅ Acceptée' : '❌ Refusée'}
                  </span>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4">{p.description}</p>

              <div className="grid grid-cols-3 gap-3 mb-4 text-sm">
                <div className="bg-gray-50 rounded-lg p-2">
                  <p className="text-xs text-gray-400">Code promo</p>
                  <p className="font-medium text-purple-700">{p.promoCode}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-2">
                  <p className="text-xs text-gray-400">Deadline</p>
                  <p className="font-medium">{p.deadline}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-2">
                  <p className="text-xs text-gray-400">Site</p>
                  <p className="font-medium text-blue-600 truncate text-xs">{p.websiteUrl}</p>
                </div>
              </div>

              {status === 'PENDING' && (
                <div className="flex gap-3">
                  <button onClick={() => accept(p.id)} className="flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-green-700 transition">
                    <Check className="w-4 h-4" />
                    Accepter la mission
                  </button>
                  <button onClick={() => reject(p.id)} className="flex items-center gap-2 border border-gray-200 text-gray-600 px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-50 transition">
                    <X className="w-4 h-4" />
                    Refuser
                  </button>
                </div>
              )}
              {status === 'ACCEPTED' && (
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 bg-purple-700 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-purple-800 transition">
                    <FileText className="w-4 h-4" />
                    Voir le brief complet
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

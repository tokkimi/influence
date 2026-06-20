'use client'

import { useState } from 'react'
import { formatCurrency } from '@/lib/utils'
import { Link2, CheckCircle, Clock } from 'lucide-react'

const missions = [
  {
    id: 'm1',
    campaignTitle: 'Campagne Mode Automne',
    brandName: 'Maison Élégance',
    payment: 400,
    status: 'IN_PROGRESS',
    promoCode: 'MAISON10',
    brief: '1 post Instagram mettant en avant notre nouvelle collection automne. Utiliser le code promo dans la caption.',
    deadline: '15/12/2024',
    postUrl: '',
    paymentReleased: false,
  },
]

export default function MissionsPage() {
  const [postUrls, setPostUrls] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({})

  const submitPost = (id: string) => {
    if (!postUrls[id]) return
    setSubmitted(s => ({...s, [id]: true}))
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Mes missions</h1>

      {missions.map(m => (
        <div key={m.id} className="bg-white rounded-2xl border border-gray-100 p-6 mb-4">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-semibold text-gray-900">{m.campaignTitle}</h3>
              <p className="text-sm text-gray-500">{m.brandName}</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-green-600">{formatCurrency(m.payment)}</p>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">En cours</span>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <p className="text-sm font-medium text-gray-700 mb-1">Brief</p>
            <p className="text-sm text-gray-600">{m.brief}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-purple-50 rounded-lg p-3">
              <p className="text-xs text-gray-400">Code promo à transmettre</p>
              <p className="font-bold text-purple-700">{m.promoCode}</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-3">
              <p className="text-xs text-gray-400">Deadline de publication</p>
              <p className="font-bold text-yellow-700">{m.deadline}</p>
            </div>
          </div>

          {submitted[m.id] ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium text-green-800">Publication soumise avec succès !</p>
                <p className="text-sm text-green-600">Votre paiement de {formatCurrency(m.payment)} sera disponible après validation.</p>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Link2 className="w-4 h-4" />
                Soumettre le lien de publication
              </p>
              <div className="flex gap-3">
                <input
                  type="url"
                  value={postUrls[m.id] || ''}
                  onChange={e => setPostUrls(p => ({...p, [m.id]: e.target.value}))}
                  placeholder="https://instagram.com/p/..."
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                />
                <button
                  onClick={() => submitPost(m.id)}
                  disabled={!postUrls[m.id]}
                  className="bg-purple-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-purple-800 transition disabled:opacity-40"
                >
                  Valider
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                <Clock className="w-3 h-3 inline mr-1" />
                Le paiement est débloqué dès validation de votre publication
              </p>
            </div>
          )}
        </div>
      ))}

      {missions.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <p>Aucune mission en cours. Consultez vos propositions !</p>
        </div>
      )}
    </div>
  )
}

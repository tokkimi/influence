'use client'

import { useState } from 'react'
import { formatCurrency } from '@/lib/utils'
import { Wallet, Plus, ArrowDownLeft } from 'lucide-react'

const transactions = [
  { id: 1, type: 'DEPOSIT', amount: 5000, desc: 'Rechargement portefeuille', date: '01/10/2024' },
  { id: 2, type: 'CAMPAIGN_PAYMENT', amount: -1800, desc: 'Paiement campagne: Mode Automne', date: '15/10/2024' },
  { id: 3, type: 'CAMPAIGN_PAYMENT', amount: -800, desc: 'Paiement influenceur: Sofia Martini', date: '20/10/2024' },
  { id: 4, type: 'DEPOSIT', amount: 3000, desc: 'Rechargement portefeuille', date: '25/10/2024' },
]

export default function PortefeuilleMarque() {
  const [showRecharge, setShowRecharge] = useState(false)
  const [amount, setAmount] = useState('')
  const balance = 5400

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Mon portefeuille</h1>

      {/* Balance */}
      <div className="bg-gradient-to-br from-purple-700 to-purple-900 rounded-2xl p-8 text-white mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Wallet className="w-6 h-6 text-purple-300" />
          <span className="text-purple-300">Solde disponible</span>
        </div>
        <p className="text-5xl font-bold mb-2">{formatCurrency(balance)}</p>
        <p className="text-purple-300 text-sm">Utilisable pour vos campagnes d&apos;influence</p>
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => setShowRecharge(!showRecharge)}
            className="flex items-center gap-2 bg-yellow-400 text-gray-900 px-5 py-2.5 rounded-full font-medium hover:bg-yellow-300 transition text-sm"
          >
            <Plus className="w-4 h-4" />
            Recharger
          </button>
        </div>
      </div>

      {/* Recharge form */}
      {showRecharge && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
          <h2 className="font-semibold text-gray-900 mb-4">Recharger mon portefeuille</h2>
          <div className="flex gap-3">
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="Montant en €"
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            />
            <button className="bg-purple-700 text-white px-6 py-3 rounded-xl font-medium hover:bg-purple-800 transition text-sm">
              Payer par carte
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2">Paiement sécurisé · Disponible immédiatement</p>
        </div>
      )}

      {/* Transactions */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="font-semibold text-gray-900 mb-5">Historique des transactions</h2>
        <div className="space-y-3">
          {transactions.map(tx => (
            <div key={tx.id} className="flex items-center gap-4 py-3 border-b border-gray-50 last:border-0">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${tx.amount > 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                {tx.amount > 0 ? <ArrowDownLeft className="w-4 h-4 text-green-600" /> : <ArrowDownLeft className="w-4 h-4 text-red-600 rotate-180" />}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{tx.desc}</p>
                <p className="text-xs text-gray-400">{tx.date}</p>
              </div>
              <p className={`font-semibold ${tx.amount > 0 ? 'text-green-600' : 'text-red-500'}`}>
                {tx.amount > 0 ? '+' : ''}{formatCurrency(tx.amount)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

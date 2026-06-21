'use client'

import { useState } from 'react'
import { formatCurrency } from '@/lib/utils'
import { Wallet, ArrowDownLeft, ArrowUpRight, CreditCard, Link } from 'lucide-react'

const transactions = [
  { id: 1, type: 'CAMPAIGN_PAYMENT', amount: 400, desc: 'Rémunération: Campagne Mode Automne', date: '20/10/2024' },
  { id: 2, type: 'WITHDRAWAL', amount: -200, desc: 'Virement bancaire', date: '25/10/2024' },
  { id: 3, type: 'COMMISSION', amount: -20, desc: 'Commission plateforme (5%)', date: '20/10/2024' },
]

export default function PortefeuilleInfluenceur() {
  const [showBankForm, setShowBankForm] = useState(false)
  const [showWithdraw, setShowWithdraw] = useState(false)
  const [iban, setIban] = useState('')
  const [amount, setAmount] = useState('')
  const [bankSaved, setBankSaved] = useState(false)
  const [withdrawDone, setWithdrawDone] = useState(false)
  const balance = 1250

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-8">Mon portefeuille</h1>

      {/* Balance */}
      <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl p-8 text-white mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Wallet className="w-6 h-6 text-yellow-100" />
          <span className="text-yellow-100">Solde disponible</span>
        </div>
        <p className="text-5xl font-bold mb-2">{formatCurrency(balance)}</p>
        <p className="text-yellow-100 text-sm mb-6">Disponible pour virement bancaire</p>
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => setShowWithdraw(!showWithdraw)}
            className="flex items-center gap-2 bg-transparent text-yellow-700 px-5 py-2.5 rounded-full font-medium hover:bg-yellow-50 transition text-sm"
          >
            <ArrowUpRight className="w-4 h-4" />
            Virer sur mon compte
          </button>
          <button
            onClick={() => setShowBankForm(!showBankForm)}
            className="flex items-center gap-2 border border-white/40 text-white px-5 py-2.5 rounded-full font-medium hover:bg-transparent/10 transition text-sm"
          >
            <CreditCard className="w-4 h-4" />
            {bankSaved ? 'Modifier mon IBAN' : 'Lier mon compte bancaire'}
          </button>
        </div>
      </div>

      {/* Bank form */}
      {showBankForm && !bankSaved && (
        <div className="bg-transparent rounded-2xl border border-white/8 p-6 mb-6">
          <h2 className="font-semibold text-white mb-4">Lier votre compte bancaire</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-1">IBAN</label>
              <input value={iban} onChange={e => setIban(e.target.value)} placeholder="FR76 3000 6000 0112 3456 7890 189" className="w-full px-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm font-mono" />
            </div>
            <button onClick={() => { setBankSaved(true); setShowBankForm(false) }} className="bg-[#F37021] text-white px-6 py-2.5 rounded-full font-medium hover:opacity-90 transition text-sm">
              Sauvegarder l&apos;IBAN
            </button>
          </div>
        </div>
      )}

      {/* Withdraw form */}
      {showWithdraw && !withdrawDone && (
        <div className="bg-transparent rounded-2xl border border-white/8 p-6 mb-6">
          <h2 className="font-semibold text-white mb-4">Demande de virement</h2>
          {!bankSaved && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 mb-4 text-sm text-yellow-700">
              ⚠️ Liez d&apos;abord votre compte bancaire pour effectuer un virement.
            </div>
          )}
          <div className="flex gap-3">
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Montant en €" max={balance} className="flex-1 px-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm" />
            <button disabled={!bankSaved} onClick={() => setWithdrawDone(true)} className="bg-green-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-700 transition text-sm disabled:opacity-40">
              Virer
            </button>
          </div>
          <p className="text-xs text-white/30 mt-2">Délai de virement : 1-3 jours ouvrés (Pro : 24h)</p>
        </div>
      )}

      {withdrawDone && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 text-green-700 text-sm">
          ✅ Demande de virement de {formatCurrency(Number(amount))} envoyée. Vous recevrez les fonds sous 1-3 jours ouvrés.
        </div>
      )}

      {/* Transactions */}
      <div className="bg-transparent rounded-2xl border border-white/8 p-6">
        <h2 className="font-semibold text-white mb-5">Historique</h2>
        <div className="space-y-3">
          {transactions.map(tx => (
            <div key={tx.id} className="flex items-center gap-4 py-3 border-b border-gray-50 last:border-0">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${tx.amount > 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                {tx.amount > 0 ? <ArrowDownLeft className="w-4 h-4 text-green-600" /> : <ArrowUpRight className="w-4 h-4 text-red-600" />}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{tx.desc}</p>
                <p className="text-xs text-white/30">{tx.date}</p>
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

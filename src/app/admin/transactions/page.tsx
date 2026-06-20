import { formatCurrency } from '@/lib/utils'
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react'

const transactions = [
  { id: 1, user: 'Maison Élégance', type: 'DEPOSIT', amount: 5000, desc: 'Rechargement portefeuille', date: '01/10/2024', role: 'BRAND' },
  { id: 2, user: 'Maison Élégance', type: 'CAMPAIGN_PAYMENT', amount: -1800, desc: 'Paiement campagne: Mode Automne', date: '15/10/2024', role: 'BRAND' },
  { id: 3, user: 'Marie Dupont', type: 'CAMPAIGN_PAYMENT', amount: 400, desc: 'Rémunération: Mode Automne', date: '20/10/2024', role: 'INFLUENCER' },
  { id: 4, user: 'Plateforme DTT', type: 'COMMISSION', amount: 20, desc: 'Commission 5% sur mission', date: '20/10/2024', role: 'PLATFORM' },
  { id: 5, user: 'Marie Dupont', type: 'WITHDRAWAL', amount: -200, desc: 'Virement bancaire', date: '25/10/2024', role: 'INFLUENCER' },
  { id: 6, user: 'Nike France', type: 'DEPOSIT', amount: 25000, desc: 'Rechargement portefeuille', date: '28/10/2024', role: 'BRAND' },
]

export default function AdminTransactions() {
  const total = transactions.reduce((sum, t) => sum + (t.role === 'PLATFORM' ? t.amount : 0), 0)

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
        <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-2 text-sm">
          <span className="text-gray-500">Revenus plateforme : </span>
          <span className="font-bold text-green-700">{formatCurrency(total)}</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <tr>
              <th className="text-left px-4 py-3">Transaction</th>
              <th className="text-left px-4 py-3">Utilisateur</th>
              <th className="text-left px-4 py-3">Rôle</th>
              <th className="text-left px-4 py-3">Montant</th>
              <th className="text-left px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {transactions.map(tx => (
              <tr key={tx.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${tx.amount > 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                      {tx.amount > 0 ? <ArrowDownLeft className="w-4 h-4 text-green-600" /> : <ArrowUpRight className="w-4 h-4 text-red-600" />}
                    </div>
                    <span className="text-sm text-gray-700">{tx.desc}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">{tx.user}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    tx.role === 'BRAND' ? 'bg-purple-100 text-purple-700' :
                    tx.role === 'INFLUENCER' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>{tx.role}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`font-semibold ${tx.amount > 0 ? 'text-green-600' : 'text-red-500'}`}>
                    {tx.amount > 0 ? '+' : ''}{formatCurrency(tx.amount)}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">{tx.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

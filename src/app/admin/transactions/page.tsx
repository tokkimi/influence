'use client'

import { useState } from 'react'
import { formatCurrency } from '@/lib/utils'
import { mockTransactions } from '@/lib/mock-data'

function GlassCard({ children }: { children: React.ReactNode }) {
  return <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1.25rem' }}>{children}</div>
}

const allTx = [
  ...mockTransactions,
  { id: 'tx_5', userId: 'brand_1', type: 'DEPOSIT', amount: 20000, description: 'Rechargement L\'Oréal', createdAt: '2024-09-01' },
  { id: 'tx_6', userId: 'influencer_2', type: 'COMMISSION', amount: 150, description: 'Commission plateforme', createdAt: '2024-10-22' },
  { id: 'tx_7', userId: 'brand_2', type: 'CAMPAIGN_PAYMENT', amount: -5000, description: 'Paiement campagne Nike Running', createdAt: '2024-10-05' },
]

const userMap: Record<string, { name: string; role: string }> = {
  'brand-1': { name: 'Maison Élégance', role: 'Marque' },
  'brand_1': { name: "L'Oréal Paris", role: 'Marque' },
  'brand_2': { name: 'Nike France', role: 'Marque' },
  'influencer-1': { name: 'Sofia Martini', role: 'Influenceur' },
  'influencer_2': { name: 'Lucas Dubois', role: 'Influenceur' },
}

function TypeBadge({ type }: { type: string }) {
  const cfg = type === 'DEPOSIT' ? { bg: 'rgba(48,209,88,0.1)', c: '#30d158', b: 'rgba(48,209,88,0.2)', l: 'Dépôt' }
    : type === 'WITHDRAWAL' ? { bg: 'rgba(255,69,58,0.1)', c: '#ff453a', b: 'rgba(255,69,58,0.2)', l: 'Retrait' }
    : type === 'COMMISSION' ? { bg: 'rgba(243,112,33,0.1)', c: '#F37021', b: 'rgba(243,112,33,0.2)', l: 'Commission' }
    : { bg: 'rgba(10,132,255,0.1)', c: '#0a84ff', b: 'rgba(10,132,255,0.2)', l: 'Campagne' }
  return <span style={{ background: cfg.bg, color: cfg.c, border: `1px solid ${cfg.b}`, borderRadius: '9999px', padding: '0.15rem 0.6rem', fontSize: '0.7rem', fontWeight: 600 }}>{cfg.l}</span>
}

export default function AdminTransactionsPage() {
  const [filter, setFilter] = useState('ALL')

  const filtered = allTx.filter(t => filter === 'ALL' || t.type === filter || (filter === 'CAMPAIGN' && t.type === 'CAMPAIGN_PAYMENT'))

  const totalRevenue = allTx.filter(t => t.type === 'COMMISSION').reduce((s, t) => s + t.amount, 0)
  const totalDeposits = allTx.filter(t => t.type === 'DEPOSIT').reduce((s, t) => s + t.amount, 0)
  const totalPayments = allTx.filter(t => t.type === 'CAMPAIGN_PAYMENT' && t.amount > 0).reduce((s, t) => s + t.amount, 0)
  const totalCommissions = allTx.filter(t => t.type === 'COMMISSION').reduce((s, t) => s + t.amount, 0)

  return (
    <div style={{ color: 'white', padding: '1.5rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>Transactions</h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem' }}>{allTx.length} transactions enregistrées</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
        {[
          { label: 'Revenus plateforme', value: formatCurrency(totalRevenue), color: '#F37021' },
          { label: 'Dépôts marques', value: formatCurrency(totalDeposits), color: '#30d158' },
          { label: 'Paiements influenceurs', value: formatCurrency(totalPayments), color: '#0a84ff' },
          { label: 'Commissions', value: formatCurrency(totalCommissions), color: '#F37021' },
        ].map(s => (
          <GlassCard key={s.label}>
            <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.4rem' }}>{s.label}</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: s.color }}>{s.value}</div>
          </GlassCard>
        ))}
      </div>

      <GlassCard>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          {[['ALL', 'Toutes'], ['DEPOSIT', 'Dépôts'], ['CAMPAIGN', 'Campagnes'], ['WITHDRAWAL', 'Retraits'], ['COMMISSION', 'Commissions']].map(([k, l]) => (
            <button key={k} onClick={() => setFilter(k)} style={filter === k
              ? { background: 'rgba(243,112,33,0.15)', color: '#F37021', border: '1px solid rgba(243,112,33,0.3)', borderRadius: '9999px', padding: '0.4rem 1rem', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }
              : { background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '9999px', padding: '0.4rem 1rem', fontSize: '0.75rem', cursor: 'pointer' }
            }>{l}</button>
          ))}
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.04)' }}>
                {['Type', 'Description', 'Utilisateur', 'Montant', 'Date'].map(h => (
                  <th key={h} style={{ padding: '0.6rem 0.75rem', textAlign: 'left', fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(tx => {
                const user = userMap[tx.userId] || { name: tx.userId, role: '-' }
                const isPos = tx.amount > 0
                return (
                  <tr key={tx.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                    <td style={{ padding: '0.75rem' }}><TypeBadge type={tx.type} /></td>
                    <td style={{ padding: '0.75rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)' }}>{tx.description}</td>
                    <td style={{ padding: '0.75rem' }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>{user.name}</div>
                      <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}>{user.role}</div>
                    </td>
                    <td style={{ padding: '0.75rem', fontSize: '0.875rem', fontWeight: 700, color: isPos ? '#30d158' : '#ff453a' }}>
                      {isPos ? '+' : ''}{formatCurrency(tx.amount)}
                    </td>
                    <td style={{ padding: '0.75rem', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>{tx.createdAt}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  )
}

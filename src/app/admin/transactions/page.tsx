'use client'

import { useState } from 'react'
import { formatCurrency } from '@/lib/utils'
import { mockTransactions } from '@/lib/mock-data'

const OR = '#F37021'

const allTx = [
  ...mockTransactions,
  { id: 'tx_5', userId: 'brand_1', type: 'DEPOSIT', amount: 20000, description: "Rechargement L'Oréal", createdAt: '2024-09-01' },
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
    : type === 'COMMISSION' ? { bg: `rgba(243,112,33,0.1)`, c: OR, b: `rgba(243,112,33,0.2)`, l: 'Commission' }
    : { bg: 'rgba(10,132,255,0.1)', c: '#0a84ff', b: 'rgba(10,132,255,0.2)', l: 'Campagne' }
  return <span style={{ background: cfg.bg, color: cfg.c, border: `1px solid ${cfg.b}`, borderRadius: '9999px', padding: '0.2rem 0.65rem', fontSize: '0.68rem', fontWeight: 600 }}>{cfg.l}</span>
}

export default function AdminTransactionsPage() {
  const [filter, setFilter] = useState('ALL')
  const [search, setSearch] = useState('')

  const filtered = allTx.filter(t =>
    (filter === 'ALL' || t.type === filter || (filter === 'CAMPAIGN' && t.type === 'CAMPAIGN_PAYMENT')) &&
    (t.description.toLowerCase().includes(search.toLowerCase()) || (userMap[t.userId]?.name || t.userId).toLowerCase().includes(search.toLowerCase()))
  )

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

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
        {[
          { label: 'Revenus plateforme', value: formatCurrency(totalRevenue), color: OR },
          { label: 'Dépôts marques', value: formatCurrency(totalDeposits), color: '#30d158' },
          { label: 'Paiements influenceurs', value: formatCurrency(totalPayments), color: '#0a84ff' },
          { label: 'Commissions', value: formatCurrency(totalCommissions), color: OR },
        ].map(s => (
          <div key={s.label} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1rem' }}>
            <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.4rem' }}>{s.label}</div>
            <div style={{ fontSize: '1.15rem', fontWeight: 700, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div style={{ marginBottom: '1rem' }}>
        <input
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.75rem', padding: '0.75rem 1rem', color: 'white', fontSize: '0.875rem', outline: 'none', width: '100%', boxSizing: 'border-box' as const }}
          placeholder="Rechercher une transaction…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Filter pills */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        {[['ALL', 'Toutes'], ['DEPOSIT', 'Dépôts'], ['CAMPAIGN', 'Campagnes'], ['WITHDRAWAL', 'Retraits'], ['COMMISSION', 'Commissions']].map(([k, l]) => (
          <button key={k} onClick={() => setFilter(k)} style={filter === k
            ? { background: `rgba(243,112,33,0.15)`, color: OR, border: `1px solid rgba(243,112,33,0.3)`, borderRadius: '9999px', padding: '0.4rem 1rem', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }
            : { background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '9999px', padding: '0.4rem 1rem', fontSize: '0.75rem', cursor: 'pointer' }
          }>{l}</button>
        ))}
      </div>

      {/* Card list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {filtered.map(tx => {
          const user = userMap[tx.userId] || { name: tx.userId, role: '-' }
          const isPos = tx.amount > 0
          return (
            <div key={tx.id} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '0.875rem 1rem' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.07)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}>

              {/* Row 1: type badge + amount */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <TypeBadge type={tx.type} />
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: isPos ? '#30d158' : '#ff453a' }}>
                  {isPos ? '+' : ''}{formatCurrency(tx.amount)}
                </span>
              </div>

              {/* Row 2: description */}
              <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)', marginBottom: '0.4rem' }}>{tx.description}</div>

              {/* Row 3: user + date */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>{user.name}</span>
                  <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', marginLeft: '0.4rem' }}>· {user.role}</span>
                </div>
                <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)' }}>{tx.createdAt}</span>
              </div>
            </div>
          )
        })}
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'rgba(255,255,255,0.3)', fontSize: '0.875rem' }}>Aucune transaction trouvée</div>
        )}
      </div>
    </div>
  )
}

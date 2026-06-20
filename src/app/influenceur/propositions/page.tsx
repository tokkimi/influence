'use client'

import { useState } from 'react'
import { mockProposals } from '@/lib/mock-data'
import { formatCurrency } from '@/lib/utils'
import { Check, X, Clock } from 'lucide-react'

function GlassCard({ children }: { children: React.ReactNode }) {
  return <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1.25rem' }}>{children}</div>
}

export default function InfluenceurPropositionsPage() {
  const [proposals, setProposals] = useState(mockProposals)
  const [filter, setFilter] = useState('ALL')

  const accept = (id: string) => setProposals(p => p.map(x => x.id === id ? { ...x, status: 'ACCEPTED' } : x))
  const decline = (id: string) => setProposals(p => p.map(x => x.id === id ? { ...x, status: 'REJECTED' } : x))

  const filtered = proposals.filter(p => {
    if (filter === 'PENDING') return p.status === 'PENDING'
    if (filter === 'ACCEPTED') return p.status === 'ACCEPTED'
    if (filter === 'REJECTED') return p.status === 'REJECTED'
    return true
  })

  return (
    <div style={{ color: 'white', padding: '1.5rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>Propositions</h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem' }}>{proposals.length} propositions reçues</p>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        {[['ALL', 'Toutes'], ['PENDING', 'En attente'], ['ACCEPTED', 'Acceptées'], ['REJECTED', 'Refusées']].map(([k, l]) => (
          <button key={k} onClick={() => setFilter(k)} style={filter === k
            ? { background: 'rgba(243,112,33,0.15)', color: '#F37021', border: '1px solid rgba(243,112,33,0.3)', borderRadius: '9999px', padding: '0.4rem 1rem', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }
            : { background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '9999px', padding: '0.4rem 1rem', fontSize: '0.75rem', cursor: 'pointer' }
          }>{l}</button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <GlassCard>
          <div style={{ textAlign: 'center', padding: '3rem', color: 'rgba(255,255,255,0.3)', fontSize: '0.875rem' }}>Aucune proposition dans cette catégorie</div>
        </GlassCard>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {filtered.map(p => {
            const commission = p.payment * 0.3
            const net = p.payment - commission
            return (
              <div key={p.id} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '0.75rem', background: 'rgba(243,112,33,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, color: '#F37021' }}>
                      {p.brandName.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{p.campaignTitle}</div>
                      <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>{p.brandName}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#30d158' }}>{formatCurrency(net)} net</div>
                    <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)' }}>{formatCurrency(p.payment)} brut · comm. 30%</div>
                  </div>
                </div>

                {p.description && (
                  <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.55)', marginBottom: '0.75rem', lineHeight: 1.5 }}>
                    {p.description.substring(0, 160)}{p.description.length > 160 ? '...' : ''}
                  </p>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)' }}>
                    <Clock size={11} style={{ display: 'inline', marginRight: '0.25rem' }} />
                    Reçu le {p.createdAt}
                  </div>

                  {p.status === 'PENDING' ? (
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button onClick={() => accept(p.id)} style={{ background: 'rgba(48,209,88,0.1)', border: '1px solid rgba(48,209,88,0.2)', color: '#30d158', fontSize: '0.75rem', fontWeight: 600, padding: '0.4rem 1rem', borderRadius: '9999px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Check size={13} /> Accepter
                      </button>
                      <button onClick={() => decline(p.id)} style={{ background: 'rgba(255,69,58,0.1)', border: '1px solid rgba(255,69,58,0.2)', color: '#ff453a', fontSize: '0.75rem', fontWeight: 600, padding: '0.4rem 1rem', borderRadius: '9999px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <X size={13} /> Refuser
                      </button>
                    </div>
                  ) : p.status === 'ACCEPTED' ? (
                    <span style={{ background: 'rgba(48,209,88,0.1)', color: '#30d158', border: '1px solid rgba(48,209,88,0.2)', borderRadius: '9999px', padding: '0.25rem 0.75rem', fontSize: '0.75rem', fontWeight: 600 }}>En cours</span>
                  ) : (
                    <span style={{ background: 'rgba(255,69,58,0.1)', color: '#ff453a', border: '1px solid rgba(255,69,58,0.2)', borderRadius: '9999px', padding: '0.25rem 0.75rem', fontSize: '0.75rem', fontWeight: 600 }}>Refusée</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

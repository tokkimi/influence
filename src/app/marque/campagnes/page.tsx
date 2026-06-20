'use client'

import { useState } from 'react'
import { mockCampaigns } from '@/lib/mock-data'
import { formatCurrency } from '@/lib/utils'
import { Plus, Users, Calendar, ArrowRight } from 'lucide-react'
import Link from 'next/link'

function GlassCard({ children }: { children: React.ReactNode }) {
  return <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1.25rem' }}>{children}</div>
}

function StatusBadge({ status }: { status: string }) {
  const s = status === 'ACTIVE' ? { bg: 'rgba(48,209,88,0.1)', c: '#30d158', b: 'rgba(48,209,88,0.2)', l: 'Active' }
    : status === 'PENDING' ? { bg: 'rgba(255,149,0,0.1)', c: '#ff9500', b: 'rgba(255,149,0,0.2)', l: 'En attente' }
    : { bg: 'rgba(255,255,255,0.06)', c: 'rgba(255,255,255,0.4)', b: 'rgba(255,255,255,0.1)', l: 'Terminée' }
  return <span style={{ background: s.bg, color: s.c, border: `1px solid ${s.b}`, borderRadius: '9999px', padding: '0.15rem 0.6rem', fontSize: '0.7rem', fontWeight: 600 }}>{s.l}</span>
}

const myCampaigns = mockCampaigns.filter(c => c.brandProfileId === 'brand-1')

export default function MarqueCampagnesPage() {
  const [filter, setFilter] = useState('ALL')

  const filtered = myCampaigns.filter(c => filter === 'ALL' || c.status === filter)

  return (
    <div style={{ color: 'white', padding: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>Mes campagnes</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem' }}>{myCampaigns.length} campagnes au total</p>
        </div>
        <Link href="/marque/nouvelle-campagne">
          <button style={{ background: 'rgba(243,112,33,0.2)', border: '1px solid rgba(243,112,33,0.3)', color: '#F37021', fontSize: '0.75rem', fontWeight: 600, padding: '0.6rem 1.25rem', borderRadius: '9999px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Plus size={14} /> Nouvelle campagne
          </button>
        </Link>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        {[['ALL', 'Toutes'], ['ACTIVE', 'Actives'], ['PENDING', 'En attente'], ['COMPLETED', 'Terminées']].map(([k, l]) => (
          <button key={k} onClick={() => setFilter(k)} style={filter === k
            ? { background: 'rgba(243,112,33,0.15)', color: '#F37021', border: '1px solid rgba(243,112,33,0.3)', borderRadius: '9999px', padding: '0.4rem 1rem', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }
            : { background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '9999px', padding: '0.4rem 1rem', fontSize: '0.75rem', cursor: 'pointer' }
          }>{l}</button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <GlassCard>
          <div style={{ textAlign: 'center', padding: '3rem', color: 'rgba(255,255,255,0.3)' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>📋</div>
            <div style={{ fontSize: '0.875rem' }}>Aucune campagne dans cette catégorie</div>
            <Link href="/marque/nouvelle-campagne">
              <button style={{ marginTop: '1rem', background: 'rgba(243,112,33,0.2)', border: '1px solid rgba(243,112,33,0.3)', color: '#F37021', fontSize: '0.75rem', fontWeight: 600, padding: '0.5rem 1.25rem', borderRadius: '9999px', cursor: 'pointer' }}>
                Créer une campagne
              </button>
            </Link>
          </div>
        </GlassCard>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {filtered.map(c => (
            <div key={c.id} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.2rem' }}>{c.title}</div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>{c.brandName}</div>
                </div>
                <StatusBadge status={c.status} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div>
                  <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)', marginBottom: '0.15rem' }}>Budget utilisé</div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 700 }}>
                    {formatCurrency(c.budget - c.budgetRemaining)} <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', fontWeight: 400 }}>/ {formatCurrency(c.budget)}</span>
                  </div>
                  <div style={{ marginTop: '0.25rem', background: 'rgba(255,255,255,0.08)', borderRadius: '9999px', height: '3px' }}>
                    <div style={{ width: `${Math.round(((c.budget - c.budgetRemaining) / c.budget) * 100)}%`, background: '#F37021', borderRadius: '9999px', height: '3px' }} />
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)', marginBottom: '0.15rem' }}>Influenceurs</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.875rem', fontWeight: 700 }}>
                    <Users size={13} color="#0a84ff" /> {c.influencersCount}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)', marginBottom: '0.15rem' }}>Période</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)' }}>
                    <Calendar size={11} /> {c.startDate} → {c.endDate}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Link href={`/marque/campagnes/${c.id}`} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#F37021', fontSize: '0.75rem', fontWeight: 600, textDecoration: 'none' }}>
                  Voir le détail <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

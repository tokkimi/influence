'use client'

import { useState } from 'react'
import { mockCampaigns, mockInfluencers } from '@/lib/mock-data'
import { formatCurrency } from '@/lib/utils'
import { Eye, X, Users } from 'lucide-react'

function GlassCard({ children }: { children: React.ReactNode }) {
  return <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1.25rem' }}>{children}</div>
}

const inputStyle: React.CSSProperties = { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.75rem', padding: '0.75rem 1rem', color: 'white', fontSize: '0.875rem', outline: 'none', width: '100%' }
const btnGold: React.CSSProperties = { background: 'rgba(243,112,33,0.2)', border: '1px solid rgba(243,112,33,0.3)', color: '#F37021', fontSize: '0.75rem', fontWeight: 600, padding: '0.5rem 1.25rem', borderRadius: '9999px', cursor: 'pointer' }
const btnGhost: React.CSSProperties = { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', padding: '0.5rem 1.25rem', borderRadius: '9999px', cursor: 'pointer' }

function StatusBadge({ status }: { status: string }) {
  const s = status === 'ACTIVE' ? { bg: 'rgba(48,209,88,0.1)', c: '#30d158', b: 'rgba(48,209,88,0.2)', label: 'Active' }
    : status === 'PENDING' ? { bg: 'rgba(255,149,0,0.1)', c: '#ff9500', b: 'rgba(255,149,0,0.2)', label: 'En attente' }
    : { bg: 'rgba(255,255,255,0.06)', c: 'rgba(255,255,255,0.4)', b: 'rgba(255,255,255,0.1)', label: 'Terminée' }
  return <span style={{ background: s.bg, color: s.c, border: `1px solid ${s.b}`, borderRadius: '9999px', padding: '0.15rem 0.6rem', fontSize: '0.7rem', fontWeight: 600 }}>{s.label}</span>
}

type Campaign = typeof mockCampaigns[number]

export default function AdminCampagnesPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns)
  const [filter, setFilter] = useState('ALL')
  const [selected, setSelected] = useState<Campaign | null>(null)
  const [missionModal, setMissionModal] = useState(false)
  const [selectedInfs, setSelectedInfs] = useState<string[]>([])

  const filtered = campaigns.filter(c => filter === 'ALL' || c.status === filter)

  const changeStatus = (id: string, status: string) => {
    setCampaigns(p => p.map(c => c.id === id ? { ...c, status } : c))
    if (selected?.id === id) setSelected(p => p ? { ...p, status } : null)
  }

  const assignInfluencers = () => {
    setMissionModal(false)
    setSelectedInfs([])
  }

  return (
    <div style={{ color: 'white', padding: '1.5rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>Gestion des campagnes</h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem' }}>{campaigns.length} campagnes enregistrées</p>
      </div>

      <GlassCard>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          {[['ALL', 'Toutes'], ['ACTIVE', 'Actives'], ['PENDING', 'En attente'], ['COMPLETED', 'Terminées']].map(([k, l]) => (
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
                {['Campagne', 'Budget / Restant', 'Dates', 'Influenceurs', 'Statut', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '0.6rem 0.75rem', textAlign: 'left', fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  onClick={() => setSelected(c)}>
                  <td style={{ padding: '0.75rem' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>{c.title}</div>
                    <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}>{c.brandName}</div>
                  </td>
                  <td style={{ padding: '0.75rem', fontSize: '0.8rem' }}>
                    <div>{formatCurrency(c.budget)}</div>
                    <div style={{ fontSize: '0.7rem', color: '#30d158' }}>{formatCurrency(c.budgetRemaining)} restant</div>
                  </td>
                  <td style={{ padding: '0.75rem', fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>
                    <div>{c.startDate}</div>
                    <div>{c.endDate}</div>
                  </td>
                  <td style={{ padding: '0.75rem', fontSize: '0.8rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Users size={12} color="rgba(255,255,255,0.4)" />{c.influencersCount}</div>
                  </td>
                  <td style={{ padding: '0.75rem' }}><StatusBadge status={c.status} /></td>
                  <td style={{ padding: '0.75rem' }} onClick={e => e.stopPropagation()}>
                    <button onClick={() => setSelected(c)} style={{ background: 'rgba(255,255,255,0.06)', border: 'none', borderRadius: '0.5rem', padding: '0.3rem', cursor: 'pointer', color: 'rgba(255,255,255,0.6)' }}><Eye size={14} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {selected && (
        <>
          <div style={{ position: 'fixed', inset: 0, zIndex: 40 }} onClick={() => setSelected(null)} />
          <div style={{ position: 'fixed', top: 0, right: 0, width: '420px', height: '100vh', background: '#111', borderLeft: '1px solid rgba(255,255,255,0.08)', zIndex: 50, overflowY: 'auto', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 700 }}>Détail campagne</h2>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}><X size={18} /></button>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.25rem' }}>{selected.title}</div>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>{selected.brandName}</div>
              <StatusBadge status={selected.status} />
            </div>
            <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '0.75rem', padding: '0.75rem', marginBottom: '1rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>
              {selected.description}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
              {[{ l: 'Budget total', v: formatCurrency(selected.budget) }, { l: 'Restant', v: formatCurrency(selected.budgetRemaining) }, { l: 'Début', v: selected.startDate }, { l: 'Fin', v: selected.endDate }].map(s => (
                <div key={s.l} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '0.75rem', padding: '0.75rem' }}>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}>{s.l}</div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, marginTop: '0.2rem' }}>{s.v}</div>
                </div>
              ))}
            </div>
            {selected.promoCode && <div style={{ marginBottom: '1rem', fontSize: '0.8rem' }}>Code promo: <span style={{ color: '#F37021', fontWeight: 600 }}>{selected.promoCode}</span></div>}
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.5rem' }}>Ciblage</div>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {[selected.targetCategory, selected.targetGender, ...(selected.targetInterests || []), ...(selected.targetCountries || [])].filter(Boolean).map((t, i) => (
                  <span key={i} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '9999px', padding: '0.2rem 0.6rem', fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)' }}>{t}</span>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              <button onClick={() => setMissionModal(true)} style={btnGold}>Missionner des influenceurs</button>
            </div>
            <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.5rem' }}>Changer le statut</div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {['ACTIVE', 'PENDING', 'COMPLETED'].map(s => (
                <button key={s} onClick={() => changeStatus(selected.id, s)} style={{ ...btnGhost, ...(selected.status === s ? { border: '1px solid rgba(243,112,33,0.3)', color: '#F37021' } : {}) }}>
                  {s === 'ACTIVE' ? 'Active' : s === 'PENDING' ? 'En attente' : 'Terminée'}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {missionModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 60, padding: '1rem' }}>
          <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem', padding: '1.5rem', maxWidth: '480px', width: '100%', maxHeight: '80vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontWeight: 700 }}>Sélectionner des influenceurs</h3>
              <button onClick={() => setMissionModal(false)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}><X size={18} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
              {mockInfluencers.map(inf => (
                <div key={inf.id} onClick={() => setSelectedInfs(p => p.includes(inf.id) ? p.filter(x => x !== inf.id) : [...p, inf.id])}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', borderRadius: '0.75rem', cursor: 'pointer', background: selectedInfs.includes(inf.id) ? 'rgba(243,112,33,0.1)' : 'rgba(255,255,255,0.04)', border: selectedInfs.includes(inf.id) ? '1px solid rgba(243,112,33,0.3)' : '1px solid transparent' }}>
                  <img src={inf.photo} alt={inf.name} style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>{inf.name}</div>
                    <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}>{inf.category} · {inf.followers.toLocaleString()} abonnés</div>
                  </div>
                  {selectedInfs.includes(inf.id) && <span style={{ color: '#F37021', fontSize: '0.75rem' }}>✓</span>}
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={assignInfluencers} style={btnGold}>Assigner ({selectedInfs.length})</button>
              <button onClick={() => setMissionModal(false)} style={btnGhost}>Annuler</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

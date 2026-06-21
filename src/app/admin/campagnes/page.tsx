'use client'

import { useState } from 'react'
import { mockCampaigns, mockInfluencers } from '@/lib/mock-data'
import { formatCurrency } from '@/lib/utils'
import { Eye, X, Users, Calendar } from 'lucide-react'

const OR = '#F37021'

const inputStyle: React.CSSProperties = { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.75rem', padding: '0.75rem 1rem', color: 'white', fontSize: '0.875rem', outline: 'none', width: '100%', boxSizing: 'border-box' }
const btnOrange: React.CSSProperties = { background: `rgba(243,112,33,0.2)`, border: `1px solid rgba(243,112,33,0.3)`, color: OR, fontSize: '0.75rem', fontWeight: 600, padding: '0.5rem 1.25rem', borderRadius: '9999px', cursor: 'pointer' }
const btnGhost: React.CSSProperties = { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', padding: '0.5rem 1.25rem', borderRadius: '9999px', cursor: 'pointer' }

function StatusBadge({ status }: { status: string }) {
  const s = status === 'ACTIVE' ? { bg: 'rgba(48,209,88,0.1)', c: '#30d158', b: 'rgba(48,209,88,0.2)', label: 'Active' }
    : status === 'PENDING' ? { bg: 'rgba(255,149,0,0.1)', c: '#ff9500', b: 'rgba(255,149,0,0.2)', label: 'En attente' }
    : { bg: 'rgba(255,255,255,0.06)', c: 'rgba(255,255,255,0.4)', b: 'rgba(255,255,255,0.1)', label: 'Terminée' }
  return <span style={{ background: s.bg, color: s.c, border: `1px solid ${s.b}`, borderRadius: '9999px', padding: '0.2rem 0.65rem', fontSize: '0.68rem', fontWeight: 600 }}>{s.label}</span>
}

type Campaign = typeof mockCampaigns[number]

export default function AdminCampagnesPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns)
  const [filter, setFilter] = useState('ALL')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Campaign | null>(null)
  const [missionModal, setMissionModal] = useState(false)
  const [selectedInfs, setSelectedInfs] = useState<string[]>([])

  const filtered = campaigns.filter(c =>
    (filter === 'ALL' || c.status === filter) &&
    (c.title.toLowerCase().includes(search.toLowerCase()) || c.brandName.toLowerCase().includes(search.toLowerCase()))
  )

  const changeStatus = (id: string, status: string) => {
    setCampaigns(p => p.map(c => c.id === id ? { ...c, status } : c))
    if (selected?.id === id) setSelected(p => p ? { ...p, status } : null)
  }

  return (
    <div style={{ color: 'white', padding: '1.5rem', maxWidth: '100%', overflowX: 'hidden' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>Gestion des campagnes</h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem' }}>{campaigns.length} campagnes enregistrées</p>
      </div>

      {/* Search */}
      <div style={{ marginBottom: '1rem' }}>
        <input style={inputStyle} placeholder="Rechercher une campagne ou marque…" value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      {/* Filter pills */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        {[['ALL', 'Toutes'], ['ACTIVE', 'Actives'], ['PENDING', 'En attente'], ['COMPLETED', 'Terminées']].map(([k, l]) => (
          <button key={k} onClick={() => setFilter(k)} style={filter === k
            ? { background: `rgba(243,112,33,0.15)`, color: OR, border: `1px solid rgba(243,112,33,0.3)`, borderRadius: '9999px', padding: '0.4rem 1rem', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }
            : { background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '9999px', padding: '0.4rem 1rem', fontSize: '0.75rem', cursor: 'pointer' }
          }>{l}</button>
        ))}
      </div>

      {/* Card list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {filtered.map(c => (
          <div key={c.id} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '0.875rem 1rem', cursor: 'pointer', overflow: 'hidden' }}
            onClick={() => setSelected(c)}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.07)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}>

            {/* Row 1: title + status */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: '0.875rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.title}</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.15rem' }}>{c.brandName}</div>
              </div>
              <StatusBadge status={c.status} />
            </div>

            {/* Row 2: stats grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '0.75rem' }}>
              {[
                { l: 'Budget', v: formatCurrency(c.budget) },
                { l: 'Restant', v: formatCurrency(c.budgetRemaining), color: '#30d158' },
                { l: 'Influenceurs', v: String(c.influencersCount) },
              ].map(s => (
                <div key={s.l} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 10, padding: '0.5rem 0.6rem' }}>
                  <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)', marginBottom: '0.15rem' }}>{s.l}</div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: s.color || 'white' }}>{s.v}</div>
                </div>
              ))}
            </div>

            {/* Row 3: dates + view button */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)' }}>
                <Calendar size={11} />
                <span>{c.startDate} → {c.endDate}</span>
              </div>
              <button onClick={e => { e.stopPropagation(); setSelected(c) }} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: `rgba(243,112,33,0.12)`, border: `1px solid rgba(243,112,33,0.25)`, color: OR, fontSize: '0.72rem', fontWeight: 600, padding: '0.35rem 0.75rem', borderRadius: '9999px', cursor: 'pointer' }}>
                <Eye size={11} /> Voir
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'rgba(255,255,255,0.3)', fontSize: '0.875rem' }}>Aucune campagne trouvée</div>
        )}
      </div>

      {/* Detail panel */}
      {selected && (
        <>
          <div style={{ position: 'fixed', inset: 0, zIndex: 40, background: 'rgba(0,0,0,0.4)' }} onClick={() => setSelected(null)} />
          <div style={{ position: 'fixed', top: 0, right: 0, width: 'min(420px,100vw)', height: '100vh', background: '#111', borderLeft: '1px solid rgba(255,255,255,0.08)', zIndex: 50, overflowY: 'auto', padding: '1.5rem' }}>
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
            {selected.promoCode && <div style={{ marginBottom: '1rem', fontSize: '0.8rem' }}>Code promo: <span style={{ color: OR, fontWeight: 600 }}>{selected.promoCode}</span></div>}
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.5rem' }}>Ciblage</div>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {[selected.targetCategory, selected.targetGender, ...(selected.targetInterests || []), ...(selected.targetCountries || [])].filter(Boolean).map((t, i) => (
                  <span key={i} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '9999px', padding: '0.2rem 0.6rem', fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)' }}>{t}</span>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              <button onClick={() => setMissionModal(true)} style={btnOrange}>
                <Users size={12} style={{ display: 'inline', marginRight: '0.3rem' }} />
                Missionner des influenceurs
              </button>
            </div>
            <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.5rem' }}>Changer le statut</div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {['ACTIVE', 'PENDING', 'COMPLETED'].map(s => (
                <button key={s} onClick={() => changeStatus(selected.id, s)} style={{ ...btnGhost, ...(selected.status === s ? { border: `1px solid rgba(243,112,33,0.3)`, color: OR } : {}) }}>
                  {s === 'ACTIVE' ? 'Active' : s === 'PENDING' ? 'En attente' : 'Terminée'}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Mission modal */}
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
                  style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', borderRadius: '0.75rem', cursor: 'pointer', background: selectedInfs.includes(inf.id) ? `rgba(243,112,33,0.1)` : 'rgba(255,255,255,0.04)', border: selectedInfs.includes(inf.id) ? `1px solid rgba(243,112,33,0.3)` : '1px solid transparent' }}>
                  <img src={inf.photo} alt={inf.name} style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>{inf.name}</div>
                    <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}>{inf.category} · {inf.followers.toLocaleString()} abonnés</div>
                  </div>
                  {selectedInfs.includes(inf.id) && <span style={{ color: OR, fontSize: '0.75rem' }}>✓</span>}
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={() => { setMissionModal(false); setSelectedInfs([]) }} style={btnOrange}>Assigner ({selectedInfs.length})</button>
              <button onClick={() => setMissionModal(false)} style={btnGhost}>Annuler</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

'use client'

import { useState } from 'react'
import { mockInfluencers } from '@/lib/mock-data'
import { formatCurrency, formatNumber } from '@/lib/utils'
import { Eye, CheckCircle, Ban, Trash2, X, Instagram, Youtube } from 'lucide-react'

function GlassCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={className} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1.25rem' }}>
      {children}
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '0.75rem', padding: '0.75rem 1rem', color: 'white',
  fontSize: '0.875rem', outline: 'none', width: '100%',
}

function CategoryBadge({ cat }: { cat: string }) {
  const s: React.CSSProperties =
    cat === 'MICRO' ? { background: 'rgba(48,209,88,0.12)', color: '#30d158', border: '1px solid rgba(48,209,88,0.2)' }
    : cat === 'MACRO' ? { background: 'rgba(10,132,255,0.12)', color: '#0a84ff', border: '1px solid rgba(10,132,255,0.2)' }
    : { background: 'rgba(201,153,58,0.12)', color: '#c9993a', border: '1px solid rgba(201,153,58,0.2)' }
  return <span style={{ ...s, borderRadius: '9999px', padding: '0.15rem 0.6rem', fontSize: '0.7rem', fontWeight: 600 }}>{cat}</span>
}

type Inf = typeof mockInfluencers[number] & { isExcluded?: boolean }

const btnGold: React.CSSProperties = { background: 'rgba(201,153,58,0.2)', border: '1px solid rgba(201,153,58,0.3)', color: '#c9993a', fontSize: '0.75rem', fontWeight: 600, padding: '0.5rem 1.25rem', borderRadius: '9999px', cursor: 'pointer' }
const btnGhost: React.CSSProperties = { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', padding: '0.5rem 1.25rem', borderRadius: '9999px', cursor: 'pointer' }

export default function AdminInfluenceursPage() {
  const [list, setList] = useState<Inf[]>(mockInfluencers.map(i => ({ ...i, isExcluded: false })))
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('tous')
  const [selected, setSelected] = useState<Inf | null>(null)
  const [editMode, setEditMode] = useState(false)
  const [editData, setEditData] = useState<Partial<Inf>>({})
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const filtered = list.filter(i => {
    const m = i.name.toLowerCase().includes(search.toLowerCase())
    if (filter === 'certifies') return m && i.isVerified && !i.isExcluded
    if (filter === 'attente') return m && !i.isVerified && !i.isExcluded
    if (filter === 'exclus') return m && i.isExcluded
    return m
  })

  const certify = (id: string) => setList(p => p.map(i => i.id === id ? { ...i, isVerified: true } : i))
  const toggleExclude = (id: string) => setList(p => p.map(i => i.id === id ? { ...i, isExcluded: !i.isExcluded } : i))
  const del = (id: string) => { setList(p => p.filter(i => i.id !== id)); setDeleteId(null); if (selected?.id === id) setSelected(null) }
  const openEdit = (inf: Inf) => { setEditData({ name: inf.name, bio: inf.bio, instagram: inf.instagram, followers: inf.followers, engagementRate: inf.engagementRate }); setEditMode(true) }
  const saveEdit = () => {
    if (!selected) return
    setList(p => p.map(i => i.id === selected.id ? { ...i, ...editData } : i))
    setSelected(p => p ? { ...p, ...editData } as Inf : null)
    setEditMode(false)
  }

  return (
    <div style={{ color: 'white', padding: '1.5rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>Gestion des influenceurs</h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem' }}>{list.length} influenceurs enregistrés</p>
      </div>

      <GlassCard>
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <input placeholder="Rechercher..." value={search} onChange={e => setSearch(e.target.value)} style={{ ...inputStyle, width: '240px', flex: 'none' }} />
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {['tous', 'certifies', 'attente', 'exclus'].map((f, idx) => (
              <button key={f} onClick={() => setFilter(f)} style={filter === f
                ? { background: 'rgba(201,153,58,0.15)', color: '#c9993a', border: '1px solid rgba(201,153,58,0.3)', borderRadius: '9999px', padding: '0.4rem 1rem', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }
                : { background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '9999px', padding: '0.4rem 1rem', fontSize: '0.75rem', cursor: 'pointer' }
              }>{['Tous', 'Certifiés', 'En attente', 'Exclus'][idx]}</button>
            ))}
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.04)' }}>
                {['Influenceur', 'Catégorie', 'Abonnés', 'Engagement', 'Plan', 'Statut', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '0.6rem 0.75rem', textAlign: 'left', fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(inf => (
                <tr key={inf.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  onClick={() => { setSelected(inf); setEditMode(false) }}>
                  <td style={{ padding: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <img src={inf.photo} alt={inf.name} style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }} />
                      <div>
                        <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>{inf.name}</div>
                        <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}>{inf.country}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '0.75rem' }}><CategoryBadge cat={inf.category} /></td>
                  <td style={{ padding: '0.75rem', fontSize: '0.8rem' }}>{formatNumber(inf.followers)}</td>
                  <td style={{ padding: '0.75rem', fontSize: '0.8rem', color: '#30d158' }}>{inf.engagementRate}%</td>
                  <td style={{ padding: '0.75rem', fontSize: '0.7rem', fontWeight: 600, color: inf.subscription === 'PRO' ? '#c9993a' : 'rgba(255,255,255,0.4)' }}>
                    {inf.subscription === 'PRO' ? 'Pro' : 'Gratuit'}
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    {inf.isExcluded
                      ? <span style={{ background: 'rgba(255,69,58,0.1)', color: '#ff453a', border: '1px solid rgba(255,69,58,0.2)', borderRadius: '9999px', padding: '0.15rem 0.6rem', fontSize: '0.7rem' }}>Exclu</span>
                      : inf.isVerified
                        ? <span style={{ background: 'rgba(48,209,88,0.1)', color: '#30d158', border: '1px solid rgba(48,209,88,0.2)', borderRadius: '9999px', padding: '0.15rem 0.6rem', fontSize: '0.7rem' }}>Certifié</span>
                        : <span style={{ background: 'rgba(255,149,0,0.1)', color: '#ff9500', border: '1px solid rgba(255,149,0,0.2)', borderRadius: '9999px', padding: '0.15rem 0.6rem', fontSize: '0.7rem' }}>En attente</span>
                    }
                  </td>
                  <td style={{ padding: '0.75rem' }} onClick={e => e.stopPropagation()}>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <button onClick={() => { setSelected(inf); setEditMode(false) }} style={{ background: 'rgba(255,255,255,0.06)', border: 'none', borderRadius: '0.5rem', padding: '0.3rem', cursor: 'pointer', color: 'rgba(255,255,255,0.6)' }}><Eye size={14} /></button>
                      {!inf.isVerified && !inf.isExcluded && <button onClick={() => certify(inf.id)} style={{ background: 'rgba(48,209,88,0.1)', border: 'none', borderRadius: '0.5rem', padding: '0.3rem', cursor: 'pointer', color: '#30d158' }}><CheckCircle size={14} /></button>}
                      <button onClick={() => toggleExclude(inf.id)} style={{ background: inf.isExcluded ? 'rgba(48,209,88,0.1)' : 'rgba(255,149,0,0.1)', border: 'none', borderRadius: '0.5rem', padding: '0.3rem', cursor: 'pointer', color: inf.isExcluded ? '#30d158' : '#ff9500' }}><Ban size={14} /></button>
                      <button onClick={() => setDeleteId(inf.id)} style={{ background: 'rgba(255,69,58,0.1)', border: 'none', borderRadius: '0.5rem', padding: '0.3rem', cursor: 'pointer', color: '#ff453a' }}><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div style={{ textAlign: 'center', padding: '2rem', color: 'rgba(255,255,255,0.3)', fontSize: '0.875rem' }}>Aucun résultat</div>}
        </div>
      </GlassCard>

      {selected && (
        <>
          <div style={{ position: 'fixed', inset: 0, zIndex: 40 }} onClick={() => { setSelected(null); setEditMode(false) }} />
          <div style={{ position: 'fixed', top: 0, right: 0, width: '400px', height: '100vh', background: '#111', borderLeft: '1px solid rgba(255,255,255,0.08)', zIndex: 50, overflowY: 'auto', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 700 }}>Détail influenceur</h2>
              <button onClick={() => { setSelected(null); setEditMode(false) }} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}><X size={18} /></button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
              <img src={selected.photo} alt={selected.name} style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover' }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: '1rem' }}>{selected.name}</div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', marginBottom: '0.25rem' }}>{selected.country} · {selected.gender}</div>
                <CategoryBadge cat={selected.category} />
              </div>
            </div>
            {editMode ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { label: 'Nom', key: 'name' as const, type: 'text' },
                  { label: 'Instagram', key: 'instagram' as const, type: 'text' },
                  { label: 'Abonnés', key: 'followers' as const, type: 'number' },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.25rem', display: 'block' }}>{f.label}</label>
                    <input type={f.type} style={inputStyle} value={(editData[f.key] as string | number) || ''} onChange={e => setEditData(d => ({ ...d, [f.key]: f.type === 'number' ? Number(e.target.value) : e.target.value }))} />
                  </div>
                ))}
                <div>
                  <label style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.25rem', display: 'block' }}>Bio</label>
                  <textarea style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' } as React.CSSProperties} value={editData.bio || ''} onChange={e => setEditData(d => ({ ...d, bio: e.target.value }))} />
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={saveEdit} style={btnGold}>Enregistrer</button>
                  <button onClick={() => setEditMode(false)} style={btnGhost}>Annuler</button>
                </div>
              </div>
            ) : (
              <>
                <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', marginBottom: '1rem', lineHeight: 1.5 }}>{selected.bio}</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                  {[{ label: 'Abonnés', value: formatNumber(selected.followers) }, { label: 'Engagement', value: `${selected.engagementRate}%` }, { label: 'Portefeuille', value: formatCurrency(selected.balance) }, { label: 'Plan', value: selected.subscription === 'PRO' ? 'Pro' : 'Gratuit' }].map(s => (
                    <div key={s.label} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '0.75rem', padding: '0.75rem' }}>
                      <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.2rem' }}>{s.label}</div>
                      <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>{s.value}</div>
                    </div>
                  ))}
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.5rem' }}>Tarifs</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
                    {[{ l: 'Post', v: selected.ratePost }, { l: 'Story', v: selected.rateStory }, { l: 'Vidéo', v: selected.rateVideo }].map(r => (
                      <div key={r.l} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '0.5rem', padding: '0.5rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)' }}>{r.l}</div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#c9993a' }}>{formatCurrency(r.v)}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.5rem' }}>Réseaux</div>
                  {selected.instagram && <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', marginBottom: '0.3rem' }}><Instagram size={13} color="#c9993a" /> {selected.instagram}</div>}
                  {selected.youtube && <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', marginBottom: '0.3rem' }}><Youtube size={13} color="#ff453a" /> {selected.youtube}</div>}
                  {selected.tiktok && <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', marginBottom: '0.3rem' }}>TikTok: {selected.tiktok}</div>}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
                  {selected.interests.map(i => <span key={i} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '9999px', padding: '0.2rem 0.6rem', fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)' }}>{i}</span>)}
                </div>
                <button onClick={() => openEdit(selected)} style={btnGold}>Modifier</button>
              </>
            )}
          </div>
        </>
      )}

      {deleteId && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 60, padding: '1rem' }}>
          <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem', padding: '1.5rem', maxWidth: '320px', width: '100%' }}>
            <h3 style={{ fontWeight: 700, marginBottom: '0.75rem' }}>Confirmer la suppression</h3>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', marginBottom: '1.25rem' }}>Cette action est irréversible.</p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={() => del(deleteId)} style={{ background: 'rgba(255,69,58,0.1)', border: '1px solid rgba(255,69,58,0.2)', color: '#ff453a', fontSize: '0.75rem', fontWeight: 600, padding: '0.5rem 1.25rem', borderRadius: '9999px', cursor: 'pointer' }}>Supprimer</button>
              <button onClick={() => setDeleteId(null)} style={btnGhost}>Annuler</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

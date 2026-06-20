'use client'

import { useState } from 'react'
import { mockInfluencers } from '@/lib/mock-data'
import { formatNumber } from '@/lib/utils'
import { Eye, CheckCircle, Ban, Trash2, X, Edit2, Search } from 'lucide-react'

const OR = '#F37021'

type Inf = typeof mockInfluencers[number] & { isExcluded?: boolean }

function CategoryBadge({ cat }: { cat: string }) {
  const map: Record<string, [string, string]> = {
    MICRO: ['rgba(48,209,88,0.12)', '#30d158'],
    MACRO: ['rgba(249,112,33,0.12)', OR],
    INTERNATIONAL: ['rgba(10,132,255,0.12)', '#0a84ff'],
  }
  const [bg, color] = map[cat] || ['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.4)']
  return (
    <span style={{ background: bg, color, border: `1px solid ${color}30`, borderRadius: 9999, padding: '2px 8px', fontSize: 11, fontWeight: 700 }}>
      {cat}
    </span>
  )
}

function StatusBadge({ verified, excluded }: { verified: boolean; excluded?: boolean }) {
  if (excluded) return <span style={{ background: 'rgba(255,69,58,0.12)', color: '#ff453a', border: '1px solid rgba(255,69,58,0.25)', borderRadius: 9999, padding: '2px 8px', fontSize: 11, fontWeight: 600 }}>Exclu</span>
  if (verified) return <span style={{ background: 'rgba(48,209,88,0.12)', color: '#30d158', border: '1px solid rgba(48,209,88,0.25)', borderRadius: 9999, padding: '2px 8px', fontSize: 11, fontWeight: 600 }}>Certifié</span>
  return <span style={{ background: 'rgba(255,149,0,0.12)', color: '#ff9500', border: '1px solid rgba(255,149,0,0.25)', borderRadius: 9999, padding: '2px 8px', fontSize: 11, fontWeight: 600 }}>En attente</span>
}

export default function AdminInfluenceurs() {
  const [list, setList] = useState<Inf[]>(mockInfluencers.map(i => ({ ...i, isExcluded: false })))
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('tous')
  const [panel, setPanel] = useState<Inf | null>(null)
  const [editing, setEditing] = useState(false)
  const [editData, setEditData] = useState<Partial<Inf>>({})
  const [confirmDel, setConfirmDel] = useState<string | null>(null)

  const filtered = list.filter(i => {
    const m = i.name.toLowerCase().includes(search.toLowerCase())
    if (filter === 'certifies') return m && i.isVerified && !i.isExcluded
    if (filter === 'attente') return m && !i.isVerified && !i.isExcluded
    if (filter === 'exclus') return m && !!i.isExcluded
    return m
  })

  const certify = (id: string) => {
    setList(p => p.map(i => i.id === id ? { ...i, isVerified: true } : i))
    if (panel?.id === id) setPanel(p => p ? { ...p, isVerified: true } : null)
  }
  const toggleExclude = (id: string) => {
    setList(p => p.map(i => i.id === id ? { ...i, isExcluded: !i.isExcluded } : i))
    if (panel?.id === id) setPanel(p => p ? { ...p, isExcluded: !p.isExcluded } : null)
  }
  const del = (id: string) => {
    setList(p => p.filter(i => i.id !== id))
    setConfirmDel(null)
    if (panel?.id === id) setPanel(null)
  }
  const saveEdit = () => {
    if (!panel) return
    setList(p => p.map(i => i.id === panel.id ? { ...i, ...editData } : i))
    setPanel(p => p ? { ...p, ...editData } as Inf : null)
    setEditing(false)
  }

  const filters = [
    { key: 'tous', label: 'Tous' },
    { key: 'certifies', label: 'Certifiés' },
    { key: 'attente', label: 'En attente' },
    { key: 'exclus', label: 'Exclus' },
  ]

  return (
    <div style={{ color: 'white', minHeight: '100vh' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Influenceurs</h1>
        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem', marginTop: 2 }}>{list.length} profils enregistrés</p>
      </div>

      {/* Card principale */}
      <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16 }}>
        {/* Toolbar */}
        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: '1 1 200px' }}>
            <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Rechercher..."
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '0.5rem 0.75rem 0.5rem 2.25rem', color: 'white', fontSize: '0.8rem', outline: 'none', width: '100%' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            {filters.map(f => (
              <button key={f.key} onClick={() => setFilter(f.key)} style={{
                background: filter === f.key ? `${OR}20` : 'rgba(255,255,255,0.05)',
                border: `1px solid ${filter === f.key ? OR + '50' : 'rgba(255,255,255,0.08)'}`,
                color: filter === f.key ? OR : 'rgba(255,255,255,0.4)',
                borderRadius: 9999, padding: '0.35rem 0.9rem', fontSize: '0.75rem', fontWeight: filter === f.key ? 600 : 400, cursor: 'pointer'
              }}>{f.label}</button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: 'transparent' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.03)' }}>
                {['Influenceur', 'Catégorie', 'Abonnés', 'Engagement', 'Plan', 'Statut', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '0.6rem 1rem', textAlign: 'left', fontSize: '0.65rem', fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap', background: 'transparent' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(inf => (
                <tr
                  key={inf.id}
                  onClick={() => { setPanel(inf); setEditing(false) }}
                  style={{ borderTop: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer', background: 'transparent', transition: 'background 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <img src={inf.photo} alt={inf.name} style={{ width: 34, height: 34, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>{inf.name}</div>
                        <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)' }}>{inf.country}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '0.75rem 1rem' }}><CategoryBadge cat={inf.category} /></td>
                  <td style={{ padding: '0.75rem 1rem', fontSize: '0.8rem' }}>{formatNumber(inf.followers)}</td>
                  <td style={{ padding: '0.75rem 1rem', fontSize: '0.8rem', color: '#30d158', fontWeight: 600 }}>{inf.engagementRate}%</td>
                  <td style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: 600, color: inf.subscription === 'PRO' ? OR : 'rgba(255,255,255,0.3)' }}>
                    {inf.subscription === 'PRO' ? 'Pro 29€/m' : 'Gratuit'}
                  </td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <StatusBadge verified={inf.isVerified} excluded={inf.isExcluded} />
                  </td>
                  <td style={{ padding: '0.75rem 1rem' }} onClick={e => e.stopPropagation()}>
                    <div style={{ display: 'flex', gap: 4 }}>
                      <button title="Voir" onClick={() => { setPanel(inf); setEditing(false) }} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: 6, cursor: 'pointer', color: 'rgba(255,255,255,0.5)', display: 'flex' }}>
                        <Eye size={13} />
                      </button>
                      {!inf.isVerified && !inf.isExcluded && (
                        <button title="Certifier" onClick={() => certify(inf.id)} style={{ background: 'rgba(48,209,88,0.1)', border: '1px solid rgba(48,209,88,0.2)', borderRadius: 8, padding: 6, cursor: 'pointer', color: '#30d158', display: 'flex' }}>
                          <CheckCircle size={13} />
                        </button>
                      )}
                      <button title={inf.isExcluded ? 'Réactiver' : 'Exclure'} onClick={() => toggleExclude(inf.id)} style={{ background: inf.isExcluded ? 'rgba(48,209,88,0.1)' : 'rgba(255,149,0,0.1)', border: `1px solid ${inf.isExcluded ? 'rgba(48,209,88,0.2)' : 'rgba(255,149,0,0.2)'}`, borderRadius: 8, padding: 6, cursor: 'pointer', color: inf.isExcluded ? '#30d158' : '#ff9500', display: 'flex' }}>
                        <Ban size={13} />
                      </button>
                      <button title="Supprimer" onClick={() => setConfirmDel(inf.id)} style={{ background: 'rgba(255,69,58,0.1)', border: '1px solid rgba(255,69,58,0.2)', borderRadius: 8, padding: 6, cursor: 'pointer', color: '#ff453a', display: 'flex' }}>
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Panneau détail */}
      {panel && (
        <>
          <div style={{ position: 'fixed', inset: 0, zIndex: 40, background: 'rgba(0,0,0,0.4)' }} onClick={() => setPanel(null)} />
          <div style={{ position: 'fixed', top: 0, right: 0, width: 400, height: '100vh', background: '#111', borderLeft: '1px solid rgba(255,255,255,0.08)', zIndex: 50, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'white' }}>{editing ? 'Modifier' : 'Fiche influenceur'}</span>
              <button onClick={() => setPanel(null)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}><X size={18} /></button>
            </div>

            <div style={{ padding: '1.25rem', flex: 1, overflowY: 'auto', color: 'white' }}>
              {!editing ? (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: '1.25rem' }}>
                    <img src={panel.photo} alt={panel.name} style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover' }} />
                    <div>
                      <div style={{ fontSize: '1rem', fontWeight: 700 }}>{panel.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>{panel.instagram} · {panel.country}</div>
                      <div style={{ marginTop: 6 }}><StatusBadge verified={panel.isVerified} excluded={panel.isExcluded} /></div>
                    </div>
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '0.75rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', marginBottom: '1rem', lineHeight: 1.6 }}>
                    {panel.bio}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: '1rem' }}>
                    {[
                      ['Abonnés', formatNumber(panel.followers)],
                      ['Engagement', `${panel.engagementRate}%`],
                      ['Catégorie', panel.category],
                      ['Plan', panel.subscription === 'PRO' ? 'Pro 29€/mois' : 'Gratuit (30%)'],
                      ['Tarif post', `${panel.ratePost}€`],
                      ['Tarif story', `${panel.rateStory}€`],
                      ['Tarif vidéo', `${panel.rateVideo}€`],
                      ['Portefeuille', `${panel.balance}€`],
                    ].map(([k, v]) => (
                      <div key={k} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: '0.6rem 0.75rem' }}>
                        <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)', marginBottom: 2 }}>{k}</div>
                        <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>{v}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', marginBottom: 6 }}>Centres d'intérêt</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                      {panel.interests.map(t => (
                        <span key={t} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 9999, padding: '3px 10px', fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>{t}</span>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <button onClick={() => { setEditData({ name: panel.name, bio: panel.bio, engagementRate: panel.engagementRate, ratePost: panel.ratePost, rateStory: panel.rateStory, rateVideo: panel.rateVideo }); setEditing(true) }}
                      style={{ background: `${OR}18`, border: `1px solid ${OR}40`, color: OR, borderRadius: 9999, padding: '0.55rem', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                      <Edit2 size={13} /> Modifier le profil
                    </button>
                    {!panel.isVerified && !panel.isExcluded && (
                      <button onClick={() => certify(panel.id)}
                        style={{ background: 'rgba(48,209,88,0.12)', border: '1px solid rgba(48,209,88,0.25)', color: '#30d158', borderRadius: 9999, padding: '0.55rem', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                        <CheckCircle size={13} /> Certifier
                      </button>
                    )}
                    <button onClick={() => toggleExclude(panel.id)}
                      style={{ background: panel.isExcluded ? 'rgba(48,209,88,0.1)' : 'rgba(255,149,0,0.1)', border: `1px solid ${panel.isExcluded ? 'rgba(48,209,88,0.25)' : 'rgba(255,149,0,0.25)'}`, color: panel.isExcluded ? '#30d158' : '#ff9500', borderRadius: 9999, padding: '0.55rem', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>
                      {panel.isExcluded ? '↩ Réactiver' : '⊘ Exclure de la plateforme'}
                    </button>
                    <button onClick={() => setConfirmDel(panel.id)}
                      style={{ background: 'rgba(255,69,58,0.1)', border: '1px solid rgba(255,69,58,0.25)', color: '#ff453a', borderRadius: 9999, padding: '0.55rem', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>
                      🗑 Supprimer définitivement
                    </button>
                  </div>
                </>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    { key: 'name', label: 'Nom', type: 'text' },
                    { key: 'engagementRate', label: 'Taux engagement (%)', type: 'number' },
                    { key: 'ratePost', label: 'Tarif post (€)', type: 'number' },
                    { key: 'rateStory', label: 'Tarif story (€)', type: 'number' },
                    { key: 'rateVideo', label: 'Tarif vidéo (€)', type: 'number' },
                  ].map(field => (
                    <div key={field.key}>
                      <label style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 4 }}>{field.label}</label>
                      <input
                        type={field.type}
                        value={(editData as Record<string, unknown>)[field.key] as string ?? ''}
                        onChange={e => setEditData(d => ({ ...d, [field.key]: field.type === 'number' ? Number(e.target.value) : e.target.value }))}
                        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '0.6rem 0.75rem', color: 'white', fontSize: '0.8rem', outline: 'none', width: '100%' }}
                      />
                    </div>
                  ))}
                  <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginBottom: 2 }}>Bio</div>
                  <textarea
                    rows={3}
                    value={editData.bio ?? ''}
                    onChange={e => setEditData(d => ({ ...d, bio: e.target.value }))}
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '0.6rem 0.75rem', color: 'white', fontSize: '0.8rem', outline: 'none', width: '100%', resize: 'vertical' }}
                  />
                  <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                    <button onClick={saveEdit} style={{ flex: 1, background: `${OR}20`, border: `1px solid ${OR}50`, color: OR, borderRadius: 9999, padding: '0.6rem', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>Enregistrer</button>
                    <button onClick={() => setEditing(false)} style={{ flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)', borderRadius: 9999, padding: '0.6rem', fontSize: '0.8rem', cursor: 'pointer' }}>Annuler</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Modal suppression */}
      {confirmDel && (
        <>
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 60 }} onClick={() => setConfirmDel(null)} />
          <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: '1.5rem', zIndex: 70, width: 340, color: 'white' }}>
            <h3 style={{ fontWeight: 700, marginBottom: 8 }}>Confirmer la suppression</h3>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', marginBottom: '1.25rem' }}>Cette action est irréversible. Le profil sera définitivement supprimé.</p>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => del(confirmDel)} style={{ flex: 1, background: 'rgba(255,69,58,0.15)', border: '1px solid rgba(255,69,58,0.3)', color: '#ff453a', borderRadius: 9999, padding: '0.6rem', fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer' }}>Supprimer</button>
              <button onClick={() => setConfirmDel(null)} style={{ flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)', borderRadius: 9999, padding: '0.6rem', fontSize: '0.8rem', cursor: 'pointer' }}>Annuler</button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

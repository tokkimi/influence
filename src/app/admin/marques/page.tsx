'use client'

import { useState } from 'react'
import { formatCurrency } from '@/lib/utils'
import { Eye, CheckCircle, Edit2, Trash2, X } from 'lucide-react'

function GlassCard({ children }: { children: React.ReactNode }) {
  return <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1.25rem' }}>{children}</div>
}

const inputStyle: React.CSSProperties = { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.75rem', padding: '0.75rem 1rem', color: 'white', fontSize: '0.875rem', outline: 'none', width: '100%' }
const btnGold: React.CSSProperties = { background: 'rgba(243,112,33,0.2)', border: '1px solid rgba(243,112,33,0.3)', color: '#F37021', fontSize: '0.75rem', fontWeight: 600, padding: '0.5rem 1.25rem', borderRadius: '9999px', cursor: 'pointer' }
const btnGhost: React.CSSProperties = { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', padding: '0.5rem 1.25rem', borderRadius: '9999px', cursor: 'pointer' }

const initialBrands = [
  { id: 'b1', name: "L'Oréal Paris", sector: 'Beauté', campaigns: 3, totalBudget: 15000, balance: 45000, status: 'ACTIVE', createdAt: '12/01/2024', description: 'Leader mondial de la beauté', website: 'https://loreal.fr' },
  { id: 'b2', name: 'Nike France', sector: 'Sport', campaigns: 8, totalBudget: 85000, balance: 125000, status: 'ACTIVE', createdAt: '05/03/2024', description: 'Just Do It', website: 'https://nike.fr' },
  { id: 'b3', name: 'Maison Élégance', sector: 'Mode', campaigns: 1, totalBudget: 5000, balance: 3200, status: 'PENDING', createdAt: '01/10/2024', description: 'Mode et élégance française', website: 'https://maison-elegance.fr' },
  { id: 'b4', name: 'TechPro', sector: 'Technologie', campaigns: 0, totalBudget: 0, balance: 0, status: 'SUSPENDED', createdAt: '15/08/2024', description: 'Solutions tech innovantes', website: 'https://techpro.fr' },
]

type Brand = typeof initialBrands[number]

function StatusBadge({ s }: { s: string }) {
  const cfg = s === 'ACTIVE' ? { bg: 'rgba(48,209,88,0.1)', c: '#30d158', b: 'rgba(48,209,88,0.2)', l: 'Actif' }
    : s === 'PENDING' ? { bg: 'rgba(255,149,0,0.1)', c: '#ff9500', b: 'rgba(255,149,0,0.2)', l: 'En attente' }
    : { bg: 'rgba(255,69,58,0.1)', c: '#ff453a', b: 'rgba(255,69,58,0.2)', l: 'Suspendu' }
  return <span style={{ background: cfg.bg, color: cfg.c, border: `1px solid ${cfg.b}`, borderRadius: '9999px', padding: '0.15rem 0.6rem', fontSize: '0.7rem', fontWeight: 600 }}>{cfg.l}</span>
}

export default function AdminMarquesPage() {
  const [brands, setBrands] = useState<Brand[]>(initialBrands)
  const [selected, setSelected] = useState<Brand | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [editMode, setEditMode] = useState(false)
  const [editData, setEditData] = useState<Partial<Brand>>({})

  const toggleVerify = (id: string) => setBrands(p => p.map(b => b.id === id ? { ...b, status: b.status === 'ACTIVE' ? 'PENDING' : 'ACTIVE' } : b))
  const del = (id: string) => { setBrands(p => p.filter(b => b.id !== id)); setDeleteId(null); if (selected?.id === id) setSelected(null) }
  const saveEdit = () => {
    if (!selected) return
    setBrands(p => p.map(b => b.id === selected.id ? { ...b, ...editData } : b))
    setSelected(p => p ? { ...p, ...editData } as Brand : null)
    setEditMode(false)
  }

  return (
    <div style={{ color: 'white', padding: '1.5rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>Gestion des marques</h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem' }}>{brands.length} marques enregistrées</p>
      </div>

      <GlassCard>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.04)' }}>
                {['Marque', 'Secteur', 'Campagnes', 'Budget total', 'Solde', 'Statut', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '0.6rem 0.75rem', textAlign: 'left', fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {brands.map(b => (
                <tr key={b.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  onClick={() => { setSelected(b); setEditMode(false) }}>
                  <td style={{ padding: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <div style={{ width: 32, height: 32, borderRadius: '0.5rem', background: 'rgba(243,112,33,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700, color: '#F37021' }}>
                        {b.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>{b.name}</div>
                    </div>
                  </td>
                  <td style={{ padding: '0.75rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>{b.sector}</td>
                  <td style={{ padding: '0.75rem', fontSize: '0.8rem' }}>{b.campaigns}</td>
                  <td style={{ padding: '0.75rem', fontSize: '0.8rem' }}>{formatCurrency(b.totalBudget)}</td>
                  <td style={{ padding: '0.75rem', fontSize: '0.8rem', color: '#F37021', fontWeight: 600 }}>{formatCurrency(b.balance)}</td>
                  <td style={{ padding: '0.75rem' }}><StatusBadge s={b.status} /></td>
                  <td style={{ padding: '0.75rem' }} onClick={e => e.stopPropagation()}>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <button onClick={() => { setSelected(b); setEditMode(false) }} style={{ background: 'rgba(255,255,255,0.06)', border: 'none', borderRadius: '0.5rem', padding: '0.3rem', cursor: 'pointer', color: 'rgba(255,255,255,0.6)' }}><Eye size={14} /></button>
                      <button onClick={() => toggleVerify(b.id)} style={{ background: 'rgba(48,209,88,0.1)', border: 'none', borderRadius: '0.5rem', padding: '0.3rem', cursor: 'pointer', color: '#30d158' }}><CheckCircle size={14} /></button>
                      <button onClick={() => { setSelected(b); setEditMode(true); setEditData({ name: b.name, sector: b.sector, website: b.website, description: b.description }) }} style={{ background: 'rgba(10,132,255,0.1)', border: 'none', borderRadius: '0.5rem', padding: '0.3rem', cursor: 'pointer', color: '#0a84ff' }}><Edit2 size={14} /></button>
                      <button onClick={() => setDeleteId(b.id)} style={{ background: 'rgba(255,69,58,0.1)', border: 'none', borderRadius: '0.5rem', padding: '0.3rem', cursor: 'pointer', color: '#ff453a' }}><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {selected && (
        <>
          <div style={{ position: 'fixed', inset: 0, zIndex: 40 }} onClick={() => { setSelected(null); setEditMode(false) }} />
          <div style={{ position: 'fixed', top: 0, right: 0, width: '400px', height: '100vh', background: '#111', borderLeft: '1px solid rgba(255,255,255,0.08)', zIndex: 50, overflowY: 'auto', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 700 }}>Détail marque</h2>
              <button onClick={() => { setSelected(null); setEditMode(false) }} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}><X size={18} /></button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ width: 56, height: 56, borderRadius: '0.75rem', background: 'rgba(243,112,33,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: 700, color: '#F37021' }}>
                {selected.name.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1rem' }}>{selected.name}</div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', marginBottom: '0.25rem' }}>{selected.sector}</div>
                <StatusBadge s={selected.status} />
              </div>
            </div>
            {editMode ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[{ l: 'Nom', k: 'name' }, { l: 'Secteur', k: 'sector' }, { l: 'Site web', k: 'website' }].map(f => (
                  <div key={f.k}>
                    <label style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.25rem', display: 'block' }}>{f.l}</label>
                    <input style={inputStyle} value={(editData as Record<string, string>)[f.k] || ''} onChange={e => setEditData(d => ({ ...d, [f.k]: e.target.value }))} />
                  </div>
                ))}
                <div>
                  <label style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.25rem', display: 'block' }}>Description</label>
                  <textarea style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' } as React.CSSProperties} value={editData.description || ''} onChange={e => setEditData(d => ({ ...d, description: e.target.value }))} />
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={saveEdit} style={btnGold}>Enregistrer</button>
                  <button onClick={() => setEditMode(false)} style={btnGhost}>Annuler</button>
                </div>
              </div>
            ) : (
              <>
                <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', marginBottom: '1rem', lineHeight: 1.5 }}>{selected.description}</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                  {[{ l: 'Campagnes', v: String(selected.campaigns) }, { l: 'Budget total', v: formatCurrency(selected.totalBudget) }, { l: 'Solde portefeuille', v: formatCurrency(selected.balance) }, { l: 'Membre depuis', v: selected.createdAt }].map(s => (
                    <div key={s.l} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '0.75rem', padding: '0.75rem' }}>
                      <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.2rem' }}>{s.l}</div>
                      <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>{s.v}</div>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#0a84ff', marginBottom: '1.25rem' }}>
                  <a href={selected.website} target="_blank" rel="noreferrer" style={{ color: '#0a84ff' }}>{selected.website}</a>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => { setEditMode(true); setEditData({ name: selected.name, sector: selected.sector, website: selected.website, description: selected.description }) }} style={btnGold}>Modifier</button>
                  <button onClick={() => toggleVerify(selected.id)} style={btnGhost}>{selected.status === 'ACTIVE' ? 'Suspendre' : 'Activer'}</button>
                </div>
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

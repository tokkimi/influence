'use client'

import { useState } from 'react'
import { formatCurrency } from '@/lib/utils'
import { Eye, CheckCircle, Edit2, Trash2, X, Search } from 'lucide-react'

const OR = '#F37021'
const iStyle: React.CSSProperties = { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '0.6rem 0.875rem', color: 'white', fontSize: '0.8rem', outline: 'none', width: '100%' }

const initialBrands = [
  { id: 'b1', name: "L'Oréal Paris", sector: 'Beauté', campaigns: 3, totalBudget: 15000, balance: 45000, status: 'ACTIVE', createdAt: '12/01/2024', description: 'Leader mondial de la beauté', website: 'https://loreal.fr' },
  { id: 'b2', name: 'Nike France', sector: 'Sport', campaigns: 8, totalBudget: 85000, balance: 125000, status: 'ACTIVE', createdAt: '05/03/2024', description: 'Just Do It', website: 'https://nike.fr' },
  { id: 'b3', name: 'Maison Élégance', sector: 'Mode', campaigns: 1, totalBudget: 5000, balance: 3200, status: 'PENDING', createdAt: '01/10/2024', description: 'Mode et élégance française', website: 'https://maison-elegance.fr' },
  { id: 'b4', name: 'TechPro', sector: 'Technologie', campaigns: 0, totalBudget: 0, balance: 0, status: 'SUSPENDED', createdAt: '15/08/2024', description: 'Solutions tech innovantes', website: 'https://techpro.fr' },
]
type Brand = typeof initialBrands[number]

function SBadge({ s }: { s: string }) {
  const c = s === 'ACTIVE' ? { bg: 'rgba(48,209,88,0.12)', color: '#30d158', b: 'rgba(48,209,88,0.25)', l: 'Actif' }
    : s === 'PENDING' ? { bg: 'rgba(255,149,0,0.12)', color: '#ff9500', b: 'rgba(255,149,0,0.25)', l: 'En attente' }
    : { bg: 'rgba(255,69,58,0.12)', color: '#ff453a', b: 'rgba(255,69,58,0.25)', l: 'Suspendu' }
  return <span style={{ background: c.bg, color: c.color, border: `1px solid ${c.b}`, borderRadius: 9999, padding: '3px 10px', fontSize: 11, fontWeight: 600 }}>{c.l}</span>
}

function Avatar({ name }: { name: string }) {
  const initials = name.split(' ').map(w => w[0]).join('').replace(/[^A-Za-z]/g,'').toUpperCase().slice(0,2)
  return <div style={{ width: 38, height: 38, borderRadius: 10, background: `${OR}20`, border: `1px solid ${OR}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, color: OR, flexShrink: 0 }}>{initials}</div>
}

export default function AdminMarques() {
  const [brands, setBrands] = useState<Brand[]>(initialBrands)
  const [search, setSearch] = useState('')
  const [panel, setPanel] = useState<Brand | null>(null)
  const [editing, setEditing] = useState(false)
  const [editData, setEditData] = useState<Partial<Brand>>({})
  const [confirmDel, setConfirmDel] = useState<string | null>(null)

  const filtered = brands.filter(b =>
    b.name.toLowerCase().includes(search.toLowerCase()) || b.sector.toLowerCase().includes(search.toLowerCase())
  )

  const toggleStatus = (id: string) => {
    setBrands(p => p.map(b => b.id === id ? { ...b, status: b.status === 'ACTIVE' ? 'PENDING' : 'ACTIVE' } : b))
    if (panel?.id === id) setPanel(p => p ? { ...p, status: p.status === 'ACTIVE' ? 'PENDING' : 'ACTIVE' } : null)
  }
  const del = (id: string) => { setBrands(p => p.filter(b => b.id !== id)); setConfirmDel(null); if (panel?.id === id) setPanel(null) }
  const saveEdit = () => {
    if (!panel) return
    setBrands(p => p.map(b => b.id === panel.id ? { ...b, ...editData } : b))
    setPanel(p => p ? { ...p, ...editData } as Brand : null)
    setEditing(false)
  }

  return (
    <div style={{ color: 'white', maxWidth: '100%', overflowX: 'hidden' }}>
      <div style={{ marginBottom: '1.25rem' }}>
        <h1 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Marques</h1>
        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem', marginTop: 2 }}>{brands.length} marques enregistrées</p>
      </div>

      <div style={{ position: 'relative', marginBottom: '1rem' }}>
        <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher..." style={{ ...iStyle, paddingLeft: '2.25rem' }} />
      </div>

      {/* Card list — mobile-first, no horizontal scroll */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {filtered.map(b => (
          <div key={b.id} onClick={() => { setPanel(b); setEditing(false) }}
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '0.875rem 1rem', cursor: 'pointer' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.07)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.7rem' }}>
              <Avatar name={b.name} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '0.875rem', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.name}</div>
                <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}>{b.sector} · {b.createdAt}</div>
              </div>
              <SBadge s={b.status} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.5rem', marginBottom: '0.7rem' }}>
              {[['Campagnes', String(b.campaigns), 'white'], ['Budget', formatCurrency(b.totalBudget), 'white'], ['Solde', formatCurrency(b.balance), OR]].map(([k,v,col]) => (
                <div key={k} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: '0.45rem 0.6rem' }}>
                  <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.35)' }}>{k}</div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: col }}>{v}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }} onClick={e => e.stopPropagation()}>
              {[
                { label: 'Voir', icon: Eye, color: 'rgba(255,255,255,0.5)', bg: 'rgba(255,255,255,0.06)', border: 'rgba(255,255,255,0.1)', action: () => { setPanel(b); setEditing(false) } },
                { label: 'Modifier', icon: Edit2, color: '#0a84ff', bg: 'rgba(10,132,255,0.1)', border: 'rgba(10,132,255,0.2)', action: () => { setPanel(b); setEditing(true); setEditData({ name: b.name, sector: b.sector, website: b.website, description: b.description }) } },
                { label: b.status === 'ACTIVE' ? 'Suspendre' : 'Activer', icon: CheckCircle, color: b.status === 'ACTIVE' ? '#ff9500' : '#30d158', bg: b.status === 'ACTIVE' ? 'rgba(255,149,0,0.1)' : 'rgba(48,209,88,0.1)', border: b.status === 'ACTIVE' ? 'rgba(255,149,0,0.2)' : 'rgba(48,209,88,0.2)', action: () => toggleStatus(b.id) },
                { label: '', icon: Trash2, color: '#ff453a', bg: 'rgba(255,69,58,0.1)', border: 'rgba(255,69,58,0.2)', action: () => setConfirmDel(b.id) },
              ].map((btn, i) => (
                <button key={i} onClick={btn.action} style={{ background: btn.bg, border: `1px solid ${btn.border}`, borderRadius: 8, padding: '5px 10px', cursor: 'pointer', color: btn.color, display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 600 }}>
                  <btn.icon size={12} />{btn.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Panneau détail */}
      {panel && (
        <>
          <div style={{ position: 'fixed', inset: 0, zIndex: 40, background: 'rgba(0,0,0,0.5)' }} onClick={() => { setPanel(null); setEditing(false) }} />
          <div style={{ position: 'fixed', top: 0, right: 0, width: 'min(400px,100vw)', height: '100vh', background: '#111', borderLeft: '1px solid rgba(255,255,255,0.08)', zIndex: 50, overflowY: 'auto' }}>
            <div style={{ padding: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 700 }}>{editing ? 'Modifier' : 'Fiche marque'}</span>
              <button onClick={() => { setPanel(null); setEditing(false) }} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}><X size={18} /></button>
            </div>
            <div style={{ padding: '1.25rem', color: 'white' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.25rem' }}>
                <Avatar name={panel.name} />
                <div>
                  <div style={{ fontWeight: 700 }}>{panel.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>{panel.sector}</div>
                  <SBadge s={panel.status} />
                </div>
              </div>
              {editing ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {[['Nom','name'],['Secteur','sector'],['Site web','website']].map(([l,k]) => (
                    <div key={k}>
                      <label style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 4 }}>{l}</label>
                      <input style={iStyle} value={(editData as Record<string,string>)[k]||''} onChange={e => setEditData(d=>({...d,[k]:e.target.value}))} />
                    </div>
                  ))}
                  <div>
                    <label style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 4 }}>Description</label>
                    <textarea rows={3} style={{...iStyle,resize:'vertical'} as React.CSSProperties} value={editData.description||''} onChange={e=>setEditData(d=>({...d,description:e.target.value}))} />
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={saveEdit} style={{ flex:1, background:`${OR}20`, border:`1px solid ${OR}50`, color:OR, borderRadius:9999, padding:'0.6rem', fontSize:'0.8rem', fontWeight:600, cursor:'pointer' }}>Enregistrer</button>
                    <button onClick={()=>setEditing(false)} style={{ flex:1, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', color:'rgba(255,255,255,0.5)', borderRadius:9999, padding:'0.6rem', fontSize:'0.8rem', cursor:'pointer' }}>Annuler</button>
                  </div>
                </div>
              ) : (
                <>
                  <p style={{ fontSize:'0.8rem', color:'rgba(255,255,255,0.6)', lineHeight:1.6, marginBottom:'1rem' }}>{panel.description}</p>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.6rem', marginBottom:'1rem' }}>
                    {[['Campagnes',String(panel.campaigns)],['Budget',formatCurrency(panel.totalBudget)],['Solde',formatCurrency(panel.balance)],['Membre depuis',panel.createdAt]].map(([k,v])=>(
                      <div key={k} style={{ background:'rgba(255,255,255,0.04)', borderRadius:10, padding:'0.75rem' }}>
                        <div style={{ fontSize:'0.65rem', color:'rgba(255,255,255,0.35)', marginBottom:2 }}>{k}</div>
                        <div style={{ fontSize:'0.875rem', fontWeight:600 }}>{v}</div>
                      </div>
                    ))}
                  </div>
                  <a href={panel.website} target="_blank" rel="noreferrer" style={{ color:'#0a84ff', fontSize:'0.8rem', display:'block', marginBottom:'1.25rem' }}>{panel.website}</a>
                  <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                    <button onClick={()=>{setEditing(true);setEditData({name:panel.name,sector:panel.sector,website:panel.website,description:panel.description})}} style={{ background:`${OR}18`, border:`1px solid ${OR}40`, color:OR, borderRadius:9999, padding:'0.55rem', fontSize:'0.8rem', fontWeight:600, cursor:'pointer' }}>✏️ Modifier</button>
                    <button onClick={()=>toggleStatus(panel.id)} style={{ background:panel.status==='ACTIVE'?'rgba(255,149,0,0.1)':'rgba(48,209,88,0.1)', border:`1px solid ${panel.status==='ACTIVE'?'rgba(255,149,0,0.25)':'rgba(48,209,88,0.25)'}`, color:panel.status==='ACTIVE'?'#ff9500':'#30d158', borderRadius:9999, padding:'0.55rem', fontSize:'0.8rem', fontWeight:600, cursor:'pointer' }}>{panel.status==='ACTIVE'?'⊘ Suspendre':'✓ Activer'}</button>
                    <button onClick={()=>setConfirmDel(panel.id)} style={{ background:'rgba(255,69,58,0.1)', border:'1px solid rgba(255,69,58,0.25)', color:'#ff453a', borderRadius:9999, padding:'0.55rem', fontSize:'0.8rem', fontWeight:600, cursor:'pointer' }}>🗑 Supprimer</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}

      {confirmDel && (
        <>
          <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.6)', zIndex:60 }} onClick={()=>setConfirmDel(null)} />
          <div style={{ position:'fixed', top:'50%', left:'50%', transform:'translate(-50%,-50%)', background:'#1a1a1a', border:'1px solid rgba(255,255,255,0.1)', borderRadius:16, padding:'1.5rem', zIndex:70, width:'min(320px,90vw)', color:'white' }}>
            <h3 style={{ fontWeight:700, marginBottom:8 }}>Confirmer la suppression</h3>
            <p style={{ fontSize:'0.85rem', color:'rgba(255,255,255,0.5)', marginBottom:'1.25rem' }}>Cette action est irréversible.</p>
            <div style={{ display:'flex', gap:8 }}>
              <button onClick={()=>del(confirmDel)} style={{ flex:1, background:'rgba(255,69,58,0.15)', border:'1px solid rgba(255,69,58,0.3)', color:'#ff453a', borderRadius:9999, padding:'0.6rem', fontWeight:600, fontSize:'0.8rem', cursor:'pointer' }}>Supprimer</button>
              <button onClick={()=>setConfirmDel(null)} style={{ flex:1, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', color:'rgba(255,255,255,0.5)', borderRadius:9999, padding:'0.6rem', fontSize:'0.8rem', cursor:'pointer' }}>Annuler</button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
